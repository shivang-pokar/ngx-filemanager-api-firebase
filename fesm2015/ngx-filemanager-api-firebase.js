import { __awaiter } from 'tslib';
import { VError } from 'verror';
import { decode } from 'jsonwebtoken';
import { dirname, join, basename } from 'path';
import { IncomingForm } from 'formidable';
import { readFile, unlinkSync } from 'fs';

const cors = require('cors');
function OptionRequestsAreOk(req, res, next) {
    if (req.method === 'OPTIONS') {
        console.log('Recieved OPTIONS request sending OK');
        res.status(200).send('Options are OK\n');
        return;
    }
    next();
}
function PostRequestsOnly(req, res, next) {
    if (req.method !== 'POST') {
        const msg = 'Only POST requests are supported\n';
        console.warn(msg);
        res.status(400).send(msg);
        return;
    }
    next();
}
function HasBodyProp(bodyFieldName) {
    return (req, res, next) => {
        if (!req.body[bodyFieldName]) {
            const msg = `Request is missing property in req.body: "${bodyFieldName}" \n`;
            console.warn(msg);
            res.status(400).send(msg);
            return;
        }
        next();
    };
}
function HasQueryParam(paramName) {
    return (req, res, next) => {
        if (!req.query[paramName]) {
            const msg = `Request is missing property in req.params: "${paramName}" \n`;
            console.warn(msg);
            res.status(400).send(msg);
            return;
        }
        next();
    };
}
function AddCors(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        res.setHeader('Access-Control-Allow-Headers', 'Authorization, X-Requested-With, Accept, Content-Type, Origin, Cache-Control, X-File-Name');
        res.setHeader('Access-Control-Allow-Origin', '*');
        try {
            yield new Promise((resolve, reject) => {
                cors({ origin: true })(req, res, () => {
                    resolve();
                });
            });
            next();
        }
        catch (error) {
            throw new Error(error.message);
        }
    });
}
function LogRequest(req, res, next) {
    const body = JSON.stringify(req.body || {}, null, 4).slice(0, 500);
    const msg = `
---- request: ${req.url}
method: ${req.method}
 query: ${JSON.stringify(req.query, null, 4)}
  body: ${body}
----`;
    console.log(msg);
    next();
}

function GetTokenFromRequest(req) {
    return __awaiter(this, void 0, void 0, function* () {
        let idToken;
        const isInHeader = req.headers['authorization'] &&
            req.headers['authorization'].startsWith('Bearer ');
        const hasCookie = req['cookies'];
        if (isInHeader) {
            // Read the ID Token from the Authorization header.
            idToken = req.headers['authorization'].split('Bearer ')[1];
        }
        else if (hasCookie) {
            // Read the ID Token from cookie.
            idToken = req['cookies'].__session;
        }
        else {
            throw new Error('Request Header doesn\'t contain a valid authorization bearer');
        }
        const decodedToken = yield DecodeJWT(idToken);
        return decodedToken;
    });
}
function DecodeJWT(bearer) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const decoded = decode(bearer, { json: true });
            return decoded;
        }
        catch (error) {
            throw new Error('Error decoding JWT' + error.message);
        }
    });
}

function blankUserClaim() {
    return {
        groups: []
    };
}
function blankPermissionsObj() {
    return {
        others: 'read/write',
        readers: [],
        writers: []
    };
}
const permsFactory = {
    blankPermissionsObj,
    blankUserClaim,
};

function SetMetaPropertyString(file, key, newValueString) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const metaObj = { metadata: {} };
            metaObj.metadata[key] = newValueString;
            const res = yield file.setMetadata(metaObj);
            return res[0];
        }
        catch (error) {
            let fileExists;
            try {
                [fileExists] = yield file.exists();
            }
            catch (e) {
                console.error('storage-helper: SetMetaProperty() error getting file.exists', e);
            }
            console.error('storage-helper: SetMetaProperty() error setting meta', {
                fileExists,
                filePath: file.name,
                newValueString
            });
            throw new Error(error);
        }
    });
}
function SetMetaPropertyObj(file, key, newValue) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const newValueString = JSON.stringify(newValue);
            return SetMetaPropertyString(file, key, newValueString);
        }
        catch (error) {
            throw new Error(error);
        }
    });
}
function GetMetaPropertyString(file, key) {
    return __awaiter(this, void 0, void 0, function* () {
        let newValueString;
        try {
            const [meta] = yield file.getMetadata();
            const metaData = meta.metadata || {};
            newValueString = metaData[key] || null;
            return newValueString;
        }
        catch (error) {
            try {
                const [fileExists] = yield file.exists();
            }
            catch (error) {
                console.error(error);
            }
            console.error('storage-helper: GetMetaProperty() error getting meta', {});
            throw new VError(error);
        }
    });
}
function GetMetaPropertyObj(file, key) {
    return __awaiter(this, void 0, void 0, function* () {
        let newValueString;
        try {
            newValueString = yield GetMetaPropertyString(file, key);
            const newValueObj = JSON.parse(newValueString);
            return newValueObj;
        }
        catch (error) {
            console.error(`could not convert the meta property "${key}" to a JSON object`, error, { newValueString });
            throw new VError(error + ' error in JSON processing: ' + newValueString);
        }
    });
}
const permHelper = {
    GetMetaPropertyObj: GetMetaPropertyObj,
    SetMetaPropertyObj: SetMetaPropertyObj,
    GetMetaPropertyString: GetMetaPropertyString,
    SetMetaPropertyString: SetMetaPropertyString,
};

