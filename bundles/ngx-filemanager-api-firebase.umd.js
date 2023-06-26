(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('verror'), require('jsonwebtoken'), require('path'), require('formidable'), require('fs')) :
    typeof define === 'function' && define.amd ? define('ngx-filemanager-api-firebase', ['exports', 'verror', 'jsonwebtoken', 'path', 'formidable', 'fs'], factory) :
    (global = global || self, factory(global['ngx-filemanager-api-firebase'] = {}, global.verror, global.jwt, global.path, global.formidable, global.fs));
}(this, (function (exports, verror, jwt, path, formidable, fs) { 'use strict';

    /*! *****************************************************************************
    Copyright (c) Microsoft Corporation.

    Permission to use, copy, modify, and/or distribute this software for any
    purpose with or without fee is hereby granted.

    THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH
    REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY
    AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT,
    INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM
    LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR
    OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR
    PERFORMANCE OF THIS SOFTWARE.
    ***************************************************************************** */
    /* global Reflect, Promise */
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b)
                if (b.hasOwnProperty(p))
                    d[p] = b[p]; };
        return extendStatics(d, b);
    };
    function __extends(d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    }
    var __assign = function () {
        __assign = Object.assign || function __assign(t) {
            for (var s, i = 1, n = arguments.length; i < n; i++) {
                s = arguments[i];
                for (var p in s)
                    if (Object.prototype.hasOwnProperty.call(s, p))
                        t[p] = s[p];
            }
            return t;
        };
        return __assign.apply(this, arguments);
    };
    function __rest(s, e) {
        var t = {};
        for (var p in s)
            if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
                t[p] = s[p];
        if (s != null && typeof Object.getOwnPropertySymbols === "function")
            for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
                if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                    t[p[i]] = s[p[i]];
            }
        return t;
    }
    function __decorate(decorators, target, key, desc) {
        var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
        if (typeof Reflect === "object" && typeof Reflect.decorate === "function")
            r = Reflect.decorate(decorators, target, key, desc);
        else
            for (var i = decorators.length - 1; i >= 0; i--)
                if (d = decorators[i])
                    r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
        return c > 3 && r && Object.defineProperty(target, key, r), r;
    }
    function __param(paramIndex, decorator) {
        return function (target, key) { decorator(target, key, paramIndex); };
    }
    function __metadata(metadataKey, metadataValue) {
        if (typeof Reflect === "object" && typeof Reflect.metadata === "function")
            return Reflect.metadata(metadataKey, metadataValue);
    }
    function __awaiter(thisArg, _arguments, P, generator) {
        function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
        return new (P || (P = Promise))(function (resolve, reject) {
            function fulfilled(value) { try {
                step(generator.next(value));
            }
            catch (e) {
                reject(e);
            } }
            function rejected(value) { try {
                step(generator["throw"](value));
            }
            catch (e) {
                reject(e);
            } }
            function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
            step((generator = generator.apply(thisArg, _arguments || [])).next());
        });
    }
    function __generator(thisArg, body) {
        var _ = { label: 0, sent: function () { if (t[0] & 1)
                throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
        return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function () { return this; }), g;
        function verb(n) { return function (v) { return step([n, v]); }; }
        function step(op) {
            if (f)
                throw new TypeError("Generator is already executing.");
            while (_)
                try {
                    if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done)
                        return t;
                    if (y = 0, t)
                        op = [op[0] & 2, t.value];
                    switch (op[0]) {
                        case 0:
                        case 1:
                            t = op;
                            break;
                        case 4:
                            _.label++;
                            return { value: op[1], done: false };
                        case 5:
                            _.label++;
                            y = op[1];
                            op = [0];
                            continue;
                        case 7:
                            op = _.ops.pop();
                            _.trys.pop();
                            continue;
                        default:
                            if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) {
                                _ = 0;
                                continue;
                            }
                            if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) {
                                _.label = op[1];
                                break;
                            }
                            if (op[0] === 6 && _.label < t[1]) {
                                _.label = t[1];
                                t = op;
                                break;
                            }
                            if (t && _.label < t[2]) {
                                _.label = t[2];
                                _.ops.push(op);
                                break;
                            }
                            if (t[2])
                                _.ops.pop();
                            _.trys.pop();
                            continue;
                    }
                    op = body.call(thisArg, _);
                }
                catch (e) {
                    op = [6, e];
                    y = 0;
                }
                finally {
                    f = t = 0;
                }
            if (op[0] & 5)
                throw op[1];
            return { value: op[0] ? op[1] : void 0, done: true };
        }
    }
    function __createBinding(o, m, k, k2) {
        if (k2 === undefined)
            k2 = k;
        o[k2] = m[k];
    }
    function __exportStar(m, exports) {
        for (var p in m)
            if (p !== "default" && !exports.hasOwnProperty(p))
                exports[p] = m[p];
    }
    function __values(o) {
        var s = typeof Symbol === "function" && Symbol.iterator, m = s && o[s], i = 0;
        if (m)
            return m.call(o);
        if (o && typeof o.length === "number")
            return {
                next: function () {
                    if (o && i >= o.length)
                        o = void 0;
                    return { value: o && o[i++], done: !o };
                }
            };
        throw new TypeError(s ? "Object is not iterable." : "Symbol.iterator is not defined.");
    }
    function __read(o, n) {
        var m = typeof Symbol === "function" && o[Symbol.iterator];
        if (!m)
            return o;
        var i = m.call(o), r, ar = [], e;
        try {
            while ((n === void 0 || n-- > 0) && !(r = i.next()).done)
                ar.push(r.value);
        }
        catch (error) {
            e = { error: error };
        }
        finally {
            try {
                if (r && !r.done && (m = i["return"]))
                    m.call(i);
            }
            finally {
                if (e)
                    throw e.error;
            }
        }
        return ar;
    }
    function __spread() {
        for (var ar = [], i = 0; i < arguments.length; i++)
            ar = ar.concat(__read(arguments[i]));
        return ar;
    }
    function __spreadArrays() {
        for (var s = 0, i = 0, il = arguments.length; i < il; i++)
            s += arguments[i].length;
        for (var r = Array(s), k = 0, i = 0; i < il; i++)
            for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++)
                r[k] = a[j];
        return r;
    }
    ;
    function __await(v) {
        return this instanceof __await ? (this.v = v, this) : new __await(v);
    }
    function __asyncGenerator(thisArg, _arguments, generator) {
        if (!Symbol.asyncIterator)
            throw new TypeError("Symbol.asyncIterator is not defined.");
        var g = generator.apply(thisArg, _arguments || []), i, q = [];
        return i = {}, verb("next"), verb("throw"), verb("return"), i[Symbol.asyncIterator] = function () { return this; }, i;
        function verb(n) { if (g[n])
            i[n] = function (v) { return new Promise(function (a, b) { q.push([n, v, a, b]) > 1 || resume(n, v); }); }; }
        function resume(n, v) { try {
            step(g[n](v));
        }
        catch (e) {
            settle(q[0][3], e);
        } }
        function step(r) { r.value instanceof __await ? Promise.resolve(r.value.v).then(fulfill, reject) : settle(q[0][2], r); }
        function fulfill(value) { resume("next", value); }
        function reject(value) { resume("throw", value); }
        function settle(f, v) { if (f(v), q.shift(), q.length)
            resume(q[0][0], q[0][1]); }
    }
    function __asyncDelegator(o) {
        var i, p;
        return i = {}, verb("next"), verb("throw", function (e) { throw e; }), verb("return"), i[Symbol.iterator] = function () { return this; }, i;
        function verb(n, f) { i[n] = o[n] ? function (v) { return (p = !p) ? { value: __await(o[n](v)), done: n === "return" } : f ? f(v) : v; } : f; }
    }
    function __asyncValues(o) {
        if (!Symbol.asyncIterator)
            throw new TypeError("Symbol.asyncIterator is not defined.");
        var m = o[Symbol.asyncIterator], i;
        return m ? m.call(o) : (o = typeof __values === "function" ? __values(o) : o[Symbol.iterator](), i = {}, verb("next"), verb("throw"), verb("return"), i[Symbol.asyncIterator] = function () { return this; }, i);
        function verb(n) { i[n] = o[n] && function (v) { return new Promise(function (resolve, reject) { v = o[n](v), settle(resolve, reject, v.done, v.value); }); }; }
        function settle(resolve, reject, d, v) { Promise.resolve(v).then(function (v) { resolve({ value: v, done: d }); }, reject); }
    }
    function __makeTemplateObject(cooked, raw) {
        if (Object.defineProperty) {
            Object.defineProperty(cooked, "raw", { value: raw });
        }
        else {
            cooked.raw = raw;
        }
        return cooked;
    }
    ;
    function __importStar(mod) {
        if (mod && mod.__esModule)
            return mod;
        var result = {};
        if (mod != null)
            for (var k in mod)
                if (Object.hasOwnProperty.call(mod, k))
                    result[k] = mod[k];
        result.default = mod;
        return result;
    }
    function __importDefault(mod) {
        return (mod && mod.__esModule) ? mod : { default: mod };
    }
    function __classPrivateFieldGet(receiver, privateMap) {
        if (!privateMap.has(receiver)) {
            throw new TypeError("attempted to get private field on non-instance");
        }
        return privateMap.get(receiver);
    }
    function __classPrivateFieldSet(receiver, privateMap, value) {
        if (!privateMap.has(receiver)) {
            throw new TypeError("attempted to set private field on non-instance");
        }
        privateMap.set(receiver, value);
        return value;
    }

    var cors = require('cors');
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
            var msg = 'Only POST requests are supported\n';
            console.warn(msg);
            res.status(400).send(msg);
            return;
        }
        next();
    }
    function HasBodyProp(bodyFieldName) {
        return function (req, res, next) {
            if (!req.body[bodyFieldName]) {
                var msg = "Request is missing property in req.body: \"" + bodyFieldName + "\" \n";
                console.warn(msg);
                res.status(400).send(msg);
                return;
            }
            next();
        };
    }
    function HasQueryParam(paramName) {
        return function (req, res, next) {
            if (!req.query[paramName]) {
                var msg = "Request is missing property in req.params: \"" + paramName + "\" \n";
                console.warn(msg);
                res.status(400).send(msg);
                return;
            }
            next();
        };
    }
    function AddCors(req, res, next) {
        return __awaiter(this, void 0, void 0, function () {
            var error_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        res.setHeader('Access-Control-Allow-Headers', 'Authorization, X-Requested-With, Accept, Content-Type, Origin, Cache-Control, X-File-Name');
                        res.setHeader('Access-Control-Allow-Origin', '*');
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, , 4]);
                        return [4 /*yield*/, new Promise(function (resolve, reject) {
                                cors({ origin: true })(req, res, function () {
                                    resolve();
                                });
                            })];
                    case 2:
                        _a.sent();
                        next();
                        return [3 /*break*/, 4];
                    case 3:
                        error_1 = _a.sent();
                        throw new Error(error_1.message);
                    case 4: return [2 /*return*/];
                }
            });
        });
    }
    function LogRequest(req, res, next) {
        var body = JSON.stringify(req.body || {}, null, 4).slice(0, 500);
        var msg = "\n---- request: " + req.url + "\nmethod: " + req.method + "\n query: " + JSON.stringify(req.query, null, 4) + "\n  body: " + body + "\n----";
        console.log(msg);
        next();
    }

    function GetTokenFromRequest(req) {
        return __awaiter(this, void 0, void 0, function () {
            var idToken, isInHeader, hasCookie, decodedToken;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        isInHeader = req.headers['authorization'];
                        hasCookie = req['cookies'];
                        if (isInHeader) {
                            // Read the ID Token from the Authorization header.
                            idToken = req.headers['authorization'];
                        }
                        else if (hasCookie) {
                            // Read the ID Token from cookie.
                            idToken = req['cookies'].__session;
                        }
                        else {
                            throw new Error('Request Header doesn\'t contain a valid authorization bearer');
                        }
                        return [4 /*yield*/, DecodeJWT(idToken)];
                    case 1:
                        decodedToken = _a.sent();
                        return [2 /*return*/, decodedToken];
                }
            });
        });
    }
    function DecodeJWT(bearer) {
        return __awaiter(this, void 0, void 0, function () {
            var decoded;
            return __generator(this, function (_a) {
                try {
                    decoded = jwt.decode(bearer, { json: true });
                    return [2 /*return*/, decoded];
                }
                catch (error) {
                    throw new Error('Error decoding JWT' + error.message);
                }
                return [2 /*return*/];
            });
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
    var permsFactory = {
        blankPermissionsObj: blankPermissionsObj,
        blankUserClaim: blankUserClaim,
    };

    function SetMetaPropertyString(file, key, newValueString) {
        return __awaiter(this, void 0, void 0, function () {
            var metaObj, res, error_1, fileExists, e_1;
            var _a;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _b.trys.push([0, 2, , 7]);
                        metaObj = { metadata: {} };
                        metaObj.metadata[key] = newValueString;
                        return [4 /*yield*/, file.setMetadata(metaObj)];
                    case 1:
                        res = _b.sent();
                        return [2 /*return*/, res[0]];
                    case 2:
                        error_1 = _b.sent();
                        fileExists = void 0;
                        _b.label = 3;
                    case 3:
                        _b.trys.push([3, 5, , 6]);
                        return [4 /*yield*/, file.exists()];
                    case 4:
                        _a = __read.apply(void 0, [_b.sent(), 1]), fileExists = _a[0];
                        return [3 /*break*/, 6];
                    case 5:
                        e_1 = _b.sent();
                        console.error('storage-helper: SetMetaProperty() error getting file.exists', e_1);
                        return [3 /*break*/, 6];
                    case 6:
                        console.error('storage-helper: SetMetaProperty() error setting meta', {
                            fileExists: fileExists,
                            filePath: file.name,
                            newValueString: newValueString
                        });
                        throw new Error(error_1);
                    case 7: return [2 /*return*/];
                }
            });
        });
    }
    function SetMetaPropertyObj(file, key, newValue) {
        return __awaiter(this, void 0, void 0, function () {
            var newValueString;
            return __generator(this, function (_a) {
                try {
                    newValueString = JSON.stringify(newValue);
                    return [2 /*return*/, SetMetaPropertyString(file, key, newValueString)];
                }
                catch (error) {
                    throw new Error(error);
                }
                return [2 /*return*/];
            });
        });
    }
    function GetMetaPropertyString(file, key) {
        return __awaiter(this, void 0, void 0, function () {
            var newValueString, _a, meta, metaData, error_2, _b, fileExists, error_3;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0:
                        _c.trys.push([0, 2, , 7]);
                        return [4 /*yield*/, file.getMetadata()];
                    case 1:
                        _a = __read.apply(void 0, [_c.sent(), 1]), meta = _a[0];
                        metaData = meta.metadata || {};
                        newValueString = metaData[key] || null;
                        return [2 /*return*/, newValueString];
                    case 2:
                        error_2 = _c.sent();
                        _c.label = 3;
                    case 3:
                        _c.trys.push([3, 5, , 6]);
                        return [4 /*yield*/, file.exists()];
                    case 4:
                        _b = __read.apply(void 0, [_c.sent(), 1]), fileExists = _b[0];
                        return [3 /*break*/, 6];
                    case 5:
                        error_3 = _c.sent();
                        console.error(error_3);
                        return [3 /*break*/, 6];
                    case 6:
                        console.error('storage-helper: GetMetaProperty() error getting meta', {});
                        throw new verror.VError(error_2);
                    case 7: return [2 /*return*/];
                }
            });
        });
    }
    function GetMetaPropertyObj(file, key) {
        return __awaiter(this, void 0, void 0, function () {
            var newValueString, newValueObj, error_4;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, GetMetaPropertyString(file, key)];
                    case 1:
                        newValueString = _a.sent();
                        newValueObj = JSON.parse(newValueString);
                        return [2 /*return*/, newValueObj];
                    case 2:
                        error_4 = _a.sent();
                        console.error("could not convert the meta property \"" + key + "\" to a JSON object", error_4, { newValueString: newValueString });
                        throw new verror.VError(error_4 + ' error in JSON processing: ' + newValueString);
                    case 3: return [2 /*return*/];
                }
            });
        });
    }
    var permHelper = {
        GetMetaPropertyObj: GetMetaPropertyObj,
        SetMetaPropertyObj: SetMetaPropertyObj,
        GetMetaPropertyString: GetMetaPropertyString,
        SetMetaPropertyString: SetMetaPropertyString,
    };

    function RetrieveFilePermissions(file) {
        return __awaiter(this, void 0, void 0, function () {
            var fromStorage, blank, safePerms;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, permHelper.GetMetaPropertyObj(file, 'permissions')];
                    case 1:
                        fromStorage = _a.sent();
                        blank = permsFactory.blankPermissionsObj();
                        safePerms = Object.assign(Object.assign({}, blank), (fromStorage || {}));
                        return [2 /*return*/, safePerms];
                }
            });
        });
    }
    function RetrieveCustomClaims(req) {
        return __awaiter(this, void 0, void 0, function () {
            var token, error_1, claims;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, GetTokenFromRequest(req)];
                    case 1:
                        token = _a.sent();
                        return [3 /*break*/, 3];
                    case 2:
                        error_1 = _a.sent();
                        console.log('No bearer token found on request, no permissions for user');
                        return [2 /*return*/, permsFactory.blankUserClaim()];
                    case 3:
                        claims = token;
                        if (!claims.groups) {
                            claims.groups = [];
                        }
                        return [2 /*return*/, claims];
                }
            });
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
        var anyoneCanDo = CanOthersDo(filePermissions.others, toCheck);
        if (anyoneCanDo) {
            return true;
        }
        // Has no userclaims
        var hasClaims = !!claims;
        if (!hasClaims) {
            return false;
        }
        // Sudo can do anything
        var sudoCanDo = claims.userIsSudo;
        if (sudoCanDo) {
            return true;
        }
        var userAndGroups = __spread(claims.groups, [claims.user_id]);
        var arrayToCheck;
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
        var hasNoGroupsToCheck = !usersGroups || !usersGroups.length;
        if (hasNoGroupsToCheck) {
            return false;
        }
        var userGroupSet = new Set(usersGroups);
        var isInArray = arr.find(function (entity) { return userGroupSet.has(entity); });
        return !!isInArray;
    }
    function CheckCanEditPermissions(currentFilePermissions, newPermissions, claims) {
        var canEditPermissions = TryCheckFileAccess(currentFilePermissions, claims, 'write');
        var canEditPermissionsAfter = TryCheckFileAccess(newPermissions, claims, 'write');
        if (!canEditPermissions) {
            throw new verror.VError('Cannot edit permissions here');
        }
        if (!canEditPermissionsAfter) {
            throw new verror.VError('Cannot change permissions, so you wont be able to change back');
        }
    }
    var permsQueries = {
        RetrieveFilePermissions: RetrieveFilePermissions,
        RetrieveCustomClaims: RetrieveCustomClaims,
        TryCheckHasAnyPermissions: TryCheckHasAnyPermissions,
        TryCheckFileAccess: TryCheckFileAccess,
        IsPartOfArray: IsPartOfArray,
        CheckCanEditPermissions: CheckCanEditPermissions,
    };

    function UpdateFilePermissions(file, newPermissions) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, permHelper.SetMetaPropertyObj(file, 'permissions', newPermissions)];
            });
        });
    }
    var permsCommands = {
        UpdateFilePermissions: UpdateFilePermissions
    };

    var perms = {
        factory: permsFactory,
        commands: permsCommands,
        queries: permsQueries,
    };

    function HasPrefixSlash(inputPath) {
        if (!inputPath || !inputPath.length) {
            return false;
        }
        var hasPrefix = inputPath.startsWith('/');
        return hasPrefix;
    }
    function HasTrailingSlash(inputPath) {
        if (!inputPath || !inputPath.length) {
            return false;
        }
        var hasTrailing = inputPath.endsWith('/');
        return hasTrailing;
    }
    function EnsureTrailingSlash(inputPath) {
        if (!inputPath) {
            return '/';
        }
        var hasTrailing = HasTrailingSlash(inputPath);
        var pathParsed = hasTrailing ? inputPath : inputPath + '/';
        return pathParsed;
    }
    function EnsureNoPrefixSlash(inputPath) {
        var hasPrefix = HasPrefixSlash(inputPath);
        var pathParsed = hasPrefix ? inputPath.slice(1) : inputPath;
        return pathParsed;
    }
    function EnsurePrefixSlash(inputPath) {
        if (!inputPath) {
            return '/';
        }
        var hasPrefix = HasPrefixSlash(inputPath);
        var pathParsed = hasPrefix ? inputPath : '/' + inputPath;
        return pathParsed;
    }
    function EnsureNoTrailingSlash(inputPath) {
        var hasTrailing = HasTrailingSlash(inputPath);
        var pathParsed = hasTrailing ? inputPath.slice(0, -1) : inputPath;
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
        var relativePath = absObjectPath.slice(currentDirectoryPath.length);
        return relativePath;
    }
    function GetParentDir(currentDirectoryPath) {
        var parsed = EnsurePrefixSlash(currentDirectoryPath);
        var parentPath = path.dirname(parsed);
        return EnsureGoogleStoragePathDir(parentPath);
    }
    function IsCurrentPath(currentDirectoryPath, absObjectPath) {
        var relativePath = GetRelativePath(currentDirectoryPath, absObjectPath);
        var isCurrentDir = !relativePath;
        return isCurrentDir;
    }
    function IsCurrentPathFile(currentDirectoryPath, absObjectPath) {
        var relativePath = GetRelativePath(currentDirectoryPath, absObjectPath);
        var slashSegments = relativePath.split('/');
        var isCurrentPathFile = slashSegments.length < 2;
        return isCurrentPathFile;
    }
    function IsObjNameDir(storageObjectName) {
        var filePathParsed = EnsurePrefixSlash(storageObjectName);
        var isDir = HasTrailingSlash(filePathParsed);
        return isDir;
    }
    function IsObjNameFile(storageObjectName) {
        return !IsObjNameDir(storageObjectName);
    }
    function GetSubDirectory(currentDirectoryPath, absObjectPath) {
        var relativePath = GetRelativePath(currentDirectoryPath, absObjectPath);
        var slashSegments = relativePath.split('/');
        var subDirectory = slashSegments.shift();
        return subDirectory;
    }
    function Add2ToPath(inputPath) {
        var dotSegments = inputPath.split('.');
        var extension = dotSegments.pop();
        var fileName = dotSegments.join('.') + ' (2)' + '.' + extension;
        return fileName;
    }
    function Add2ToPathDir(inputPath) {
        var pathWithoutSlash = EnsureNoTrailingSlash(inputPath);
        var pathWith2 = pathWithoutSlash + ' (2)';
        var newDirName = EnsureTrailingSlash(pathWith2);
        return newDirName;
    }
    function GetFileNameWithExtension(inputPath) {
        var fileNameWithExt = inputPath.split('/').pop();
        return fileNameWithExt;
    }
    function GetFileNameWithoutExtension(inputPath) {
        var fileNameWithExt = GetFileNameWithExtension(inputPath);
        var segments = fileNameWithExt.split('.');
        segments.pop(); // remove extension
        return segments.join('.');
    }
    function GetPathUpToLastBracket(inputPath) {
        var slashes = inputPath.split('/');
        slashes.pop();
        var dirPath = slashes.join('/');
        var fileName = inputPath.slice(dirPath.length);
        var bracketSegments = fileName.split('(');
        bracketSegments.pop();
        var fileNameWith = bracketSegments.join('(');
        if (fileName.includes('(')) {
            var filepathWithBracket = path.join(dirPath, fileNameWith + '(');
            return filepathWithBracket;
        }
        var dotSegments = inputPath.split('.');
        if (dotSegments.length < 2) {
            return inputPath;
        }
        dotSegments.pop();
        return dotSegments.join('.');
    }
    var paths = {
        HasPrefixSlash: HasPrefixSlash,
        HasTrailingSlash: HasTrailingSlash,
        EnsureTrailingSlash: EnsureTrailingSlash,
        EnsureNoPrefixSlash: EnsureNoPrefixSlash,
        EnsurePrefixSlash: EnsurePrefixSlash,
        EnsureNoTrailingSlash: EnsureNoTrailingSlash,
        EnsureAbsolutePathFile: EnsureAbsolutePathFile,
        EnsureAbsolutePathDir: EnsureAbsolutePathDir,
        EnsureGoogleStoragePathDir: EnsureGoogleStoragePathDir,
        EnsureGoogleStoragePathFile: EnsureGoogleStoragePathFile,
        GetRelativePath: GetRelativePath,
        IsCurrentPath: IsCurrentPath,
        IsCurrentPathFile: IsCurrentPathFile,
        IsObjNameDir: IsObjNameDir,
        IsObjNameFile: IsObjNameFile,
        GetSubDirectory: GetSubDirectory,
        GetParentDir: GetParentDir,
        GetFileNameWithExtension: GetFileNameWithExtension,
        GetFileNameWithoutExtension: GetFileNameWithoutExtension,
        GetPathUpToLastBracket: GetPathUpToLastBracket,
        Add2ToPath: Add2ToPath,
        Add2ToPathDir: Add2ToPathDir
    };

    function translateRawStorage(storageObject) {
        var filePath = storageObject.name;
        var filePathParsed = paths.EnsurePrefixSlash(filePath);
        return {
            ref: storageObject,
            name: path.basename(filePathParsed),
            fullPath: filePathParsed,
            isDir: paths.HasTrailingSlash(filePathParsed)
        };
    }
    function makePhantomStorageFolder(folderPath) {
        var pathParsed = paths.EnsureAbsolutePathDir(folderPath);
        return {
            ref: null,
            name: path.basename(pathParsed),
            fullPath: pathParsed,
            isDir: true,
            isPhantomFolder: true
        };
    }
    function translateStorageToResFile(f) {
        return __awaiter(this, void 0, void 0, function () {
            var resFile, _a, exists, _b, aclObj, metaResp, metaData, customMeta, permissions, error_1;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0:
                        resFile = {};
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
                            return [2 /*return*/, resFile];
                        }
                        _c.label = 1;
                    case 1:
                        _c.trys.push([1, 6, , 7]);
                        return [4 /*yield*/, f.ref.exists()];
                    case 2:
                        _a = __read.apply(void 0, [_c.sent(), 1]), exists = _a[0];
                        if (!exists) {
                            throw new Error('File not found: ' + resFile.fullPath);
                        }
                        return [4 /*yield*/, f.ref.acl.get()];
                    case 3:
                        _b = __read.apply(void 0, [_c.sent(), 1]), aclObj = _b[0];
                        resFile.rightsFirebase = aclObj;
                        return [4 /*yield*/, f.ref.getMetadata()];
                    case 4:
                        metaResp = _c.sent();
                        metaData = metaResp[0];
                        customMeta = metaData.metadata || {};
                        return [4 /*yield*/, perms.queries.RetrieveFilePermissions(f.ref)];
                    case 5:
                        permissions = _c.sent();
                        resFile.permissions = permissions;
                        resFile.size = metaData.size;
                        resFile.date = metaData.updated;
                        resFile.metaData = customMeta;
                        return [2 /*return*/, resFile];
                    case 6:
                        error_1 = _c.sent();
                        throw new verror.VError(error_1);
                    case 7: return [2 /*return*/];
                }
            });
        });
    }
    function StreamToPromise(stream) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, new Promise(function (resolve, reject) {
                        var stringRes;
                        stream.on('readable', function (buffer) {
                            var part = buffer.read().toString();
                            stringRes += part;
                            console.log('stream data ' + part);
                        });
                        stream.on('end', function (res) {
                            resolve(stringRes);
                        });
                        stream.on('error', function (err) {
                            var errmsg = 'StreamToPromise(stream: Readable), Error reading stream: ' +
                                err.message;
                            console.error(errmsg, { err: err });
                            reject(errmsg);
                        });
                    })];
            });
        });
    }
    function getResult(res) {
        var fail = res.statusCode !== 204;
        return {
            success: !fail,
            error: fail ? 'error: ' + res.body : null
        };
    }
    function getResultFromArray(res) {
        var fail = res.find(function (r) { return r.statusCode !== 204; });
        return {
            success: !fail,
            error: fail ? 'error: ' + JSON.stringify(fail.body) : null
        };
    }
    function ResultsObjFromArray(moveResults) {
        return moveResults.reduce(function (acc, cur) {
            if (cur.error) {
                acc.error += ' | ' + cur.error;
                acc.success = false;
            }
            return acc;
        }, { error: '', success: true });
    }

    function GetAllChildrenWithPrefix(bucket, fileOrDirectoryPath) {
        return __awaiter(this, void 0, void 0, function () {
            var pathNoPrefix, options, result, files, error_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        pathNoPrefix = paths.EnsureNoPrefixSlash(fileOrDirectoryPath);
                        options = {};
                        options.prefix = pathNoPrefix;
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, , 4]);
                        return [4 /*yield*/, bucket.getFiles(options)];
                    case 2:
                        result = _a.sent();
                        files = result[0];
                        return [2 /*return*/, files];
                    case 3:
                        error_1 = _a.sent();
                        throw new verror.VError(error_1);
                    case 4: return [2 /*return*/];
                }
            });
        });
    }
    function TryRenameFile(file, oldPrefix, newPrefix) {
        return __awaiter(this, void 0, void 0, function () {
            var originalFilePath, relativePath, newPath, newFilePath, _a, response, error_2, _b, fileExists;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0:
                        _c.trys.push([0, 2, , 4]);
                        originalFilePath = file.name;
                        relativePath = originalFilePath.slice(oldPrefix.length);
                        newPath = path.join(newPrefix, relativePath);
                        newFilePath = paths.EnsureNoPrefixSlash(newPath);
                        console.log("- renaming \"" + originalFilePath + "\" -> \"" + newFilePath + "\"");
                        return [4 /*yield*/, file.move(newFilePath)];
                    case 1:
                        _a = __read.apply(void 0, [_c.sent(), 1]), response = _a[0];
                        return [2 /*return*/, { error: '', success: true }];
                    case 2:
                        error_2 = _c.sent();
                        return [4 /*yield*/, file.exists()];
                    case 3:
                        _b = __read.apply(void 0, [_c.sent(), 1]), fileExists = _b[0];
                        console.error('storage-helper: TryCopyFile() error renaming file', {
                            fileExists: fileExists,
                            fileName: file.name,
                            oldPrefix: oldPrefix,
                            newPrefix: newPrefix
                        });
                        throw new verror.VError(error_2);
                    case 4: return [2 /*return*/];
                }
            });
        });
    }
    function TryCopyFile(file, oldPrefix, newPrefix) {
        return __awaiter(this, void 0, void 0, function () {
            var originalFilePath, relativePath, newPath, newFilePath, result, error_3, _a, fileExists;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _b.trys.push([0, 2, , 4]);
                        originalFilePath = file.name;
                        relativePath = originalFilePath.slice(oldPrefix.length);
                        newPath = path.join(newPrefix, relativePath);
                        newFilePath = paths.EnsureNoPrefixSlash(newPath);
                        console.log("- copying \"" + originalFilePath + "\" -> \"" + newFilePath + "\"");
                        return [4 /*yield*/, file.copy(newFilePath)];
                    case 1:
                        result = _b.sent();
                        return [2 /*return*/, result[1]];
                    case 2:
                        error_3 = _b.sent();
                        return [4 /*yield*/, file.exists()];
                    case 3:
                        _a = __read.apply(void 0, [_b.sent(), 1]), fileExists = _a[0];
                        console.error('storage-helper: TryCopyFile() error copying file', {
                            fileExists: fileExists
                        });
                        throw new verror.VError(error_3);
                    case 4: return [2 /*return*/];
                }
            });
        });
    }
    function TryCheckWritePermission(bucket, newDirPath, claims) {
        return __awaiter(this, void 0, void 0, function () {
            var parentPath, isRoot, parentDir, _a, fileExists, parentPermissions, result, error_4;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _b.trys.push([0, 3, , 4]);
                        parentPath = paths.GetParentDir(newDirPath);
                        isRoot = parentPath === '';
                        if (isRoot) {
                            return [2 /*return*/];
                        }
                        parentDir = bucket.file(parentPath);
                        return [4 /*yield*/, parentDir.exists()];
                    case 1:
                        _a = __read.apply(void 0, [_b.sent(), 1]), fileExists = _a[0];
                        if (!fileExists) {
                            return [2 /*return*/, TryCheckWritePermission(bucket, parentPath, claims)];
                        }
                        return [4 /*yield*/, perms.queries.RetrieveFilePermissions(parentDir)];
                    case 2:
                        parentPermissions = _b.sent();
                        result = perms.queries.TryCheckFileAccess(parentPermissions, claims, 'write');
                        if (!result) {
                            throw new Error('Permission denied creating item in directory:' + parentPath);
                        }
                        return [3 /*break*/, 4];
                    case 3:
                        error_4 = _b.sent();
                        throw new Error(error_4);
                    case 4: return [2 /*return*/];
                }
            });
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
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, new Promise(function (resolve, reject) {
                        var callback = function (err, files, nextQuery, apiResponse) {
                            if (err) {
                                reject(err);
                                return;
                            }
                            var prefixes = apiResponse['prefixes'] || [];
                            var result = {
                                files: files || [],
                                prefixes: prefixes
                            };
                            resolve(result);
                        };
                        bucket.getFiles(options, callback);
                    })];
            });
        });
    }
    function GetFiles(bucket, options) {
        return __awaiter(this, void 0, void 0, function () {
            var result, storageObjects, files, error_5;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, bucket.getFiles(options)];
                    case 1:
                        result = _a.sent();
                        storageObjects = result[0];
                        files = storageObjects.map(function (o) { return translateRawStorage(o); });
                        return [2 /*return*/, files];
                    case 2:
                        error_5 = _a.sent();
                        throw new verror.VError(error_5);
                    case 3: return [2 /*return*/];
                }
            });
        });
    }
    function GetListFromStorage(bucket, inputDirectoryPath) {
        return __awaiter(this, void 0, void 0, function () {
            var googleStorageDirPath, isRootPath, options, result, allObjects, allObjectsPathsSet_1, phantomPrefixes, newPhantomFolders, combinedList, filesWithoutCurrentDirectory, error_6;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        googleStorageDirPath = paths.EnsureGoogleStoragePathDir(inputDirectoryPath);
                        isRootPath = googleStorageDirPath === '/' || '';
                        if (isRootPath) {
                            options = MakeOptionsListRoot();
                        }
                        else {
                            options = MakeOptionsList(googleStorageDirPath);
                        }
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, , 4]);
                        return [4 /*yield*/, GetFilesAndPrefixes(bucket, options)];
                    case 2:
                        result = _a.sent();
                        allObjects = result.files.map(function (o) { return translateRawStorage(o); });
                        allObjectsPathsSet_1 = new Set(allObjects.map(function (f) { return f.ref.name; }));
                        phantomPrefixes = result.prefixes.filter(function (prefix) { return !allObjectsPathsSet_1.has(prefix); });
                        newPhantomFolders = phantomPrefixes.map(function (phantomPath) { return makePhantomStorageFolder(phantomPath); });
                        combinedList = __spread(allObjects, newPhantomFolders);
                        filesWithoutCurrentDirectory = combinedList.filter(function (f) { return paths.EnsureGoogleStoragePathDir(f.fullPath) !== googleStorageDirPath; });
                        return [2 /*return*/, filesWithoutCurrentDirectory];
                    case 3:
                        error_6 = _a.sent();
                        throw new verror.VError(error_6);
                    case 4: return [2 /*return*/];
                }
            });
        });
    }
    function GetListWithoutPermissions(bucket, inputDirectoryPath) {
        return __awaiter(this, void 0, void 0, function () {
            var files, resFiles, error_7;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 3, , 4]);
                        return [4 /*yield*/, GetListFromStorage(bucket, inputDirectoryPath)];
                    case 1:
                        files = _a.sent();
                        return [4 /*yield*/, Promise.all(files.map(function (f) { return translateStorageToResFile(f); }))];
                    case 2:
                        resFiles = _a.sent();
                        return [2 /*return*/, resFiles];
                    case 3:
                        error_7 = _a.sent();
                        throw new verror.VError(error_7);
                    case 4: return [2 /*return*/];
                }
            });
        });
    }
    var storage = {
        GetListWithoutPermissions: GetListWithoutPermissions,
        GetAllChildrenWithPrefix: GetAllChildrenWithPrefix,
        MakeOptionsListRoot: MakeOptionsListRoot,
        MakeOptionsList: MakeOptionsList,
        TryRenameFile: TryRenameFile,
        TryCopyFile: TryCopyFile,
        TryCheckWritePermission: TryCheckWritePermission
    };

    function GetList(bucket, inputDirectoryPath, claims, isAdmin) {
        return __awaiter(this, void 0, void 0, function () {
            var resFiles, filesAllowed, error_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, storage.GetListWithoutPermissions(bucket, inputDirectoryPath)];
                    case 1:
                        resFiles = _a.sent();
                        if (isAdmin) {
                            return [2 /*return*/, resFiles];
                        }
                        filesAllowed = resFiles.filter(function (f) {
                            return perms.queries.TryCheckFileAccess(f.permissions, claims, 'read');
                        });
                        return [2 /*return*/, filesAllowed];
                    case 2:
                        error_1 = _a.sent();
                        throw new verror.VError(error_1);
                    case 3: return [2 /*return*/];
                }
            });
        });
    }

    function RenameFile(bucket, inputSrc, inputDest, claims) {
        return __awaiter(this, void 0, void 0, function () {
            var parsedSrc_1, parsedDest_1, fileItem, _a, exists, isFile, resultObj, allChildren, moveResults, error_1;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _b.trys.push([0, 6, , 7]);
                        parsedSrc_1 = paths.EnsureNoPrefixSlash(inputSrc);
                        parsedDest_1 = paths.EnsureNoPrefixSlash(inputDest);
                        fileItem = bucket.file(parsedSrc_1);
                        return [4 /*yield*/, fileItem.exists()];
                    case 1:
                        _a = __read.apply(void 0, [_b.sent(), 1]), exists = _a[0];
                        if (!exists) {
                            throw new Error("\nitem: \"" + fileItem.name + "\" does not exist\nbucket: \"" + bucket.name + "\"\n\ninputSrc: \"" + inputSrc + "\",\ninputDest: \"" + inputDest + "\",\n\nparsedSrc: \"" + parsedSrc_1 + "\",\nparsedDest: \"" + parsedDest_1 + "\",\n");
                        }
                        isFile = !inputSrc.endsWith('/');
                        if (!isFile) return [3 /*break*/, 3];
                        return [4 /*yield*/, storage.TryRenameFile(fileItem, parsedSrc_1, parsedDest_1)];
                    case 2:
                        resultObj = _b.sent();
                        return [2 /*return*/, resultObj];
                    case 3: return [4 /*yield*/, storage.GetAllChildrenWithPrefix(bucket, parsedSrc_1)];
                    case 4:
                        allChildren = _b.sent();
                        return [4 /*yield*/, Promise.all(allChildren.map(function (f) { return storage.TryRenameFile(f, parsedSrc_1, parsedDest_1); }))];
                    case 5:
                        moveResults = _b.sent();
                        return [2 /*return*/, ResultsObjFromArray(moveResults)];
                    case 6:
                        error_1 = _b.sent();
                        throw new verror.VError(error_1);
                    case 7: return [2 /*return*/];
                }
            });
        });
    }

    function moveWithChildren(bucket, itemPath, newFolderPrefix) {
        return __awaiter(this, void 0, void 0, function () {
            var oldFolderPrefix_1, allChildren, successArray, error_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 3, , 4]);
                        oldFolderPrefix_1 = paths.EnsureNoPrefixSlash(path.dirname(itemPath));
                        return [4 /*yield*/, storage.GetAllChildrenWithPrefix(bucket, itemPath)];
                    case 1:
                        allChildren = _a.sent();
                        return [4 /*yield*/, Promise.all(allChildren.map(function (f) { return storage.TryRenameFile(f, oldFolderPrefix_1, newFolderPrefix); }))];
                    case 2:
                        successArray = _a.sent();
                        return [2 /*return*/, successArray];
                    case 3:
                        error_1 = _a.sent();
                        throw new verror.VError(error_1);
                    case 4: return [2 /*return*/];
                }
            });
        });
    }
    function MoveFiles(bucket, items, newDirectoryPath, claims) {
        return __awaiter(this, void 0, void 0, function () {
            var newFolderPrefix_1, moveResultsArrArr, moveResultsArr, error_2;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        newFolderPrefix_1 = paths.EnsureGoogleStoragePathDir(newDirectoryPath);
                        return [4 /*yield*/, Promise.all(items.map(function (filePath) { return moveWithChildren(bucket, filePath, newFolderPrefix_1); }))];
                    case 1:
                        moveResultsArrArr = _a.sent();
                        moveResultsArr = moveResultsArrArr.reduce(function (acc, cur) {
                            return acc.concat(cur);
                        }, []);
                        return [2 /*return*/, ResultsObjFromArray(moveResultsArr)];
                    case 2:
                        error_2 = _a.sent();
                        throw new verror.VError(error_2);
                    case 3: return [2 /*return*/];
                }
            });
        });
    }

    function copyWithChildren(bucket, itemPath, newFolderPrefix) {
        return __awaiter(this, void 0, void 0, function () {
            var oldFolderPrefix_1, allChildren, successArray, error_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 3, , 4]);
                        oldFolderPrefix_1 = paths.EnsureNoPrefixSlash(path.dirname(itemPath));
                        return [4 /*yield*/, storage.GetAllChildrenWithPrefix(bucket, itemPath)];
                    case 1:
                        allChildren = _a.sent();
                        return [4 /*yield*/, Promise.all(allChildren.map(function (f) { return storage.TryCopyFile(f, oldFolderPrefix_1, newFolderPrefix); }))];
                    case 2:
                        successArray = _a.sent();
                        return [2 /*return*/, successArray];
                    case 3:
                        error_1 = _a.sent();
                        throw new verror.VError(error_1);
                    case 4: return [2 /*return*/];
                }
            });
        });
    }
    function CopyFiles(bucket, items, newDirectoryPath, claims) {
        return __awaiter(this, void 0, void 0, function () {
            var newFolderPrefix_1, copyResultsArrArr, copyResultsArr, results, error_2;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        newFolderPrefix_1 = paths.EnsureGoogleStoragePathDir(newDirectoryPath);
                        return [4 /*yield*/, Promise.all(items.map(function (filePath) { return copyWithChildren(bucket, filePath, newFolderPrefix_1); }))];
                    case 1:
                        copyResultsArrArr = _a.sent();
                        copyResultsArr = copyResultsArrArr.reduce(function (acc, cur) {
                            return acc.concat(cur);
                        }, []);
                        results = getResultFromArray(copyResultsArr);
                        return [2 /*return*/, results];
                    case 2:
                        error_2 = _a.sent();
                        throw new verror.VError(error_2);
                    case 3: return [2 /*return*/];
                }
            });
        });
    }

    function tryDeleteFile(file) {
        return __awaiter(this, void 0, void 0, function () {
            var _a, exists, error_1;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _b.trys.push([0, 4, , 5]);
                        return [4 /*yield*/, file.exists()];
                    case 1:
                        _a = __read.apply(void 0, [_b.sent(), 1]), exists = _a[0];
                        if (!exists) return [3 /*break*/, 3];
                        console.log('- deleting file: ', file.name);
                        return [4 /*yield*/, file.delete()];
                    case 2:
                        _b.sent();
                        return [2 /*return*/, true];
                    case 3: return [2 /*return*/, false];
                    case 4:
                        error_1 = _b.sent();
                        throw new verror.VError(error_1);
                    case 5: return [2 /*return*/];
                }
            });
        });
    }
    function RemoveFileWithChildren(bucket, itemPath) {
        return __awaiter(this, void 0, void 0, function () {
            var allChildren, successArray, allSuccesses, error_2;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 3, , 4]);
                        return [4 /*yield*/, storage.GetAllChildrenWithPrefix(bucket, itemPath)];
                    case 1:
                        allChildren = _a.sent();
                        return [4 /*yield*/, Promise.all(allChildren.map(function (f) { return tryDeleteFile(f); }))];
                    case 2:
                        successArray = _a.sent();
                        allSuccesses = successArray.reduce(function (acc, cur) { return (acc = acc && cur); }, true);
                        return [2 /*return*/, allSuccesses];
                    case 3:
                        error_2 = _a.sent();
                        throw new verror.VError(error_2);
                    case 4: return [2 /*return*/];
                }
            });
        });
    }
    function RemoveFiles(bucket, items, claims) {
        return __awaiter(this, void 0, void 0, function () {
            var googleStorageItemPaths, successArray, allSuccesses, results, error_3;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        googleStorageItemPaths = items.map(function (p) { return paths.EnsureNoPrefixSlash(p); });
                        return [4 /*yield*/, Promise.all(googleStorageItemPaths.map(function (itemPath) { return RemoveFileWithChildren(bucket, itemPath); }))];
                    case 1:
                        successArray = _a.sent();
                        allSuccesses = successArray.reduce(function (acc, cur) { return (acc = acc && cur); }, true);
                        results = {
                            success: allSuccesses
                        };
                        return [2 /*return*/, results];
                    case 2:
                        error_3 = _a.sent();
                        throw new verror.VError(error_3);
                    case 3: return [2 /*return*/];
                }
            });
        });
    }

    function EditFile(bucket, item, content, claims) {
        return __awaiter(this, void 0, void 0, function () {
            var result, error_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        result = { success: true };
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, , 4]);
                        return [4 /*yield*/, bucket.file(item).save(content)];
                    case 2:
                        _a.sent();
                        return [3 /*break*/, 4];
                    case 3:
                        error_1 = _a.sent();
                        result.success = false;
                        return [3 /*break*/, 4];
                    case 4: return [2 /*return*/, result];
                }
            });
        });
    }

    function GetFileContent(bucket, item, claims) {
        return __awaiter(this, void 0, void 0, function () {
            var result, file, content, error_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 3, , 4]);
                        return [4 /*yield*/, bucket.file(item).get()];
                    case 1:
                        result = _a.sent();
                        file = result[0];
                        return [4 /*yield*/, StreamToPromise(file.createReadStream())];
                    case 2:
                        content = _a.sent();
                        return [2 /*return*/, content];
                    case 3:
                        error_1 = _a.sent();
                        throw new verror.VError(error_1);
                    case 4: return [2 /*return*/];
                }
            });
        });
    }

    var moment = require('moment');
    function GetUrl(file) {
        return __awaiter(this, void 0, void 0, function () {
            var in5mins, config, signedResult, url, error_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        in5mins = moment()
                            .add(5, 'minutes')
                            .toDate();
                        config = { expires: in5mins, action: 'read' };
                        return [4 /*yield*/, file.getSignedUrl(config)];
                    case 1:
                        signedResult = _a.sent();
                        url = signedResult.shift();
                        return [2 /*return*/, url];
                    case 2:
                        error_1 = _a.sent();
                        throw new verror.VError(error_1);
                    case 3: return [2 /*return*/];
                }
            });
        });
    }
    function GetSingle(bucket, item, claims) {
        return __awaiter(this, void 0, void 0, function () {
            var actualFilePath, file, translatedF, resFile, _a, error_2;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _b.trys.push([0, 3, , 4]);
                        actualFilePath = paths.EnsureNoPrefixSlash(item);
                        file = bucket.file(actualFilePath);
                        translatedF = translateRawStorage(file);
                        return [4 /*yield*/, translateStorageToResFile(translatedF)];
                    case 1:
                        resFile = _b.sent();
                        _a = resFile;
                        return [4 /*yield*/, GetUrl(file)];
                    case 2:
                        _a.downloadUrl = _b.sent();
                        return [2 /*return*/, resFile];
                    case 3:
                        error_2 = _b.sent();
                        throw new verror.VError(error_2);
                    case 4: return [2 /*return*/];
                }
            });
        });
    }

    function CreateFolderWithoutPermissions(bucket, newDirectoryPath) {
        return __awaiter(this, void 0, void 0, function () {
            var directoryPath, file, result, blankPerms, error_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        directoryPath = paths.EnsureGoogleStoragePathDir(newDirectoryPath);
                        file = bucket.file(directoryPath);
                        result = { success: true };
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 4, , 5]);
                        return [4 /*yield*/, file.save('')];
                    case 2:
                        _a.sent();
                        blankPerms = perms.factory.blankPermissionsObj();
                        return [4 /*yield*/, perms.commands.UpdateFilePermissions(file, blankPerms)];
                    case 3:
                        _a.sent();
                        return [3 /*break*/, 5];
                    case 4:
                        error_1 = _a.sent();
                        result.success = false;
                        return [3 /*break*/, 5];
                    case 5: return [2 /*return*/, result];
                }
            });
        });
    }
    function GetNextFreeFoldername(bucket, targetChildDir) {
        return __awaiter(this, void 0, void 0, function () {
            var parentDirectory, childrenMatching, isEmptyParent, childrenMatchingPaths, targetFolderPath, folderExists, nextPath, nextFreeFile;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        parentDirectory = paths.GetParentDir(targetChildDir.name);
                        return [4 /*yield*/, storage.GetListWithoutPermissions(bucket, parentDirectory)];
                    case 1:
                        childrenMatching = _a.sent();
                        isEmptyParent = !childrenMatching || !childrenMatching.length;
                        if (isEmptyParent) {
                            return [2 /*return*/, targetChildDir];
                        }
                        childrenMatchingPaths = childrenMatching.map(function (f) { return paths.EnsureGoogleStoragePathDir(f.fullPath); });
                        targetFolderPath = paths.EnsureGoogleStoragePathDir(targetChildDir.name);
                        folderExists = childrenMatchingPaths.some(function (path) { return path === targetFolderPath; });
                        if (!folderExists) {
                            return [2 /*return*/, targetChildDir];
                        }
                        nextPath = paths.Add2ToPathDir(targetFolderPath);
                        nextFreeFile = bucket.file(nextPath);
                        return [2 /*return*/, nextFreeFile];
                }
            });
        });
    }
    function CreateFolder(bucket, newDirectoryPath, claims, disableNoClobber, isAdmin) {
        return __awaiter(this, void 0, void 0, function () {
            var newDirPath, newDir, newDirToAdd, error_2;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 6, , 7]);
                        newDirPath = paths.EnsureGoogleStoragePathDir(newDirectoryPath);
                        newDir = bucket.file(newDirPath);
                        newDirToAdd = void 0;
                        if (!!disableNoClobber) return [3 /*break*/, 2];
                        return [4 /*yield*/, GetNextFreeFoldername(bucket, newDir)];
                    case 1:
                        newDirToAdd = _a.sent();
                        return [3 /*break*/, 3];
                    case 2:
                        newDirToAdd = newDir;
                        _a.label = 3;
                    case 3:
                        if (!!isAdmin) return [3 /*break*/, 5];
                        return [4 /*yield*/, storage.TryCheckWritePermission(bucket, newDirToAdd.name, claims)];
                    case 4:
                        _a.sent();
                        _a.label = 5;
                    case 5: return [2 /*return*/, CreateFolderWithoutPermissions(bucket, newDirToAdd.name)];
                    case 6:
                        error_2 = _a.sent();
                        throw new Error(error_2);
                    case 7: return [2 /*return*/];
                }
            });
        });
    }

    function SetPermissionToObj(permissionsObj, role, entity) {
        var newPermissions = Object.assign(Object.assign({}, perms.factory.blankPermissionsObj()), permissionsObj);
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
        return __awaiter(this, void 0, void 0, function () {
            var currentFilePermissions, newPermissions, res, error_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 3, , 4]);
                        return [4 /*yield*/, perms.queries.RetrieveFilePermissions(file)];
                    case 1:
                        currentFilePermissions = _a.sent();
                        newPermissions = SetPermissionToObj(currentFilePermissions, role, entity);
                        return [4 /*yield*/, perms.commands.UpdateFilePermissions(file, newPermissions)];
                    case 2:
                        res = _a.sent();
                        return [2 /*return*/, res];
                    case 3:
                        error_1 = _a.sent();
                        throw new verror.VError(error_1);
                    case 4: return [2 /*return*/];
                }
            });
        });
    }
    function TryChangeSingleFilePermissions(file, role, entity, claims) {
        return __awaiter(this, void 0, void 0, function () {
            var currentFilePermissions, newPermissions, res, error_2;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 3, , 4]);
                        return [4 /*yield*/, perms.queries.RetrieveFilePermissions(file)];
                    case 1:
                        currentFilePermissions = _a.sent();
                        newPermissions = SetPermissionToObj(currentFilePermissions, role, entity);
                        perms.queries.CheckCanEditPermissions(currentFilePermissions, newPermissions, claims);
                        return [4 /*yield*/, perms.commands.UpdateFilePermissions(file, newPermissions)];
                    case 2:
                        res = _a.sent();
                        return [2 /*return*/, res];
                    case 3:
                        error_2 = _a.sent();
                        throw new Error(error_2);
                    case 4: return [2 /*return*/];
                }
            });
        });
    }
    function tryChangePermissions(bucket, filePath, role, entity, isRecursive, claims) {
        return __awaiter(this, void 0, void 0, function () {
            var allChildren, successArray, error_3, file, result, error_4;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!isRecursive) return [3 /*break*/, 6];
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 4, , 5]);
                        return [4 /*yield*/, storage.GetAllChildrenWithPrefix(bucket, filePath)];
                    case 2:
                        allChildren = _a.sent();
                        return [4 /*yield*/, Promise.all(allChildren.map(function (file) { return TryChangeSingleFilePermissions(file, role, entity, claims); }))];
                    case 3:
                        successArray = _a.sent();
                        return [2 /*return*/, successArray];
                    case 4:
                        error_3 = _a.sent();
                        throw new verror.VError(error_3);
                    case 5: return [3 /*break*/, 9];
                    case 6:
                        _a.trys.push([6, 8, , 9]);
                        file = bucket.file(filePath);
                        return [4 /*yield*/, TryChangeSingleFilePermissions(file, role, entity, claims)];
                    case 7:
                        result = _a.sent();
                        return [2 /*return*/, [result]];
                    case 8:
                        error_4 = _a.sent();
                        throw new verror.VError(error_4);
                    case 9: return [2 /*return*/];
                }
            });
        });
    }
    function ChangePermissions(bucket, items, role, entity, isRecursive, claims) {
        return __awaiter(this, void 0, void 0, function () {
            var successArr, error_5;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, Promise.all(items.map(function (filePath) { return tryChangePermissions(bucket, filePath, role, entity, isRecursive, claims); }))];
                    case 1:
                        successArr = _a.sent();
                        // return results;
                        return [2 /*return*/, {
                                success: successArr
                            }];
                    case 2:
                        error_5 = _a.sent();
                        throw new Error(error_5.message);
                    case 3: return [2 /*return*/];
                }
            });
        });
    }

    function SaveBufferToPath(file, mimetype, buffer) {
        return __awaiter(this, void 0, void 0, function () {
            var fileOptions;
            return __generator(this, function (_a) {
                fileOptions = {
                    contentType: mimetype
                };
                console.log('uploadFile: SaveBufferToPath', { mimetype: mimetype, path: file.name });
                return [2 /*return*/, file.save(buffer, fileOptions)];
            });
        });
    }
    function GetNextFreeFilename(bucket, inputFile) {
        return __awaiter(this, void 0, void 0, function () {
            var dirNameNoSuffix, childrenMatching, matchingNames, lastMatch, nextPath, nextFreeFile;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        dirNameNoSuffix = paths.GetParentDir(inputFile.name);
                        return [4 /*yield*/, storage.GetListWithoutPermissions(bucket, dirNameNoSuffix)];
                    case 1:
                        childrenMatching = _a.sent();
                        if (!childrenMatching || !childrenMatching.length) {
                            return [2 /*return*/, inputFile];
                        }
                        matchingNames = childrenMatching.map(function (f) { return f.fullPath; }).sort();
                        lastMatch = matchingNames.shift();
                        nextPath = paths.Add2ToPath(lastMatch);
                        nextFreeFile = bucket.file(nextPath);
                        return [2 /*return*/, nextFreeFile];
                }
            });
        });
    }
    function UploadFile(bucket, directoryPath, originalname, mimetype, buffer, claims) {
        return __awaiter(this, void 0, void 0, function () {
            var newPath, bucketFilePath, desiredFile, file, _a, exists, error_1;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        newPath = path.join(directoryPath, originalname);
                        bucketFilePath = paths.EnsureGoogleStoragePathFile(newPath);
                        desiredFile = bucket.file(bucketFilePath);
                        _b.label = 1;
                    case 1:
                        _b.trys.push([1, 7, , 8]);
                        file = void 0;
                        return [4 /*yield*/, desiredFile.exists()];
                    case 2:
                        _a = __read.apply(void 0, [_b.sent(), 1]), exists = _a[0];
                        if (!exists) return [3 /*break*/, 4];
                        return [4 /*yield*/, GetNextFreeFilename(bucket, desiredFile)];
                    case 3:
                        file = _b.sent();
                        return [3 /*break*/, 5];
                    case 4:
                        file = desiredFile;
                        _b.label = 5;
                    case 5: return [4 /*yield*/, SaveBufferToPath(file, mimetype, buffer)];
                    case 6:
                        _b.sent();
                        return [3 /*break*/, 8];
                    case 7:
                        error_1 = _b.sent();
                        throw new Error('UploadFile: ' + error_1);
                    case 8: return [2 /*return*/];
                }
            });
        });
    }

    function TryChangeSingleFilePermissionsObject(file, newPermissions, claims) {
        return __awaiter(this, void 0, void 0, function () {
            var res, error_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, perms.commands.UpdateFilePermissions(file, newPermissions)];
                    case 1:
                        res = _a.sent();
                        return [2 /*return*/, res];
                    case 2:
                        error_1 = _a.sent();
                        throw new Error(error_1);
                    case 3: return [2 /*return*/];
                }
            });
        });
    }
    function tryChangePermissionsObject(bucket, filePath, permissionsObj, isRecursive, claims) {
        return __awaiter(this, void 0, void 0, function () {
            var allChildren, successArray, error_2, file, result, error_3;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!isRecursive) return [3 /*break*/, 6];
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 4, , 5]);
                        return [4 /*yield*/, storage.GetAllChildrenWithPrefix(bucket, filePath)];
                    case 2:
                        allChildren = _a.sent();
                        return [4 /*yield*/, Promise.all(allChildren.map(function (file) { return TryChangeSingleFilePermissionsObject(file, permissionsObj, claims); }))];
                    case 3:
                        successArray = _a.sent();
                        return [2 /*return*/, successArray];
                    case 4:
                        error_2 = _a.sent();
                        throw new verror.VError(error_2);
                    case 5: return [3 /*break*/, 9];
                    case 6:
                        _a.trys.push([6, 8, , 9]);
                        file = bucket.file(filePath);
                        return [4 /*yield*/, TryChangeSingleFilePermissionsObject(file, permissionsObj, claims)];
                    case 7:
                        result = _a.sent();
                        return [2 /*return*/, [result]];
                    case 8:
                        error_3 = _a.sent();
                        throw new verror.VError(error_3);
                    case 9: return [2 /*return*/];
                }
            });
        });
    }
    function ChangePermissionsObject(bucket, items, permissionsObj, isRecursive, claims) {
        return __awaiter(this, void 0, void 0, function () {
            var successArr, error_4;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, Promise.all(items.map(function (filePath) { return tryChangePermissionsObject(bucket, filePath, permissionsObj, isRecursive, claims); }))];
                    case 1:
                        successArr = _a.sent();
                        return [2 /*return*/, {
                                success: successArr
                            }];
                    case 2:
                        error_4 = _a.sent();
                        throw new Error(error_4.message);
                    case 3: return [2 /*return*/];
                }
            });
        });
    }

    var commands = {
        GetList: GetList,
        RenameFile: RenameFile,
        MoveFiles: MoveFiles,
        CopyFiles: CopyFiles,
        RemoveFiles: RemoveFiles,
        EditFile: EditFile,
        GetFileContent: GetFileContent,
        GetSingle: GetSingle,
        CreateFolder: CreateFolder,
        ChangePermissions: ChangePermissions,
        ChangePermissionsObject: ChangePermissionsObject,
        UploadFile: UploadFile
    };

    function CheckHasBodyProp(body, bodyFieldName) {
        return __awaiter(this, void 0, void 0, function () {
            var exists;
            return __generator(this, function (_a) {
                exists = body[bodyFieldName];
                if (!exists) {
                    throw new Error("Request is missing property in req.body: '" + bodyFieldName + "'");
                }
                return [2 /*return*/];
            });
        });
    }
    var NgxFileMangerApiFireBaseClass = /** @class */ (function () {
        function NgxFileMangerApiFireBaseClass(storage) {
            this.storage = storage;
        }
        NgxFileMangerApiFireBaseClass.prototype.getBucket = function (bucketname) {
            return __awaiter(this, void 0, void 0, function () {
                var bucket, exists, error_1;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            if (!bucketname) {
                                throw new Error("Request is missing property in req.body: 'bucketname'");
                            }
                            _a.label = 1;
                        case 1:
                            _a.trys.push([1, 3, , 4]);
                            bucket = this.storage.bucket(bucketname);
                            return [4 /*yield*/, bucket.exists()];
                        case 2:
                            exists = (_a.sent()).shift();
                            if (!exists) {
                                throw new Error("bucket: \"" + bucketname + "\" doesn't exist, please create it first");
                            }
                            return [2 /*return*/, bucket];
                        case 3:
                            error_1 = _a.sent();
                            throw new Error('Error retrieving bucket: ' + error_1.message);
                        case 4: return [2 /*return*/];
                    }
                });
            });
        };
        NgxFileMangerApiFireBaseClass.prototype.HandleList = function (body, claims) {
            return __awaiter(this, void 0, void 0, function () {
                var bucket, resFiles, response, error_2;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            _a.trys.push([0, 4, , 5]);
                            return [4 /*yield*/, CheckHasBodyProp(body, 'path')];
                        case 1:
                            _a.sent();
                            return [4 /*yield*/, this.getBucket(body.bucketname)];
                        case 2:
                            bucket = _a.sent();
                            return [4 /*yield*/, commands.GetList(bucket, body.path, claims, body.isAdmin)];
                        case 3:
                            resFiles = _a.sent();
                            response = {
                                result: resFiles
                            };
                            return [2 /*return*/, response];
                        case 4:
                            error_2 = _a.sent();
                            throw new verror.VError(error_2);
                        case 5: return [2 /*return*/];
                    }
                });
            });
        };
        NgxFileMangerApiFireBaseClass.prototype.HandleRename = function (body, claims) {
            return __awaiter(this, void 0, void 0, function () {
                var bucket, result, response, error_3;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            _a.trys.push([0, 5, , 6]);
                            return [4 /*yield*/, CheckHasBodyProp(body, 'item')];
                        case 1:
                            _a.sent();
                            return [4 /*yield*/, CheckHasBodyProp(body, 'newItemPath')];
                        case 2:
                            _a.sent();
                            return [4 /*yield*/, this.getBucket(body.bucketname)];
                        case 3:
                            bucket = _a.sent();
                            return [4 /*yield*/, commands.RenameFile(bucket, body.item, body.newItemPath, claims)];
                        case 4:
                            result = _a.sent();
                            response = {
                                result: result
                            };
                            return [2 /*return*/, response];
                        case 5:
                            error_3 = _a.sent();
                            throw new verror.VError(error_3);
                        case 6: return [2 /*return*/];
                    }
                });
            });
        };
        NgxFileMangerApiFireBaseClass.prototype.HandleMove = function (body, claims) {
            return __awaiter(this, void 0, void 0, function () {
                var bucket, result, response, error_4;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            _a.trys.push([0, 5, , 6]);
                            return [4 /*yield*/, this.getBucket(body.bucketname)];
                        case 1:
                            bucket = _a.sent();
                            return [4 /*yield*/, CheckHasBodyProp(body, 'items')];
                        case 2:
                            _a.sent();
                            return [4 /*yield*/, CheckHasBodyProp(body, 'newPath')];
                        case 3:
                            _a.sent();
                            return [4 /*yield*/, commands.MoveFiles(bucket, body.items, body.newPath, claims)];
                        case 4:
                            result = _a.sent();
                            response = {
                                result: result
                            };
                            return [2 /*return*/, response];
                        case 5:
                            error_4 = _a.sent();
                            throw new verror.VError(error_4);
                        case 6: return [2 /*return*/];
                    }
                });
            });
        };
        NgxFileMangerApiFireBaseClass.prototype.HandleCopy = function (body, claims) {
            return __awaiter(this, void 0, void 0, function () {
                var bucket, filesToCopy, result, response, error_5;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            _a.trys.push([0, 4, , 5]);
                            return [4 /*yield*/, CheckHasBodyProp(body, 'newPath')];
                        case 1:
                            _a.sent();
                            return [4 /*yield*/, this.getBucket(body.bucketname)];
                        case 2:
                            bucket = _a.sent();
                            filesToCopy = void 0;
                            if (body.items) {
                                filesToCopy = body.items;
                            }
                            else if (body.singleFileName) {
                                filesToCopy = [body.singleFileName];
                            }
                            else {
                                throw new Error('Request does not contain either body.items or body.singleFileName');
                            }
                            return [4 /*yield*/, commands.CopyFiles(bucket, filesToCopy, body.newPath, claims)];
                        case 3:
                            result = _a.sent();
                            response = {
                                result: result
                            };
                            return [2 /*return*/, response];
                        case 4:
                            error_5 = _a.sent();
                            throw new verror.VError(error_5);
                        case 5: return [2 /*return*/];
                    }
                });
            });
        };
        NgxFileMangerApiFireBaseClass.prototype.HandleRemove = function (body, claims) {
            return __awaiter(this, void 0, void 0, function () {
                var bucket, result, response, error_6;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            _a.trys.push([0, 4, , 5]);
                            return [4 /*yield*/, CheckHasBodyProp(body, 'items')];
                        case 1:
                            _a.sent();
                            return [4 /*yield*/, this.getBucket(body.bucketname)];
                        case 2:
                            bucket = _a.sent();
                            return [4 /*yield*/, commands.RemoveFiles(bucket, body.items, claims)];
                        case 3:
                            result = _a.sent();
                            response = {
                                result: result
                            };
                            return [2 /*return*/, response];
                        case 4:
                            error_6 = _a.sent();
                            throw new verror.VError(error_6);
                        case 5: return [2 /*return*/];
                    }
                });
            });
        };
        NgxFileMangerApiFireBaseClass.prototype.HandleEdit = function (body, claims) {
            return __awaiter(this, void 0, void 0, function () {
                var bucket, result, response, error_7;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            _a.trys.push([0, 5, , 6]);
                            return [4 /*yield*/, CheckHasBodyProp(body, 'item')];
                        case 1:
                            _a.sent();
                            return [4 /*yield*/, CheckHasBodyProp(body, 'content')];
                        case 2:
                            _a.sent();
                            return [4 /*yield*/, this.getBucket(body.bucketname)];
                        case 3:
                            bucket = _a.sent();
                            return [4 /*yield*/, commands.EditFile(bucket, body.item, body.content, claims)];
                        case 4:
                            result = _a.sent();
                            response = {
                                result: result
                            };
                            return [2 /*return*/, response];
                        case 5:
                            error_7 = _a.sent();
                            throw new verror.VError(error_7);
                        case 6: return [2 /*return*/];
                    }
                });
            });
        };
        NgxFileMangerApiFireBaseClass.prototype.HandleGetContent = function (body, claims) {
            return __awaiter(this, void 0, void 0, function () {
                var bucket, result, response, error_8;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            _a.trys.push([0, 4, , 5]);
                            return [4 /*yield*/, CheckHasBodyProp(body, 'item')];
                        case 1:
                            _a.sent();
                            return [4 /*yield*/, this.getBucket(body.bucketname)];
                        case 2:
                            bucket = _a.sent();
                            return [4 /*yield*/, commands.GetFileContent(bucket, body.item, claims)];
                        case 3:
                            result = _a.sent();
                            response = {
                                result: result
                            };
                            return [2 /*return*/, response];
                        case 4:
                            error_8 = _a.sent();
                            throw new verror.VError(error_8);
                        case 5: return [2 /*return*/];
                    }
                });
            });
        };
        NgxFileMangerApiFireBaseClass.prototype.HandleGetSingle = function (body, claims) {
            return __awaiter(this, void 0, void 0, function () {
                var bucket, file, response, error_9;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            _a.trys.push([0, 4, , 5]);
                            return [4 /*yield*/, CheckHasBodyProp(body, 'item')];
                        case 1:
                            _a.sent();
                            return [4 /*yield*/, this.getBucket(body.bucketname)];
                        case 2:
                            bucket = _a.sent();
                            return [4 /*yield*/, commands.GetSingle(bucket, body.item, claims)];
                        case 3:
                            file = _a.sent();
                            response = {
                                result: {
                                    success: true,
                                    file: file,
                                    url: file.downloadUrl
                                }
                            };
                            return [2 /*return*/, response];
                        case 4:
                            error_9 = _a.sent();
                            throw new verror.VError(error_9);
                        case 5: return [2 /*return*/];
                    }
                });
            });
        };
        NgxFileMangerApiFireBaseClass.prototype.HandleCreateFolder = function (body, claims) {
            return __awaiter(this, void 0, void 0, function () {
                var bucket, result, response, error_10;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            _a.trys.push([0, 4, , 5]);
                            return [4 /*yield*/, CheckHasBodyProp(body, 'newPath')];
                        case 1:
                            _a.sent();
                            return [4 /*yield*/, this.getBucket(body.bucketname)];
                        case 2:
                            bucket = _a.sent();
                            return [4 /*yield*/, commands.CreateFolder(bucket, body.newPath, claims, body.disableNoClobber, body.isAdmin)];
                        case 3:
                            result = _a.sent();
                            response = {
                                result: result
                            };
                            return [2 /*return*/, response];
                        case 4:
                            error_10 = _a.sent();
                            throw new verror.VError(error_10);
                        case 5: return [2 /*return*/];
                    }
                });
            });
        };
        NgxFileMangerApiFireBaseClass.prototype.HandleSetPermissions = function (body, claims) {
            return __awaiter(this, void 0, void 0, function () {
                var bucket, result, response, error_11;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            _a.trys.push([0, 6, , 7]);
                            return [4 /*yield*/, CheckHasBodyProp(body, 'items')];
                        case 1:
                            _a.sent();
                            return [4 /*yield*/, CheckHasBodyProp(body, 'role')];
                        case 2:
                            _a.sent();
                            return [4 /*yield*/, CheckHasBodyProp(body, 'entity')];
                        case 3:
                            _a.sent();
                            return [4 /*yield*/, this.getBucket(body.bucketname)];
                        case 4:
                            bucket = _a.sent();
                            return [4 /*yield*/, commands.ChangePermissions(bucket, body.items, body.role, body.entity, body.recursive, claims)];
                        case 5:
                            result = _a.sent();
                            response = {
                                result: result
                            };
                            return [2 /*return*/, response];
                        case 6:
                            error_11 = _a.sent();
                            throw new verror.VError(error_11.message);
                        case 7: return [2 /*return*/];
                    }
                });
            });
        };
        NgxFileMangerApiFireBaseClass.prototype.HandleSetPermissionsObject = function (body, claims) {
            return __awaiter(this, void 0, void 0, function () {
                var bucket, result, response, error_12;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            _a.trys.push([0, 5, , 6]);
                            return [4 /*yield*/, CheckHasBodyProp(body, 'items')];
                        case 1:
                            _a.sent();
                            return [4 /*yield*/, CheckHasBodyProp(body, 'permissionsObj')];
                        case 2:
                            _a.sent();
                            return [4 /*yield*/, this.getBucket(body.bucketname)];
                        case 3:
                            bucket = _a.sent();
                            return [4 /*yield*/, commands.ChangePermissionsObject(bucket, body.items, body.permissionsObj, body.recursive, claims)];
                        case 4:
                            result = _a.sent();
                            response = {
                                result: result
                            };
                            return [2 /*return*/, response];
                        case 5:
                            error_12 = _a.sent();
                            throw new verror.VError(error_12.message);
                        case 6: return [2 /*return*/];
                    }
                });
            });
        };
        NgxFileMangerApiFireBaseClass.prototype.HandleSaveFile = function (bucketname, directoryPath, originalname, mimetype, buffer, claims) {
            return __awaiter(this, void 0, void 0, function () {
                var bucket, result, error_13;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            _a.trys.push([0, 3, , 4]);
                            return [4 /*yield*/, this.getBucket(bucketname)];
                        case 1:
                            bucket = _a.sent();
                            return [4 /*yield*/, commands.UploadFile(bucket, directoryPath, originalname, mimetype, buffer, claims)];
                        case 2:
                            _a.sent();
                            result = {
                                result: {
                                    success: true
                                }
                            };
                            return [2 /*return*/, result];
                        case 3:
                            error_13 = _a.sent();
                            throw new verror.VError(error_13);
                        case 4: return [2 /*return*/];
                    }
                });
            });
        };
        return NgxFileMangerApiFireBaseClass;
    }());

    var ParseUploadFile = function (req, res, next) { return __awaiter(void 0, void 0, void 0, function () {
        var form_1, files, convertedFiles, error_1;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 3, , 4]);
                    form_1 = new formidable.IncomingForm();
                    return [4 /*yield*/, new Promise(function (resolve, reject) {
                            form_1.parse(req, function (err, fields, fieldFileMap) {
                                var fileArray = Object.values(fieldFileMap);
                                resolve(fileArray);
                            });
                        })];
                case 1:
                    files = _a.sent();
                    return [4 /*yield*/, Promise.all(files.map(function (f) { return convertToFileAndBuffer(f); }))];
                case 2:
                    convertedFiles = _a.sent();
                    req.files = convertedFiles;
                    next();
                    return [3 /*break*/, 4];
                case 3:
                    error_1 = _a.sent();
                    console.error(error_1);
                    throw new Error(error_1);
                case 4: return [2 /*return*/];
            }
        });
    }); };
    function convertToFileAndBuffer(f) {
        return __awaiter(this, void 0, void 0, function () {
            var fileBuffer;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, new Promise(function (resolve, reject) { return fs.readFile(f.path, function (err, buffer) {
                            if (err) {
                                reject(err);
                            }
                            else {
                                resolve(buffer);
                            }
                        }); })];
                    case 1:
                        fileBuffer = _a.sent();
                        fs.unlinkSync(f.path);
                        return [2 /*return*/, {
                                buffer: fileBuffer,
                                mimetype: f.type,
                                originalname: f.name,
                                hash: f.hash
                            }];
                }
            });
        });
    }

    // Add middle ware to this route
    var express = require('express');
    var fmApi;
    var LOGGING = false;
    var endpoint = express();
    endpoint.use(AddCors);
    endpoint.use(OptionRequestsAreOk);
    endpoint.use(function (req, res, next) {
        req.body.path = req.body._c_id + "/" + req.body.path;
        if (LOGGING) {
            LogRequest(req, res, next);
        }
        else {
            next();
        }
    });
    endpoint.use('/hello', function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
        return __generator(this, function (_a) {
            console.log('HELLO');
            res.status(200).send('HELLO\n');
            return [2 /*return*/];
        });
    }); });
    endpoint.use(PostRequestsOnly);
    endpoint.use('/upload', OptionRequestsAreOk, PostRequestsOnly, HasQueryParam('bucketname'), HasQueryParam('directoryPath'), ParseUploadFile, function (req, res, next) { return __awaiter(void 0, void 0, void 0, function () {
        var bucketname, directoryPath, files, userClaims_1, results, success_1, finalResult, error_1;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    bucketname = req.query.bucketname;
                    directoryPath = req.query.directoryPath;
                    _a.label = 1;
                case 1:
                    _a.trys.push([1, 4, , 5]);
                    files = req.files;
                    return [4 /*yield*/, permsQueries.RetrieveCustomClaims(req)];
                case 2:
                    userClaims_1 = _a.sent();
                    return [4 /*yield*/, Promise.all(files.map(function (file) { return trySaveFile(bucketname, directoryPath, file, userClaims_1); }))];
                case 3:
                    results = _a.sent();
                    success_1 = {
                        result: {
                            success: true
                        }
                    };
                    finalResult = results.reduce(function (acc, cur) {
                        if (cur.result.error) {
                            return cur;
                        }
                        return success_1;
                    }, success_1);
                    res.status(200).send(finalResult);
                    return [3 /*break*/, 5];
                case 4:
                    error_1 = _a.sent();
                    console.error('Error occurred while uploading: \n', verror.VError.fullStack(error_1));
                    res
                        .status(400)
                        .send('Error occurred while uploading: \n' + error_1.message);
                    return [2 /*return*/];
                case 5: return [2 /*return*/];
            }
        });
    }); });
    function trySaveFile(bucketname, directoryPath, f, userClaims) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, fmApi.HandleSaveFile(bucketname, directoryPath, f.originalname, f.mimetype, f.buffer, userClaims)];
            });
        });
    }
    endpoint.use('/', HasBodyProp('action'), HasBodyProp('bucketname'), function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
        var action, userClaims, body, _a, error_2, returnedError;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    action = req.body.action;
                    _b.label = 1;
                case 1:
                    _b.trys.push([1, 27, , 28]);
                    return [4 /*yield*/, permsQueries.RetrieveCustomClaims(req)];
                case 2:
                    userClaims = _b.sent();
                    body = void 0;
                    _a = action;
                    switch (_a) {
                        case 'list': return [3 /*break*/, 3];
                        case 'rename': return [3 /*break*/, 5];
                        case 'move': return [3 /*break*/, 7];
                        case 'copy': return [3 /*break*/, 9];
                        case 'remove': return [3 /*break*/, 11];
                        case 'edit': return [3 /*break*/, 13];
                        case 'getContent': return [3 /*break*/, 15];
                        case 'createFolder': return [3 /*break*/, 17];
                        case 'getSingle': return [3 /*break*/, 19];
                        case 'changePermissions': return [3 /*break*/, 21];
                        case 'changePermissionsObject': return [3 /*break*/, 23];
                        case 'compress': return [3 /*break*/, 25];
                        case 'extract': return [3 /*break*/, 25];
                        case 'downloadMultiple': return [3 /*break*/, 25];
                    }
                    return [3 /*break*/, 25];
                case 3: return [4 /*yield*/, fmApi.HandleList(req.body, userClaims)];
                case 4:
                    body = _b.sent();
                    return [3 /*break*/, 26];
                case 5: return [4 /*yield*/, fmApi.HandleRename(req.body, userClaims)];
                case 6:
                    body = _b.sent();
                    return [3 /*break*/, 26];
                case 7: return [4 /*yield*/, fmApi.HandleMove(req.body, userClaims)];
                case 8:
                    body = _b.sent();
                    return [3 /*break*/, 26];
                case 9: return [4 /*yield*/, fmApi.HandleCopy(req.body, userClaims)];
                case 10:
                    body = _b.sent();
                    return [3 /*break*/, 26];
                case 11: return [4 /*yield*/, fmApi.HandleRemove(req.body, userClaims)];
                case 12:
                    body = _b.sent();
                    return [3 /*break*/, 26];
                case 13: return [4 /*yield*/, fmApi.HandleEdit(req.body, userClaims)];
                case 14:
                    body = _b.sent();
                    return [3 /*break*/, 26];
                case 15: return [4 /*yield*/, fmApi.HandleGetContent(req.body, userClaims)];
                case 16:
                    body = _b.sent();
                    return [3 /*break*/, 26];
                case 17: return [4 /*yield*/, fmApi.HandleCreateFolder(req.body, userClaims)];
                case 18:
                    body = _b.sent();
                    return [3 /*break*/, 26];
                case 19: return [4 /*yield*/, fmApi.HandleGetSingle(req.body, userClaims)];
                case 20:
                    body = _b.sent();
                    return [3 /*break*/, 26];
                case 21: return [4 /*yield*/, fmApi.HandleSetPermissions(req.body, userClaims)];
                case 22:
                    body = _b.sent();
                    return [3 /*break*/, 26];
                case 23: return [4 /*yield*/, fmApi.HandleSetPermissionsObject(req.body, userClaims)];
                case 24:
                    body = _b.sent();
                    return [3 /*break*/, 26];
                case 25: throw new Error('action has not been implemented');
                case 26:
                    res.status(200).send(body);
                    return [3 /*break*/, 28];
                case 27:
                    error_2 = _b.sent();
                    console.error('Error while processing request: \n', verror.VError.fullStack(error_2));
                    returnedError = {
                        error: "Bad request to ngx-file-manager!",
                        errorDetail: error_2.message,
                        requestBody: req.body
                    };
                    res.status(400).send(returnedError);
                    return [3 /*break*/, 28];
                case 28: return [2 /*return*/];
            }
        });
    }); });
    endpoint.use(notImplemented);
    function notImplemented(req, res) {
        return __awaiter(this, void 0, void 0, function () {
            var bodyString;
            return __generator(this, function (_a) {
                bodyString = JSON.stringify(req.body);
                res.status(501).send('That request has not been implemented: ' + bodyString);
                return [2 /*return*/];
            });
        });
    }
    /*
    Use by attaching to a firebase function
    exports.FileManagerApi = StorageEndpoint;
    */
    var FileManagerEndpointExpress = function (options) {
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

    exports.FileManagerEndpointExpress = FileManagerEndpointExpress;

    Object.defineProperty(exports, '__esModule', { value: true });

})));
//# sourceMappingURL=ngx-filemanager-api-firebase.umd.js.map
