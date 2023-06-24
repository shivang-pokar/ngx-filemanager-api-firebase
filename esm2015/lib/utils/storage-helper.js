import { __awaiter } from "tslib";
import * as path from 'path';
import { VError } from 'verror';
import { paths } from './paths';
import { perms } from '../permissions';
import { translateStorageToResFile, makePhantomStorageFolder, translateRawStorage } from './translation-helpers';
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
            const newPath = path.join(newPrefix, relativePath);
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
            const newPath = path.join(newPrefix, relativePath);
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
export function MakeOptionsListRoot() {
    return {
        delimiter: '/',
        includeTrailingDelimiter: true,
        autoPaginate: false
    };
}
export function MakeOptionsList(inputDirectoryPath) {
    return {
        delimiter: '/',
        includeTrailingDelimiter: true,
        directory: inputDirectoryPath,
        autoPaginate: false
    };
}
export function GetFilesAndPrefixes(bucket, options) {
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
export function GetFiles(bucket, options) {
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
export function GetListFromStorage(bucket, inputDirectoryPath) {
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
export function GetListWithoutPermissions(bucket, inputDirectoryPath) {
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
export const storage = {
    GetListWithoutPermissions,
    GetAllChildrenWithPrefix,
    MakeOptionsListRoot,
    MakeOptionsList,
    TryRenameFile,
    TryCopyFile,
    TryCheckWritePermission
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic3RvcmFnZS1oZWxwZXIuanMiLCJzb3VyY2VSb290IjoiL1ZvbHVtZXMvU2hpdmFuZy9QaSBTb2Z0d2FyZS9maWxlLW1hbmFnZXIvbmd4LWZpbGVtYW5hZ2VyL3Byb2plY3RzL25neC1maWxlbWFuYWdlci1hcGktZmlyZWJhc2Uvc3JjLyIsInNvdXJjZXMiOlsibGliL3V0aWxzL3N0b3JhZ2UtaGVscGVyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQSxPQUFPLEtBQUssSUFBSSxNQUFNLE1BQU0sQ0FBQztBQUU3QixPQUFPLEVBQUUsTUFBTSxFQUFFLE1BQU0sUUFBUSxDQUFDO0FBSWhDLE9BQU8sRUFBRSxLQUFLLEVBQUUsTUFBTSxTQUFTLENBQUM7QUFDaEMsT0FBTyxFQUFFLEtBQUssRUFBRSxNQUFNLGdCQUFnQixDQUFDO0FBRXZDLE9BQU8sRUFDTCx5QkFBeUIsRUFDekIsd0JBQXdCLEVBQ3hCLG1CQUFtQixFQUNwQixNQUFNLHVCQUF1QixDQUFDO0FBRS9CLFNBQWUsd0JBQXdCLENBQ3JDLE1BQWMsRUFDZCxtQkFBMkI7O1FBRTNCLE1BQU0sWUFBWSxHQUFHLEtBQUssQ0FBQyxtQkFBbUIsQ0FBQyxtQkFBbUIsQ0FBQyxDQUFDO1FBQ3BFLE1BQU0sT0FBTyxHQUFvQixFQUFFLENBQUM7UUFDcEMsT0FBTyxDQUFDLE1BQU0sR0FBRyxZQUFZLENBQUM7UUFDOUIsSUFBSTtZQUNGLE1BQU0sTUFBTSxHQUFHLE1BQU0sTUFBTSxDQUFDLFFBQVEsQ0FBQyxPQUFPLENBQUMsQ0FBQztZQUM5QyxNQUFNLEtBQUssR0FBRyxNQUFNLENBQUMsQ0FBQyxDQUFDLENBQUM7WUFDeEIsT0FBTyxLQUFLLENBQUM7U0FDZDtRQUFDLE9BQU8sS0FBSyxFQUFFO1lBQ2QsTUFBTSxJQUFJLE1BQU0sQ0FBQyxLQUFLLENBQUMsQ0FBQztTQUN6QjtJQUNILENBQUM7Q0FBQTtBQUVELFNBQWUsYUFBYSxDQUMxQixJQUFVLEVBQ1YsU0FBaUIsRUFDakIsU0FBaUI7O1FB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R0FBRyxNQUFNLE9BQU8sQ0FBQyxHQUFHLENBQ2hDLEtBQUssQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyx5QkFBeUIsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUM3QyxDQUFDO1lBQ0YsT0FBTyxRQUFRLENBQUM7U0FDakI7UUFBQyxPQUFPLEtBQUssRUFBRTtZQUNkLE1BQU0sSUFBSSxNQUFNLENBQUMsS0FBSyxDQUFDLENBQUM7U0FDekI7SUFDSCxDQUFDO0NBQUE7QUFFRCxNQUFNLENBQUMsTUFBTSxPQUFPLEdBQUc7SUFDckIseUJBQXlCO0lBQ3pCLHdCQUF3QjtJQUN4QixtQkFBbUI7SUFDbkIsZUFBZTtJQUNmLGFBQWE7SUFDYixXQUFXO0lBQ1gsdUJBQXVCO0NBQ3hCLENBQUMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgKiBhcyBwYXRoIGZyb20gJ3BhdGgnO1xuaW1wb3J0ICogYXMgcmVxdWVzdCBmcm9tICdyZXF1ZXN0JztcbmltcG9ydCB7IFZFcnJvciB9IGZyb20gJ3ZlcnJvcic7XG5pbXBvcnQgeyBHZXRGaWxlc09wdGlvbnMgfSBmcm9tICdAZ29vZ2xlLWNsb3VkL3N0b3JhZ2UnO1xuXG5pbXBvcnQgeyBCdWNrZXQsIEZpbGUsIEZpbGVGcm9tU3RvcmFnZSB9IGZyb20gJy4uL3R5cGVzL2dvb2dsZS1jbG91ZC10eXBlcyc7XG5pbXBvcnQgeyBwYXRocyB9IGZyb20gJy4vcGF0aHMnO1xuaW1wb3J0IHsgcGVybXMgfSBmcm9tICcuLi9wZXJtaXNzaW9ucyc7XG5pbXBvcnQgeyBDb3JlVHlwZXMgfSBmcm9tICcuLi90eXBlcyc7XG5pbXBvcnQge1xuICB0cmFuc2xhdGVTdG9yYWdlVG9SZXNGaWxlLFxuICBtYWtlUGhhbnRvbVN0b3JhZ2VGb2xkZXIsXG4gIHRyYW5zbGF0ZVJhd1N0b3JhZ2Vcbn0gZnJvbSAnLi90cmFuc2xhdGlvbi1oZWxwZXJzJztcblxuYXN5bmMgZnVuY3Rpb24gR2V0QWxsQ2hpbGRyZW5XaXRoUHJlZml4KFxuICBidWNrZXQ6IEJ1Y2tldCxcbiAgZmlsZU9yRGlyZWN0b3J5UGF0aDogc3RyaW5nXG4pOiBQcm9taXNlPEZpbGVbXT4ge1xuICBjb25zdCBwYXRoTm9QcmVmaXggPSBwYXRocy5FbnN1cmVOb1ByZWZpeFNsYXNoKGZpbGVPckRpcmVjdG9yeVBhdGgpO1xuICBjb25zdCBvcHRpb25zOiBHZXRGaWxlc09wdGlvbnMgPSB7fTtcbiAgb3B0aW9ucy5wcmVmaXggPSBwYXRoTm9QcmVmaXg7XG4gIHRyeSB7XG4gICAgY29uc3QgcmVzdWx0ID0gYXdhaXQgYnVja2V0LmdldEZpbGVzKG9wdGlvbnMpO1xuICAgIGNvbnN0IGZpbGVzID0gcmVzdWx0WzBdO1xuICAgIHJldHVybiBmaWxlcztcbiAgfSBjYXRjaCAoZXJyb3IpIHtcbiAgICB0aHJvdyBuZXcgVkVycm9yKGVycm9yKTtcbiAgfVxufVxuXG5hc3luYyBmdW5jdGlvbiBUcnlSZW5hbWVGaWxlKFxuICBmaWxlOiBGaWxlLFxuICBvbGRQcmVmaXg6IHN0cmluZyxcbiAgbmV3UHJlZml4OiBzdHJpbmdcbik6IFByb21pc2U8Q29yZVR5cGVzLlJlc3VsdE9iaj4ge1xuICB0cnkge1xuICAgIGNvbnN0IG9yaWdpbmFsRmlsZVBhdGggPSBmaWxlLm5hbWU7XG4gICAgY29uc3QgcmVsYXRpdmVQYXRoID0gb3JpZ2luYWxGaWxlUGF0aC5zbGljZShvbGRQcmVmaXgubGVuZ3RoKTtcbiAgICBjb25zdCBuZXdQYXRoID0gcGF0aC5qb2luKG5ld1ByZWZpeCwgcmVsYXRpdmVQYXRoKTtcbiAgICBjb25zdCBuZXdGaWxlUGF0aCA9IHBhdGhzLkVuc3VyZU5vUHJlZml4U2xhc2gobmV3UGF0aCk7XG4gICAgY29uc29sZS5sb2coYC0gcmVuYW1pbmcgXCIke29yaWdpbmFsRmlsZVBhdGh9XCIgLT4gXCIke25ld0ZpbGVQYXRofVwiYCk7XG4gICAgY29uc3QgW3Jlc3BvbnNlXSA9IGF3YWl0IGZpbGUubW92ZShuZXdGaWxlUGF0aCk7XG4gICAgcmV0dXJuIHsgZXJyb3I6ICcnLCBzdWNjZXNzOiB0cnVlIH07XG4gIH0gY2F0Y2ggKGVycm9yKSB7XG4gICAgY29uc3QgW2ZpbGVFeGlzdHNdID0gYXdhaXQgZmlsZS5leGlzdHMoKTtcbiAgICBjb25zb2xlLmVycm9yKCdzdG9yYWdlLWhlbHBlcjogVHJ5Q29weUZpbGUoKSBlcnJvciByZW5hbWluZyBmaWxlJywge1xuICAgICAgZmlsZUV4aXN0cyxcbiAgICAgIGZpbGVOYW1lOiBmaWxlLm5hbWUsXG4gICAgICBvbGRQcmVmaXgsXG4gICAgICBuZXdQcmVmaXhcbiAgICB9KTtcbiAgICB0aHJvdyBuZXcgVkVycm9yKGVycm9yKTtcbiAgfVxufVxuXG5hc3luYyBmdW5jdGlvbiBUcnlDb3B5RmlsZShmaWxlOiBGaWxlLCBvbGRQcmVmaXg6IHN0cmluZywgbmV3UHJlZml4OiBzdHJpbmcpIHtcbiAgdHJ5IHtcbiAgICBjb25zdCBvcmlnaW5hbEZpbGVQYXRoID0gZmlsZS5uYW1lO1xuICAgIGNvbnN0IHJlbGF0aXZlUGF0aCA9IG9yaWdpbmFsRmlsZVBhdGguc2xpY2Uob2xkUHJlZml4Lmxlbmd0aCk7XG4gICAgY29uc3QgbmV3UGF0aCA9IHBhdGguam9pbihuZXdQcmVmaXgsIHJlbGF0aXZlUGF0aCk7XG4gICAgY29uc3QgbmV3RmlsZVBhdGggPSBwYXRocy5FbnN1cmVOb1ByZWZpeFNsYXNoKG5ld1BhdGgpO1xuICAgIGNvbnNvbGUubG9nKGAtIGNvcHlpbmcgXCIke29yaWdpbmFsRmlsZVBhdGh9XCIgLT4gXCIke25ld0ZpbGVQYXRofVwiYCk7XG4gICAgY29uc3QgcmVzdWx0ID0gYXdhaXQgZmlsZS5jb3B5KG5ld0ZpbGVQYXRoKTtcbiAgICByZXR1cm4gcmVzdWx0WzFdO1xuICB9IGNhdGNoIChlcnJvcikge1xuICAgIGNvbnN0IFtmaWxlRXhpc3RzXSA9IGF3YWl0IGZpbGUuZXhpc3RzKCk7XG4gICAgY29uc29sZS5lcnJvcignc3RvcmFnZS1oZWxwZXI6IFRyeUNvcHlGaWxlKCkgZXJyb3IgY29weWluZyBmaWxlJywge1xuICAgICAgZmlsZUV4aXN0c1xuICAgIH0pO1xuICAgIHRocm93IG5ldyBWRXJyb3IoZXJyb3IpO1xuICB9XG59XG5cbmFzeW5jIGZ1bmN0aW9uIFRyeUNoZWNrV3JpdGVQZXJtaXNzaW9uKFxuICBidWNrZXQ6IEJ1Y2tldCxcbiAgbmV3RGlyUGF0aDogc3RyaW5nLFxuICBjbGFpbXM6IENvcmVUeXBlcy5Vc2VyQ3VzdG9tQ2xhaW1zXG4pOiBQcm9taXNlPGFueT4ge1xuICB0cnkge1xuICAgIGNvbnN0IHBhcmVudFBhdGggPSBwYXRocy5HZXRQYXJlbnREaXIobmV3RGlyUGF0aCk7XG4gICAgY29uc3QgaXNSb290ID0gcGFyZW50UGF0aCA9PT0gJyc7XG4gICAgaWYgKGlzUm9vdCkge1xuICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICBjb25zdCBwYXJlbnREaXIgPSBidWNrZXQuZmlsZShwYXJlbnRQYXRoKTtcbiAgICBjb25zdCBbZmlsZUV4aXN0c10gPSBhd2FpdCBwYXJlbnREaXIuZXhpc3RzKCk7XG4gICAgaWYgKCFmaWxlRXhpc3RzKSB7XG4gICAgICByZXR1cm4gVHJ5Q2hlY2tXcml0ZVBlcm1pc3Npb24oYnVja2V0LCBwYXJlbnRQYXRoLCBjbGFpbXMpO1xuICAgIH1cbiAgICBjb25zdCBwYXJlbnRQZXJtaXNzaW9ucyA9IGF3YWl0IHBlcm1zLnF1ZXJpZXMuUmV0cmlldmVGaWxlUGVybWlzc2lvbnMoXG4gICAgICBwYXJlbnREaXJcbiAgICApO1xuICAgIGNvbnN0IHJlc3VsdCA9IHBlcm1zLnF1ZXJpZXMuVHJ5Q2hlY2tGaWxlQWNjZXNzKFxuICAgICAgcGFyZW50UGVybWlzc2lvbnMsXG4gICAgICBjbGFpbXMsXG4gICAgICAnd3JpdGUnXG4gICAgKTtcbiAgICBpZiAoIXJlc3VsdCkge1xuICAgICAgdGhyb3cgbmV3IEVycm9yKFxuICAgICAgICAnUGVybWlzc2lvbiBkZW5pZWQgY3JlYXRpbmcgaXRlbSBpbiBkaXJlY3Rvcnk6JyArIHBhcmVudFBhdGhcbiAgICAgICk7XG4gICAgfVxuICB9IGNhdGNoIChlcnJvcikge1xuICAgIHRocm93IG5ldyBFcnJvcihlcnJvcik7XG4gIH1cbn1cblxuLy8gTElTVFxuXG5pbnRlcmZhY2UgRmlsZXNBbmRQcmVmaXhlcyB7XG4gIGZpbGVzOiBGaWxlW107XG4gIHByZWZpeGVzOiBzdHJpbmdbXTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIE1ha2VPcHRpb25zTGlzdFJvb3QoKTogR2V0RmlsZXNPcHRpb25zIHtcbiAgcmV0dXJuIHtcbiAgICBkZWxpbWl0ZXI6ICcvJyxcbiAgICBpbmNsdWRlVHJhaWxpbmdEZWxpbWl0ZXI6IHRydWUsXG4gICAgYXV0b1BhZ2luYXRlOiBmYWxzZVxuICB9IGFzIGFueTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIE1ha2VPcHRpb25zTGlzdChpbnB1dERpcmVjdG9yeVBhdGg6IHN0cmluZykge1xuICByZXR1cm4ge1xuICAgIGRlbGltaXRlcjogJy8nLFxuICAgIGluY2x1ZGVUcmFpbGluZ0RlbGltaXRlcjogdHJ1ZSxcbiAgICBkaXJlY3Rvcnk6IGlucHV0RGlyZWN0b3J5UGF0aCxcbiAgICBhdXRvUGFnaW5hdGU6IGZhbHNlXG4gIH0gYXMgYW55O1xufVxuXG5leHBvcnQgYXN5bmMgZnVuY3Rpb24gR2V0RmlsZXNBbmRQcmVmaXhlcyhcbiAgYnVja2V0OiBCdWNrZXQsXG4gIG9wdGlvbnM6IEdldEZpbGVzT3B0aW9uc1xuKTogUHJvbWlzZTxGaWxlc0FuZFByZWZpeGVzPiB7XG4gIHJldHVybiBuZXcgUHJvbWlzZTxGaWxlc0FuZFByZWZpeGVzPigocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XG4gICAgY29uc3QgY2FsbGJhY2sgPSAoXG4gICAgICBlcnI6IEVycm9yIHwgbnVsbCxcbiAgICAgIGZpbGVzPzogRmlsZVtdLFxuICAgICAgbmV4dFF1ZXJ5Pzoge30sXG4gICAgICBhcGlSZXNwb25zZT86IHJlcXVlc3QuUmVzcG9uc2VcbiAgICApID0+IHtcbiAgICAgIGlmIChlcnIpIHtcbiAgICAgICAgcmVqZWN0KGVycik7XG4gICAgICAgIHJldHVybjtcbiAgICAgIH1cbiAgICAgIGNvbnN0IHByZWZpeGVzID0gYXBpUmVzcG9uc2VbJ3ByZWZpeGVzJ10gfHwgW107XG4gICAgICBjb25zdCByZXN1bHQ6IEZpbGVzQW5kUHJlZml4ZXMgPSB7XG4gICAgICAgIGZpbGVzOiBmaWxlcyB8fCBbXSxcbiAgICAgICAgcHJlZml4ZXM6IHByZWZpeGVzXG4gICAgICB9O1xuICAgICAgcmVzb2x2ZShyZXN1bHQpO1xuICAgIH07XG4gICAgYnVja2V0LmdldEZpbGVzKG9wdGlvbnMsIGNhbGxiYWNrKTtcbiAgfSk7XG59XG5cbmV4cG9ydCBhc3luYyBmdW5jdGlvbiBHZXRGaWxlcyhcbiAgYnVja2V0OiBCdWNrZXQsXG4gIG9wdGlvbnM6IEdldEZpbGVzT3B0aW9uc1xuKTogUHJvbWlzZTxGaWxlRnJvbVN0b3JhZ2VbXT4ge1xuICB0cnkge1xuICAgIGNvbnN0IHJlc3VsdCA9IGF3YWl0IGJ1Y2tldC5nZXRGaWxlcyhvcHRpb25zKTtcbiAgICBjb25zdCBzdG9yYWdlT2JqZWN0cyA9IHJlc3VsdFswXTtcbiAgICBjb25zdCBmaWxlcyA9IHN0b3JhZ2VPYmplY3RzLm1hcChvID0+IHRyYW5zbGF0ZVJhd1N0b3JhZ2UobykpO1xuICAgIHJldHVybiBmaWxlcztcbiAgfSBjYXRjaCAoZXJyb3IpIHtcbiAgICB0aHJvdyBuZXcgVkVycm9yKGVycm9yKTtcbiAgfVxufVxuXG5leHBvcnQgYXN5bmMgZnVuY3Rpb24gR2V0TGlzdEZyb21TdG9yYWdlKFxuICBidWNrZXQ6IEJ1Y2tldCxcbiAgaW5wdXREaXJlY3RvcnlQYXRoOiBzdHJpbmdcbik6IFByb21pc2U8RmlsZUZyb21TdG9yYWdlW10+IHtcbiAgY29uc3QgZ29vZ2xlU3RvcmFnZURpclBhdGggPSBwYXRocy5FbnN1cmVHb29nbGVTdG9yYWdlUGF0aERpcihcbiAgICBpbnB1dERpcmVjdG9yeVBhdGhcbiAgKTtcbiAgY29uc3QgaXNSb290UGF0aCA9IGdvb2dsZVN0b3JhZ2VEaXJQYXRoID09PSAnLycgfHwgJyc7XG4gIGxldCBvcHRpb25zO1xuICBpZiAoaXNSb290UGF0aCkge1xuICAgIG9wdGlvbnMgPSBNYWtlT3B0aW9uc0xpc3RSb290KCk7XG4gIH0gZWxzZSB7XG4gICAgb3B0aW9ucyA9IE1ha2VPcHRpb25zTGlzdChnb29nbGVTdG9yYWdlRGlyUGF0aCk7XG4gIH1cbiAgdHJ5IHtcbiAgICBjb25zdCByZXN1bHQgPSBhd2FpdCBHZXRGaWxlc0FuZFByZWZpeGVzKGJ1Y2tldCwgb3B0aW9ucyk7XG4gICAgY29uc3QgYWxsT2JqZWN0cyA9IHJlc3VsdC5maWxlcy5tYXAobyA9PiB0cmFuc2xhdGVSYXdTdG9yYWdlKG8pKTtcblxuICAgIGNvbnN0IGFsbE9iamVjdHNQYXRoc1NldCA9IG5ldyBTZXQoYWxsT2JqZWN0cy5tYXAoZiA9PiBmLnJlZi5uYW1lKSk7XG4gICAgY29uc3QgcGhhbnRvbVByZWZpeGVzID0gcmVzdWx0LnByZWZpeGVzLmZpbHRlcihcbiAgICAgIHByZWZpeCA9PiAhYWxsT2JqZWN0c1BhdGhzU2V0LmhhcyhwcmVmaXgpXG4gICAgKTtcblxuICAgIGNvbnN0IG5ld1BoYW50b21Gb2xkZXJzID0gcGhhbnRvbVByZWZpeGVzLm1hcChwaGFudG9tUGF0aCA9PlxuICAgICAgbWFrZVBoYW50b21TdG9yYWdlRm9sZGVyKHBoYW50b21QYXRoKVxuICAgICk7XG4gICAgY29uc3QgY29tYmluZWRMaXN0ID0gWy4uLmFsbE9iamVjdHMsIC4uLm5ld1BoYW50b21Gb2xkZXJzXTtcbiAgICBjb25zdCBmaWxlc1dpdGhvdXRDdXJyZW50RGlyZWN0b3J5ID0gY29tYmluZWRMaXN0LmZpbHRlcihcbiAgICAgIGYgPT4gcGF0aHMuRW5zdXJlR29vZ2xlU3RvcmFnZVBhdGhEaXIoZi5mdWxsUGF0aCkgIT09IGdvb2dsZVN0b3JhZ2VEaXJQYXRoXG4gICAgKTtcbiAgICByZXR1cm4gZmlsZXNXaXRob3V0Q3VycmVudERpcmVjdG9yeTtcbiAgfSBjYXRjaCAoZXJyb3IpIHtcbiAgICB0aHJvdyBuZXcgVkVycm9yKGVycm9yKTtcbiAgfVxufVxuXG5leHBvcnQgYXN5bmMgZnVuY3Rpb24gR2V0TGlzdFdpdGhvdXRQZXJtaXNzaW9ucyhcbiAgYnVja2V0OiBCdWNrZXQsXG4gIGlucHV0RGlyZWN0b3J5UGF0aDogc3RyaW5nXG4pOiBQcm9taXNlPENvcmVUeXBlcy5SZXNGaWxlW10+IHtcbiAgdHJ5IHtcbiAgICBjb25zdCBmaWxlcyA9IGF3YWl0IEdldExpc3RGcm9tU3RvcmFnZShidWNrZXQsIGlucHV0RGlyZWN0b3J5UGF0aCk7XG4gICAgY29uc3QgcmVzRmlsZXMgPSBhd2FpdCBQcm9taXNlLmFsbChcbiAgICAgIGZpbGVzLm1hcChmID0+IHRyYW5zbGF0ZVN0b3JhZ2VUb1Jlc0ZpbGUoZikpXG4gICAgKTtcbiAgICByZXR1cm4gcmVzRmlsZXM7XG4gIH0gY2F0Y2ggKGVycm9yKSB7XG4gICAgdGhyb3cgbmV3IFZFcnJvcihlcnJvcik7XG4gIH1cbn1cblxuZXhwb3J0IGNvbnN0IHN0b3JhZ2UgPSB7XG4gIEdldExpc3RXaXRob3V0UGVybWlzc2lvbnMsXG4gIEdldEFsbENoaWxkcmVuV2l0aFByZWZpeCxcbiAgTWFrZU9wdGlvbnNMaXN0Um9vdCxcbiAgTWFrZU9wdGlvbnNMaXN0LFxuICBUcnlSZW5hbWVGaWxlLFxuICBUcnlDb3B5RmlsZSxcbiAgVHJ5Q2hlY2tXcml0ZVBlcm1pc3Npb25cbn07XG4iXX0=