function RetrieveFilePermissions(file) {
    return __awaiter(this, void 0, void 0, function* () {
        const fromStorage = yield permHelper.GetMetaPropertyObj(file, 'permissions');
        const blank = permsFactory.blankPermissionsObj();
        const safePerms = Object.assign(Object.assign({}, blank), (fromStorage || {}));
        return safePerms;
    });
}
function RetrieveCustomClaims(req) {
    return __awaiter(this, void 0, void 0, function* () {
        let token;
        try {
            token = yield GetTokenFromRequest(req);
        }
        catch (error) {
            console.log('No bearer token found on request, no permissions for user');
            return permsFactory.blankUserClaim();
        }
        const claims = token;
        if (!claims.groups) {
            claims.groups = [];
        }
        return claims;
    });
}
function TryCheckHasAnyPermissions(claims) {
    if (!claims.groups.length && !claims.userIsSudo) {
        throw new Error('No user permissions found, cannot change permissions');
    }
}
function CanRead(othersPermissions) {
    return (othersPermissions == null ||
        othersPermissions === 'read' ||
        othersPermissions === 'read/write');
}
function CanWrite(othersPermissions) {
    return othersPermissions === 'read/write';
}
function CanOthersDo(othersPermissions, toCheck) {
    switch (toCheck) {
        case 'read':
            return CanRead(othersPermissions);
        case 'write':
            return CanWrite(othersPermissions);
        default:
            break;
    }
}
function TryCheckFileAccess(filePermissions, claims, toCheck) {
    // Anyone can do something
    const anyoneCanDo = CanOthersDo(filePermissions.others, toCheck);
    if (anyoneCanDo) {
        return true;
    }
    // Has no userclaims
    const hasClaims = !!claims;
    if (!hasClaims) {
        return false;
    }
    // Sudo can do anything
    const sudoCanDo = claims.userIsSudo;
    if (sudoCanDo) {
        return true;
    }
    const userAndGroups = [...claims.groups, claims.user_id];
    let arrayToCheck;
    if (toCheck === 'read') {
        arrayToCheck = filePermissions.readers;
    }
    else {
        arrayToCheck = filePermissions.writers;
    }
    if (IsPartOfArray(arrayToCheck, userAndGroups)) {
        return true;
    }
    return false;
}
function IsPartOfArray(arr, usersGroups) {
    const hasNoGroupsToCheck = !usersGroups || !usersGroups.length;
    if (hasNoGroupsToCheck) {
        return false;
    }
    const userGroupSet = new Set(usersGroups);
    const isInArray = arr.find((entity) => userGroupSet.has(entity));
    return !!isInArray;
}
function CheckCanEditPermissions(currentFilePermissions, newPermissions, claims) {
    const canEditPermissions = TryCheckFileAccess(currentFilePermissions, claims, 'write');
    const canEditPermissionsAfter = TryCheckFileAccess(newPermissions, claims, 'write');
    if (!canEditPermissions) {
        throw new VError('Cannot edit permissions here');
    }
    if (!canEditPermissionsAfter) {
        throw new VError('Cannot change permissions, so you wont be able to change back');
    }
}
const permsQueries = {
    RetrieveFilePermissions,
    RetrieveCustomClaims,
    TryCheckHasAnyPermissions,
    TryCheckFileAccess,
    IsPartOfArray,
    CheckCanEditPermissions,
};

function UpdateFilePermissions(file, newPermissions) {
    return __awaiter(this, void 0, void 0, function* () {
        return permHelper.SetMetaPropertyObj(file, 'permissions', newPermissions);
    });
}
const permsCommands = {
    UpdateFilePermissions
};

const perms = {
    factory: permsFactory,
    commands: permsCommands,
    queries: permsQueries,
};

function HasPrefixSlash(inputPath) {
    if (!inputPath || !inputPath.length) {
        return false;
    }
    const hasPrefix = inputPath.startsWith('/');
    return hasPrefix;
}
function HasTrailingSlash(inputPath) {
    if (!inputPath || !inputPath.length) {
        return false;
    }
    const hasTrailing = inputPath.endsWith('/');
    return hasTrailing;
}
function EnsureTrailingSlash(inputPath) {
    if (!inputPath) {
        return '/';
    }
    const hasTrailing = HasTrailingSlash(inputPath);
    const pathParsed = hasTrailing ? inputPath : inputPath + '/';
    return pathParsed;
}
function EnsureNoPrefixSlash(inputPath) {
    const hasPrefix = HasPrefixSlash(inputPath);
    const pathParsed = hasPrefix ? inputPath.slice(1) : inputPath;
    return pathParsed;
}
function EnsurePrefixSlash(inputPath) {
    if (!inputPath) {
        return '/';
    }
    const hasPrefix = HasPrefixSlash(inputPath);
    const pathParsed = hasPrefix ? inputPath : '/' + inputPath;
    return pathParsed;
}
function EnsureNoTrailingSlash(inputPath) {
    const hasTrailing = HasTrailingSlash(inputPath);
    const pathParsed = hasTrailing ? inputPath.slice(0, -1) : inputPath;
    return pathParsed;
}
function EnsureAbsolutePathFile(filePath) {
    return EnsurePrefixSlash(EnsureNoTrailingSlash(filePath));
}
function EnsureAbsolutePathDir(folderPath) {
    return EnsurePrefixSlash(EnsureTrailingSlash(folderPath));
}
function EnsureGoogleStoragePathDir(folderPath) {
    return EnsureNoPrefixSlash(EnsureTrailingSlash(folderPath));
}
function EnsureGoogleStoragePathFile(filePath) {
    return EnsureNoPrefixSlash(EnsureNoTrailingSlash(filePath));
}
function GetRelativePath(currentDirectoryPath, absObjectPath) {
    const relativePath = absObjectPath.slice(currentDirectoryPath.length);
    return relativePath;
}
function GetParentDir(currentDirectoryPath) {
    const parsed = EnsurePrefixSlash(currentDirectoryPath);
    const parentPath = dirname(parsed);
    return EnsureGoogleStoragePathDir(parentPath);
}
function IsCurrentPath(currentDirectoryPath, absObjectPath) {
    const relativePath = GetRelativePath(currentDirectoryPath, absObjectPath);
    const isCurrentDir = !relativePath;
    return isCurrentDir;
}
function IsCurrentPathFile(currentDirectoryPath, absObjectPath) {
    const relativePath = GetRelativePath(currentDirectoryPath, absObjectPath);
    const slashSegments = relativePath.split('/');
    const isCurrentPathFile = slashSegments.length < 2;
    return isCurrentPathFile;
}
function IsObjNameDir(storageObjectName) {
    const filePathParsed = EnsurePrefixSlash(storageObjectName);
    const isDir = HasTrailingSlash(filePathParsed);
    return isDir;
}
function IsObjNameFile(storageObjectName) {
    return !IsObjNameDir(storageObjectName);
}
function GetSubDirectory(currentDirectoryPath, absObjectPath) {
    const relativePath = GetRelativePath(currentDirectoryPath, absObjectPath);
    const slashSegments = relativePath.split('/');
    const subDirectory = slashSegments.shift();
    return subDirectory;
}
function Add2ToPath(inputPath) {
    const dotSegments = inputPath.split('.');
    const extension = dotSegments.pop();
    const fileName = dotSegments.join('.') + ' (2)' + '.' + extension;
    return fileName;
}
function Add2ToPathDir(inputPath) {
    const pathWithoutSlash = EnsureNoTrailingSlash(inputPath);
    const pathWith2 = pathWithoutSlash + ' (2)';
    const newDirName = EnsureTrailingSlash(pathWith2);
    return newDirName;
}
function GetFileNameWithExtension(inputPath) {
    const fileNameWithExt = inputPath.split('/').pop();
    return fileNameWithExt;
}
function GetFileNameWithoutExtension(inputPath) {
    const fileNameWithExt = GetFileNameWithExtension(inputPath);
    const segments = fileNameWithExt.split('.');
    segments.pop(); // remove extension
    return segments.join('.');
}
function GetPathUpToLastBracket(inputPath) {
    const slashes = inputPath.split('/');
    slashes.pop();
    const dirPath = slashes.join('/');
    const fileName = inputPath.slice(dirPath.length);
    const bracketSegments = fileName.split('(');
    bracketSegments.pop();
    const fileNameWith = bracketSegments.join('(');
    if (fileName.includes('(')) {
        const filepathWithBracket = join(dirPath, fileNameWith + '(');
        return filepathWithBracket;
    }
    const dotSegments = inputPath.split('.');
    if (dotSegments.length < 2) {
        return inputPath;
    }
    dotSegments.pop();
    return dotSegments.join('.');
}
const paths = {
    HasPrefixSlash,
    HasTrailingSlash,
    EnsureTrailingSlash,
    EnsureNoPrefixSlash,
    EnsurePrefixSlash,
    EnsureNoTrailingSlash,
    EnsureAbsolutePathFile,
    EnsureAbsolutePathDir,
    EnsureGoogleStoragePathDir,
    EnsureGoogleStoragePathFile,
    GetRelativePath,
    IsCurrentPath,
    IsCurrentPathFile,
    IsObjNameDir,
    IsObjNameFile,
    GetSubDirectory,
    GetParentDir,
    GetFileNameWithExtension,
    GetFileNameWithoutExtension,
    GetPathUpToLastBracket,
    Add2ToPath,
    Add2ToPathDir
};

function translateRawStorage(storageObject) {
    const filePath = storageObject.name;
    const filePathParsed = paths.EnsurePrefixSlash(filePath);
    return {
        ref: storageObject,
        name: basename(filePathParsed),
        fullPath: filePathParsed,
        isDir: paths.HasTrailingSlash(filePathParsed)
    };
}
function makePhantomStorageFolder(folderPath) {
    const pathParsed = paths.EnsureAbsolutePathDir(folderPath);
    return {
        ref: null,
        name: basename(pathParsed),
        fullPath: pathParsed,
        isDir: true,
        isPhantomFolder: true
    };
}
function translateStorageToResFile(f) {
    return __awaiter(this, void 0, void 0, function* () {
        const resFile = {};
        resFile.name = f.name;
        if (f.isDir) {
            resFile.type = 'dir';
            resFile.fullPath = paths.EnsureAbsolutePathDir(f.fullPath);
        }
        else {
            resFile.type = 'file';
            resFile.fullPath = paths.EnsureAbsolutePathFile(f.fullPath);
        }
        if (f.isPhantomFolder) {
            resFile.permissions = perms.factory.blankPermissionsObj();
            resFile.isPhantomFolder = true;
            return resFile;
        }
        try {
            const [exists] = yield f.ref.exists();
            if (!exists) {
                throw new Error('File not found: ' + resFile.fullPath);
            }
            const [aclObj] = yield f.ref.acl.get();
            resFile.rightsFirebase = aclObj;
            const metaResp = yield f.ref.getMetadata();
            const metaData = metaResp[0];
            const customMeta = metaData.metadata || {};
            const permissions = yield perms.queries.RetrieveFilePermissions(f.ref);
            resFile.permissions = permissions;
            resFile.size = metaData.size;
            resFile.date = metaData.updated;
            resFile.metaData = customMeta;
            return resFile;
        }
        catch (error) {
            throw new VError(error);
        }
    });
}
function StreamToPromise(stream) {
    return __awaiter(this, void 0, void 0, function* () {
        return new Promise((resolve, reject) => {
            let stringRes;
            stream.on('readable', function (buffer) {
                const part = buffer.read().toString();
                stringRes += part;
                console.log('stream data ' + part);
            });
            stream.on('end', res => {
                resolve(stringRes);
            });
            stream.on('error', err => {
                const errmsg = 'StreamToPromise(stream: Readable), Error reading stream: ' +
                    err.message;
                console.error(errmsg, { err });
                reject(errmsg);
            });
        });
    });
}
function getResult(res) {
    const fail = res.statusCode !== 204;
    return {
        success: !fail,
        error: fail ? 'error: ' + res.body : null
    };
}
function getResultFromArray(res) {
    const fail = res.find(r => r.statusCode !== 204);
    return {
        success: !fail,
        error: fail ? 'error: ' + JSON.stringify(fail.body) : null
    };
}
function ResultsObjFromArray(moveResults) {
    return moveResults.reduce((acc, cur) => {
        if (cur.error) {
            acc.error += ' | ' + cur.error;
            acc.success = false;
        }
        return acc;
    }, { error: '', success: true });
}

function GetAllChildrenWithPrefix(bucket, fileOrDirectoryPath) {
    return __awaiter(this, void 0, void 0, function* () {
        const pathNoPrefix = paths.EnsureNoPrefixSlash(fileOrDirectoryPath);
        const options = {};
        options.prefix = pathNoPrefix;
        try {
            const result = yield bucket.getFiles(options);
            const files = result[0];
            return files;
        }
        catch (error) {
            throw new VError(error);
        }
    });
}
function TryRenameFile(file, oldPrefix, newPrefix) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const originalFilePath = file.name;
            const relativePath = originalFilePath.slice(oldPrefix.length);
            const newPath = join(newPrefix, relativePath);
            const newFilePath = paths.EnsureNoPrefixSlash(newPath);
            console.log(`- renaming "${originalFilePath}" -> "${newFilePath}"`);
            const [response] = yield file.move(newFilePath);
            return { error: '', success: true };
        }
        catch (error) {
            const [fileExists] = yield file.exists();
            console.error('storage-helper: TryCopyFile() error renaming file', {
                fileExists,
                fileName: file.name,
                oldPrefix,
                newPrefix
            });
            throw new VError(error);
        }
    });
}
function TryCopyFile(file, oldPrefix, newPrefix) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const originalFilePath = file.name;
            const relativePath = originalFilePath.slice(oldPrefix.length);
            const newPath = join(newPrefix, relativePath);
            const newFilePath = paths.EnsureNoPrefixSlash(newPath);
            console.log(`- copying "${originalFilePath}" -> "${newFilePath}"`);
            const result = yield file.copy(newFilePath);
            return result[1];
        }
        catch (error) {
            const [fileExists] = yield file.exists();
            console.error('storage-helper: TryCopyFile() error copying file', {
                fileExists
            });
            throw new VError(error);
        }
    });
}
function TryCheckWritePermission(bucket, newDirPath, claims) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const parentPath = paths.GetParentDir(newDirPath);
            const isRoot = parentPath === '';
            if (isRoot) {
                return;
            }
            const parentDir = bucket.file(parentPath);
            const [fileExists] = yield parentDir.exists();
            if (!fileExists) {
                return TryCheckWritePermission(bucket, parentPath, claims);
            }
            const parentPermissions = yield perms.queries.RetrieveFilePermissions(parentDir);
            const result = perms.queries.TryCheckFileAccess(parentPermissions, claims, 'write');
            if (!result) {
                throw new Error('Permission denied creating item in directory:' + parentPath);
            }
        }
        catch (error) {
            throw new Error(error);
        }
    });
}
function MakeOptionsListRoot() {
    return {
        delimiter: '/',
        includeTrailingDelimiter: true,
        autoPaginate: false
    };
}
function MakeOptionsList(inputDirectoryPath) {
    return {
        delimiter: '/',
        includeTrailingDelimiter: true,
        directory: inputDirectoryPath,
        autoPaginate: false
    };
}
function GetFilesAndPrefixes(bucket, options) {
    return __awaiter(this, void 0, void 0, function* () {
        return new Promise((resolve, reject) => {
            const callback = (err, files, nextQuery, apiResponse) => {
                if (err) {
                    reject(err);
                    return;
                }
                const prefixes = apiResponse['prefixes'] || [];
                const result = {
                    files: files || [],
                    prefixes: prefixes
                };
                resolve(result);
            };
            bucket.getFiles(options, callback);
        });
    });
}
function GetFiles(bucket, options) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const result = yield bucket.getFiles(options);
            const storageObjects = result[0];
            const files = storageObjects.map(o => translateRawStorage(o));
            return files;
        }
        catch (error) {
            throw new VError(error);
        }
    });
}
function GetListFromStorage(bucket, inputDirectoryPath) {
    return __awaiter(this, void 0, void 0, function* () {
        const googleStorageDirPath = paths.EnsureGoogleStoragePathDir(inputDirectoryPath);
        const isRootPath = googleStorageDirPath === '/' || '';
        let options;
        if (isRootPath) {
            options = MakeOptionsListRoot();
        }
        else {
            options = MakeOptionsList(googleStorageDirPath);
        }
        try {
            const result = yield GetFilesAndPrefixes(bucket, options);
            const allObjects = result.files.map(o => translateRawStorage(o));
            const allObjectsPathsSet = new Set(allObjects.map(f => f.ref.name));
            const phantomPrefixes = result.prefixes.filter(prefix => !allObjectsPathsSet.has(prefix));
            const newPhantomFolders = phantomPrefixes.map(phantomPath => makePhantomStorageFolder(phantomPath));
            const combinedList = [...allObjects, ...newPhantomFolders];
            const filesWithoutCurrentDirectory = combinedList.filter(f => paths.EnsureGoogleStoragePathDir(f.fullPath) !== googleStorageDirPath);
            return filesWithoutCurrentDirectory;
        }
        catch (error) {
            throw new VError(error);
        }
    });
}
function GetListWithoutPermissions(bucket, inputDirectoryPath) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const files = yield GetListFromStorage(bucket, inputDirectoryPath);
            const resFiles = yield Promise.all(files.map(f => translateStorageToResFile(f)));
            return resFiles;
        }
        catch (error) {
            throw new VError(error);
        }
    });
}
const storage = {
    GetListWithoutPermissions,
    GetAllChildrenWithPrefix,
    MakeOptionsListRoot,
    MakeOptionsList,
    TryRenameFile,
    TryCopyFile,
    TryCheckWritePermission
};

function GetList(bucket, inputDirectoryPath, claims, isAdmin) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const resFiles = yield storage.GetListWithoutPermissions(bucket, inputDirectoryPath);
            if (isAdmin) {
                return resFiles;
            }
            const filesAllowed = resFiles.filter(f => {
                return perms.queries.TryCheckFileAccess(f.permissions, claims, 'read');
            });
            return filesAllowed;
        }
        catch (error) {
            throw new VError(error);
        }
    });
}

function RenameFile(bucket, inputSrc, inputDest, claims) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const parsedSrc = paths.EnsureNoPrefixSlash(inputSrc);
            const parsedDest = paths.EnsureNoPrefixSlash(inputDest);
            const fileItem = bucket.file(parsedSrc);
            const [exists] = yield fileItem.exists();
            if (!exists) {
                throw new Error(`
item: "${fileItem.name}" does not exist
bucket: "${bucket.name}"

inputSrc: "${inputSrc}",
inputDest: "${inputDest}",

parsedSrc: "${parsedSrc}",
parsedDest: "${parsedDest}",
`);
            }
            const isFile = !inputSrc.endsWith('/');
            if (isFile) {
                const resultObj = yield storage.TryRenameFile(fileItem, parsedSrc, parsedDest);
                return resultObj;
            }
            const allChildren = yield storage.GetAllChildrenWithPrefix(bucket, parsedSrc);
            const moveResults = yield Promise.all(allChildren.map(f => storage.TryRenameFile(f, parsedSrc, parsedDest)));
            return ResultsObjFromArray(moveResults);
        }
        catch (error) {
            throw new VError(error);
        }
    });
}

function moveWithChildren(bucket, itemPath, newFolderPrefix) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const oldFolderPrefix = paths.EnsureNoPrefixSlash(dirname(itemPath));
            const allChildren = yield storage.GetAllChildrenWithPrefix(bucket, itemPath);
            const successArray = yield Promise.all(allChildren.map(f => storage.TryRenameFile(f, oldFolderPrefix, newFolderPrefix)));
            return successArray;
        }
        catch (error) {
            throw new VError(error);
        }
    });
}
function MoveFiles(bucket, items, newDirectoryPath, claims) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const newFolderPrefix = paths.EnsureGoogleStoragePathDir(newDirectoryPath);
            const moveResultsArrArr = yield Promise.all(items.map(filePath => moveWithChildren(bucket, filePath, newFolderPrefix)));
            const moveResultsArr = moveResultsArrArr.reduce((acc, cur) => {
                return acc.concat(cur);
            }, []);
            return ResultsObjFromArray(moveResultsArr);
        }
        catch (error) {
            throw new VError(error);
        }
    });
}

function copyWithChildren(bucket, itemPath, newFolderPrefix) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const oldFolderPrefix = paths.EnsureNoPrefixSlash(dirname(itemPath));
            const allChildren = yield storage.GetAllChildrenWithPrefix(bucket, itemPath);
            const successArray = yield Promise.all(allChildren.map(f => storage.TryCopyFile(f, oldFolderPrefix, newFolderPrefix)));
            return successArray;
        }
        catch (error) {
            throw new VError(error);
        }
    });
}
function CopyFiles(bucket, items, newDirectoryPath, claims) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const newFolderPrefix = paths.EnsureGoogleStoragePathDir(newDirectoryPath);
            const copyResultsArrArr = yield Promise.all(items.map(filePath => copyWithChildren(bucket, filePath, newFolderPrefix)));
            const copyResultsArr = copyResultsArrArr.reduce((acc, cur) => {
                return acc.concat(cur);
            }, []);
            const results = getResultFromArray(copyResultsArr);
            return results;
        }
        catch (error) {
            throw new VError(error);
        }
    });
}

function tryDeleteFile(file) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const [exists] = yield file.exists();
            if (exists) {
                console.log('- deleting file: ', file.name);
                yield file.delete();
                return true;
            }
            return false;
        }
        catch (error) {
            throw new VError(error);
        }
    });
}
function RemoveFileWithChildren(bucket, itemPath) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const allChildren = yield storage.GetAllChildrenWithPrefix(bucket, itemPath);
            const successArray = yield Promise.all(allChildren.map(f => tryDeleteFile(f)));
            const allSuccesses = successArray.reduce((acc, cur) => (acc = acc && cur), true);
            return allSuccesses;
        }
        catch (error) {
            throw new VError(error);
        }
    });
}
function RemoveFiles(bucket, items, claims) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const googleStorageItemPaths = items.map(p => paths.EnsureNoPrefixSlash(p));
            const successArray = yield Promise.all(googleStorageItemPaths.map(itemPath => RemoveFileWithChildren(bucket, itemPath)));
            const allSuccesses = successArray.reduce((acc, cur) => (acc = acc && cur), true);
            const results = {
                success: allSuccesses
            };
            return results;
        }
        catch (error) {
            throw new VError(error);
        }
    });
}

function EditFile(bucket, item, content, claims) {
    return __awaiter(this, void 0, void 0, function* () {
        const result = { success: true };
        try {
            yield bucket.file(item).save(content);
        }
        catch (error) {
            result.success = false;
        }
        return result;
    });
}

function GetFileContent(bucket, item, claims) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const result = yield bucket.file(item).get();
            const file = result[0];
            const content = yield StreamToPromise(file.createReadStream());
            return content;
        }
        catch (error) {
            throw new VError(error);
        }
    });
}

const moment = require('moment');
function GetUrl(file) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const in5mins = moment()
                .add(5, 'minutes')
                .toDate();
            const config = { expires: in5mins, action: 'read' };
            const signedResult = yield file.getSignedUrl(config);
            const url = signedResult.shift();
            return url;
        }
        catch (error) {
            throw new VError(error);
        }
    });
}
function GetSingle(bucket, item, claims) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const actualFilePath = paths.EnsureNoPrefixSlash(item);
            const file = bucket.file(actualFilePath);
            const translatedF = translateRawStorage(file);
            const resFile = yield translateStorageToResFile(translatedF);
            resFile.downloadUrl = yield GetUrl(file);
            return resFile;
        }
        catch (error) {
            throw new VError(error);
        }
    });
}

function CreateFolderWithoutPermissions(bucket, newDirectoryPath) {
    return __awaiter(this, void 0, void 0, function* () {
        const directoryPath = paths.EnsureGoogleStoragePathDir(newDirectoryPath);
        const file = bucket.file(directoryPath);
        const result = { success: true };
        try {
            yield file.save('');
            const blankPerms = perms.factory.blankPermissionsObj();
            yield perms.commands.UpdateFilePermissions(file, blankPerms);
        }
        catch (error) {
            result.success = false;
        }
        return result;
    });
}
function GetNextFreeFoldername(bucket, targetChildDir) {
    return __awaiter(this, void 0, void 0, function* () {
        const parentDirectory = paths.GetParentDir(targetChildDir.name);
        const childrenMatching = yield storage.GetListWithoutPermissions(bucket, parentDirectory);
        const isEmptyParent = !childrenMatching || !childrenMatching.length;
        if (isEmptyParent) {
            return targetChildDir;
        }
        const childrenMatchingPaths = childrenMatching.map(f => paths.EnsureGoogleStoragePathDir(f.fullPath));
        const targetFolderPath = paths.EnsureGoogleStoragePathDir(targetChildDir.name);
        const folderExists = childrenMatchingPaths.some(path => path === targetFolderPath);
        if (!folderExists) {
            return targetChildDir;
        }
        const nextPath = paths.Add2ToPathDir(targetFolderPath);
        const nextFreeFile = bucket.file(nextPath);
        return nextFreeFile;
    });
}
function CreateFolder(bucket, newDirectoryPath, claims, disableNoClobber, isAdmin) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const newDirPath = paths.EnsureGoogleStoragePathDir(newDirectoryPath);
            const newDir = bucket.file(newDirPath);
            let newDirToAdd;
            if (!disableNoClobber) {
                newDirToAdd = yield GetNextFreeFoldername(bucket, newDir);
            }
            else {
                newDirToAdd = newDir;
            }
            if (!isAdmin) {
                yield storage.TryCheckWritePermission(bucket, newDirToAdd.name, claims);
            }
            return CreateFolderWithoutPermissions(bucket, newDirToAdd.name);
        }
        catch (error) {
            throw new Error(error);
        }
    });
}

function SetPermissionToObj(permissionsObj, role, entity) {
    const newPermissions = Object.assign(Object.assign({}, perms.factory.blankPermissionsObj()), permissionsObj);
    if (role === 'READER') {
        if (!newPermissions.readers.includes(entity)) {
            newPermissions.readers.push(entity);
        }
    }
    if (role === 'WRITER') {
        if (!newPermissions.writers.includes(entity)) {
            newPermissions.writers.push(entity);
        }
    }
    return newPermissions;
}
function ChangeSingleFilePermissionsAsSudo(file, role, entity) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const currentFilePermissions = yield perms.queries.RetrieveFilePermissions(file);
            const newPermissions = SetPermissionToObj(currentFilePermissions, role, entity);
            const res = yield perms.commands.UpdateFilePermissions(file, newPermissions);
            return res;
        }
        catch (error) {
            throw new VError(error);
        }
    });
}
function TryChangeSingleFilePermissions(file, role, entity, claims) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const currentFilePermissions = yield perms.queries.RetrieveFilePermissions(file);
            const newPermissions = SetPermissionToObj(currentFilePermissions, role, entity);
            perms.queries.CheckCanEditPermissions(currentFilePermissions, newPermissions, claims);
            const res = yield perms.commands.UpdateFilePermissions(file, newPermissions);
            return res;
        }
        catch (error) {
            throw new Error(error);
        }
    });
}
function tryChangePermissions(bucket, filePath, role, entity, isRecursive, claims) {
    return __awaiter(this, void 0, void 0, function* () {
        if (isRecursive) {
            try {
                const allChildren = yield storage.GetAllChildrenWithPrefix(bucket, filePath);
                const successArray = yield Promise.all(allChildren.map(file => TryChangeSingleFilePermissions(file, role, entity, claims)));
                return successArray;
            }
            catch (error) {
                throw new VError(error);
            }
        }
        else {
            try {
                const file = bucket.file(filePath);
                const result = yield TryChangeSingleFilePermissions(file, role, entity, claims);
                return [result];
            }
            catch (error) {
                throw new VError(error);
            }
        }
    });
}
function ChangePermissions(bucket, items, role, entity, isRecursive, claims) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            // perms.queries.TryCheckHasAnyPermissions(claims);
            const successArr = yield Promise.all(items.map(filePath => tryChangePermissions(bucket, filePath, role, entity, isRecursive, claims)));
            // return results;
            return {
                success: successArr
            };
        }
        catch (error) {
            throw new Error(error.message);
        }
    });
}

function SaveBufferToPath(file, mimetype, buffer) {
    return __awaiter(this, void 0, void 0, function* () {
        const fileOptions = {
            contentType: mimetype
        };
        console.log('uploadFile: SaveBufferToPath', { mimetype, path: file.name });
        return file.save(buffer, fileOptions);
    });
}
function GetNextFreeFilename(bucket, inputFile) {
    return __awaiter(this, void 0, void 0, function* () {
        const dirNameNoSuffix = paths.GetParentDir(inputFile.name);
        const childrenMatching = yield storage.GetListWithoutPermissions(bucket, dirNameNoSuffix);
        if (!childrenMatching || !childrenMatching.length) {
            return inputFile;
        }
        const matchingNames = childrenMatching.map(f => f.fullPath).sort();
        const lastMatch = matchingNames.shift();
        const nextPath = paths.Add2ToPath(lastMatch);
        const nextFreeFile = bucket.file(nextPath);
        return nextFreeFile;
    });
}
function UploadFile(bucket, directoryPath, originalname, mimetype, buffer, claims) {
    return __awaiter(this, void 0, void 0, function* () {
        const newPath = join(directoryPath, originalname);
        const bucketFilePath = paths.EnsureGoogleStoragePathFile(newPath);
        const desiredFile = bucket.file(bucketFilePath);
        try {
            let file;
            const [exists] = yield desiredFile.exists();
            if (exists) {
                file = yield GetNextFreeFilename(bucket, desiredFile);
            }
            else {
                file = desiredFile;
            }
            yield SaveBufferToPath(file, mimetype, buffer);
        }
        catch (error) {
            throw new Error('UploadFile: ' + error);
        }
    });
}

function TryChangeSingleFilePermissionsObject(file, newPermissions, claims) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            // Disabled for new Admin Flag in config
            // const currentFilePermissions = await perms.queries.RetrieveFilePermissions(
            //   file
            // );
            // perms.queries.CheckCanEditPermissions(
            //   currentFilePermissions,
            //   newPermissions,
            //   claims
            // );
            const res = yield perms.commands.UpdateFilePermissions(file, newPermissions);
            return res;
        }
        catch (error) {
            throw new Error(error);
        }
    });
}
function tryChangePermissionsObject(bucket, filePath, permissionsObj, isRecursive, claims) {
    return __awaiter(this, void 0, void 0, function* () {
        if (isRecursive) {
            try {
                const allChildren = yield storage.GetAllChildrenWithPrefix(bucket, filePath);
                const successArray = yield Promise.all(allChildren.map(file => TryChangeSingleFilePermissionsObject(file, permissionsObj, claims)));
                return successArray;
            }
            catch (error) {
                throw new VError(error);
            }
        }
        else {
            try {
                const file = bucket.file(filePath);
                const result = yield TryChangeSingleFilePermissionsObject(file, permissionsObj, claims);
                return [result];
            }
            catch (error) {
                throw new VError(error);
            }
        }
    });
}
function ChangePermissionsObject(bucket, items, permissionsObj, isRecursive, claims) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const successArr = yield Promise.all(items.map(filePath => tryChangePermissionsObject(bucket, filePath, permissionsObj, isRecursive, claims)));
            return {
                success: successArr
            };
        }
        catch (error) {
            throw new Error(error.message);
        }
    });
}

const commands = {
    GetList,
    RenameFile,
    MoveFiles,
    CopyFiles,
    RemoveFiles,
    EditFile,
    GetFileContent,
    GetSingle,
    CreateFolder,
    ChangePermissions,
    ChangePermissionsObject,
    UploadFile
};

function CheckHasBodyProp(body, bodyFieldName) {
    return __awaiter(this, void 0, void 0, function* () {
        const exists = body[bodyFieldName];
        if (!exists) {
            throw new Error(`Request is missing property in req.body: '${bodyFieldName}'`);
        }
    });
}
class NgxFileMangerApiFireBaseClass {
    constructor(storage) {
        this.storage = storage;
    }
    getBucket(bucketname) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!bucketname) {
                throw new Error(`Request is missing property in req.body: 'bucketname'`);
            }
            try {
                const bucket = this.storage.bucket(bucketname);
                const exists = (yield bucket.exists()).shift();
                if (!exists) {
                    throw new Error(`bucket: "${bucketname}" doesn't exist, please create it first`);
                }
                return bucket;
            }
            catch (error) {
                throw new Error('Error retrieving bucket: ' + error.message);
            }
        });
    }
    HandleList(body, claims) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                yield CheckHasBodyProp(body, 'path');
                const bucket = yield this.getBucket(body.bucketname);
                const resFiles = yield commands.GetList(bucket, body.path, claims, body.isAdmin);
                const response = {
                    result: resFiles
                };
                return response;
            }
            catch (error) {
                throw new VError(error);
            }
        });
    }
    HandleRename(body, claims) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                yield CheckHasBodyProp(body, 'item');
                yield CheckHasBodyProp(body, 'newItemPath');
                const bucket = yield this.getBucket(body.bucketname);
                const result = yield commands.RenameFile(bucket, body.item, body.newItemPath, claims);
                const response = {
                    result: result
                };
                return response;
            }
            catch (error) {
                throw new VError(error);
            }
        });
    }
    HandleMove(body, claims) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const bucket = yield this.getBucket(body.bucketname);
                yield CheckHasBodyProp(body, 'items');
                yield CheckHasBodyProp(body, 'newPath');
                const result = yield commands.MoveFiles(bucket, body.items, body.newPath, claims);
                const response = {
                    result: result
                };
                return response;
            }
            catch (error) {
                throw new VError(error);
            }
        });
    }
    HandleCopy(body, claims) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                yield CheckHasBodyProp(body, 'newPath');
                const bucket = yield this.getBucket(body.bucketname);
                let filesToCopy;
                if (body.items) {
                    filesToCopy = body.items;
                }
                else if (body.singleFileName) {
                    filesToCopy = [body.singleFileName];
                }
                else {
                    throw new Error('Request does not contain either body.items or body.singleFileName');
                }
                const result = yield commands.CopyFiles(bucket, filesToCopy, body.newPath, claims);
                const response = {
                    result: result
                };
                return response;
            }
            catch (error) {
                throw new VError(error);
            }
        });
    }
    HandleRemove(body, claims) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                yield CheckHasBodyProp(body, 'items');
                const bucket = yield this.getBucket(body.bucketname);
                const result = yield commands.RemoveFiles(bucket, body.items, claims);
                const response = {
                    result: result
                };
                return response;
            }
            catch (error) {
                throw new VError(error);
            }
        });
    }
    HandleEdit(body, claims) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                yield CheckHasBodyProp(body, 'item');
                yield CheckHasBodyProp(body, 'content');
                const bucket = yield this.getBucket(body.bucketname);
                const result = yield commands.EditFile(bucket, body.item, body.content, claims);
                const response = {
                    result: result
                };
                return response;
            }
            catch (error) {
                throw new VError(error);
            }
        });
    }
    HandleGetContent(body, claims) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                yield CheckHasBodyProp(body, 'item');
                const bucket = yield this.getBucket(body.bucketname);
                const result = yield commands.GetFileContent(bucket, body.item, claims);
                const response = {
                    result: result
                };
                return response;
            }
            catch (error) {
                throw new VError(error);
            }
        });
    }
    HandleGetSingle(body, claims) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                yield CheckHasBodyProp(body, 'item');
                const bucket = yield this.getBucket(body.bucketname);
                const file = yield commands.GetSingle(bucket, body.item, claims);
                const response = {
                    result: {
                        success: true,
                        file: file,
                        url: file.downloadUrl
                    }
                };
                return response;
            }
            catch (error) {
                throw new VError(error);
            }
        });
    }
    HandleCreateFolder(body, claims) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                yield CheckHasBodyProp(body, 'newPath');
                const bucket = yield this.getBucket(body.bucketname);
                const result = yield commands.CreateFolder(bucket, body.newPath, claims, body.disableNoClobber, body.isAdmin);
                const response = {
                    result: result
                };
                return response;
            }
            catch (error) {
                throw new VError(error);
            }
        });
    }
    HandleSetPermissions(body, claims) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                yield CheckHasBodyProp(body, 'items');
                yield CheckHasBodyProp(body, 'role');
                yield CheckHasBodyProp(body, 'entity');
                const bucket = yield this.getBucket(body.bucketname);
                const result = yield commands.ChangePermissions(bucket, body.items, body.role, body.entity, body.recursive, claims);
                const response = {
                    result: result
                };
                return response;
            }
            catch (error) {
                throw new VError(error.message);
            }
        });
    }
    HandleSetPermissionsObject(body, claims) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                yield CheckHasBodyProp(body, 'items');
                yield CheckHasBodyProp(body, 'permissionsObj');
                const bucket = yield this.getBucket(body.bucketname);
                const result = yield commands.ChangePermissionsObject(bucket, body.items, body.permissionsObj, body.recursive, claims);
                const response = {
                    result: result
                };
                return response;
            }
            catch (error) {
                throw new VError(error.message);
            }
        });
    }
    HandleSaveFile(bucketname, directoryPath, originalname, mimetype, buffer, claims) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const bucket = yield this.getBucket(bucketname);
                yield commands.UploadFile(bucket, directoryPath, originalname, mimetype, buffer, claims);
                const result = {
                    result: {
                        success: true
                    }
                };
                return result;
            }
            catch (error) {
                throw new VError(error);
            }
        });
    }
}

const ParseUploadFile = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const form = new IncomingForm();
        const files = yield new Promise((resolve, reject) => {
            form.parse(req, function (err, fields, fieldFileMap) {
                const fileArray = Object.values(fieldFileMap);
                resolve(fileArray);
            });
        });
        const convertedFiles = yield Promise.all(files.map(f => convertToFileAndBuffer(f)));
        req.files = convertedFiles;
        next();
    }
    catch (error) {
        console.error(error);
        throw new Error(error);
    }
});
function convertToFileAndBuffer(f) {
    return __awaiter(this, void 0, void 0, function* () {
        const fileBuffer = yield new Promise((resolve, reject) => readFile(f.path, function (err, buffer) {
            if (err) {
                reject(err);
            }
            else {
                resolve(buffer);
            }
        }));
        unlinkSync(f.path);
        return {
            buffer: fileBuffer,
            mimetype: f.type,
            originalname: f.name,
            hash: f.hash
        };
    });
}

// Add middle ware to this route
const express = require('express');
let fmApi;
let LOGGING = false;
const endpoint = express();
endpoint.use(AddCors);
endpoint.use(OptionRequestsAreOk);
endpoint.use((req, res, next) => {
    req.body.path = `${req.body._c_id}/${req.body.path}`;
    if (LOGGING) {
        LogRequest(req, res, next);
    }
    else {
        next();
    }
});
endpoint.use('/hello', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    console.log('HELLO');
    res.status(200).send('HELLO\n');
}));
endpoint.use(PostRequestsOnly);
endpoint.use('/upload', OptionRequestsAreOk, PostRequestsOnly, HasQueryParam('bucketname'), HasQueryParam('directoryPath'), ParseUploadFile, (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const bucketname = req.query.bucketname;
    const directoryPath = req.query.directoryPath;
    try {
        const files = req.files;
        const userClaims = yield permsQueries.RetrieveCustomClaims(req);
        const results = yield Promise.all(files.map(file => trySaveFile(bucketname, directoryPath, file, userClaims)));
        const success = {
            result: {
                success: true
            }
        };
        const finalResult = results.reduce((acc, cur) => {
            if (cur.result.error) {
                return cur;
            }
            return success;
        }, success);
        res.status(200).send(finalResult);
    }
    catch (error) {
        console.error('Error occurred while uploading: \n', VError.fullStack(error));
        res
            .status(400)
            .send('Error occurred while uploading: \n' + error.message);
        return;
    }
}));
function trySaveFile(bucketname, directoryPath, f, userClaims) {
    return __awaiter(this, void 0, void 0, function* () {
        return fmApi.HandleSaveFile(bucketname, directoryPath, f.originalname, f.mimetype, f.buffer, userClaims);
    });
}
endpoint.use('/', HasBodyProp('action'), HasBodyProp('bucketname'), (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const action = req.body.action;
    try {
        const userClaims = yield permsQueries.RetrieveCustomClaims(req);
        let body;
        switch (action) {
            case 'list':
                body = yield fmApi.HandleList(req.body, userClaims);
                break;
            case 'rename':
                body = yield fmApi.HandleRename(req.body, userClaims);
                break;
            case 'move':
                body = yield fmApi.HandleMove(req.body, userClaims);
                break;
            case 'copy':
                body = yield fmApi.HandleCopy(req.body, userClaims);
                break;
            case 'remove':
                body = yield fmApi.HandleRemove(req.body, userClaims);
                break;
            case 'edit':
                body = yield fmApi.HandleEdit(req.body, userClaims);
                break;
            case 'getContent':
                body = yield fmApi.HandleGetContent(req.body, userClaims);
                break;
            case 'createFolder':
                body = yield fmApi.HandleCreateFolder(req.body, userClaims);
                break;
            case 'getSingle':
                body = yield fmApi.HandleGetSingle(req.body, userClaims);
                break;
            case 'changePermissions':
                body = yield fmApi.HandleSetPermissions(req.body, userClaims);
                break;
            case 'changePermissionsObject':
                body = yield fmApi.HandleSetPermissionsObject(req.body, userClaims);
                break;
            case 'compress':
            case 'extract':
            case 'downloadMultiple':
            default:
                throw new Error('action has not been implemented');
        }
        res.status(200).send(body);
    }
    catch (error) {
        console.error('Error while processing request: \n', VError.fullStack(error));
        const returnedError = {
            error: `Bad request to ngx-file-manager!`,
            errorDetail: error.message,
            requestBody: req.body
        };
        res.status(400).send(returnedError);
    }
}));
endpoint.use(notImplemented);
function notImplemented(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const bodyString = JSON.stringify(req.body);
        res.status(501).send('That request has not been implemented: ' + bodyString);
    });
}
/*
Use by attaching to a firebase function
exports.FileManagerApi = StorageEndpoint;
*/
const FileManagerEndpointExpress = (options) => {
    LOGGING = options.logging;
    fmApi = new NgxFileMangerApiFireBaseClass(options.storage);
    return endpoint;
};

/*
 * Public API Surface of ngx-filemanager-api-firebase
 */

/**
 * Generated bundle index. Do not edit.
 */

export { FileManagerEndpointExpress };
//# sourceMappingURL=ngx-filemanager-api-firebase.js.map
