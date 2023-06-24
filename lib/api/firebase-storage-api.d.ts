/// <reference types="node" />
import { Storage } from '../types/google-cloud-types';
import { CoreTypes } from '../types';
export declare class NgxFileMangerApiFireBaseClass {
    storage: Storage;
    constructor(storage: Storage);
    private getBucket;
    HandleList(body: CoreTypes.ReqBodyList, claims: CoreTypes.UserCustomClaims): Promise<CoreTypes.ResBodyList>;
    HandleRename(body: CoreTypes.ReqBodyRename, claims: CoreTypes.UserCustomClaims): Promise<CoreTypes.ResBodyRename>;
    HandleMove(body: CoreTypes.ReqBodyMove, claims: CoreTypes.UserCustomClaims): Promise<CoreTypes.ResBodyMove>;
    HandleCopy(body: CoreTypes.ReqBodyCopy, claims: CoreTypes.UserCustomClaims): Promise<CoreTypes.ResBodyCopy>;
    HandleRemove(body: CoreTypes.ReqBodyRemove, claims: CoreTypes.UserCustomClaims): Promise<CoreTypes.ResBodyRemove>;
    HandleEdit(body: CoreTypes.ReqBodyEdit, claims: CoreTypes.UserCustomClaims): Promise<CoreTypes.ResBodyEdit>;
    HandleGetContent(body: CoreTypes.ReqBodyGetContent, claims: CoreTypes.UserCustomClaims): Promise<CoreTypes.ResBodyGetContent>;
    HandleGetSingle(body: CoreTypes.ReqBodyGetSingle, claims: CoreTypes.UserCustomClaims): Promise<CoreTypes.ResBodyGetSingle>;
    HandleCreateFolder(body: CoreTypes.ReqBodyCreateFolder, claims: CoreTypes.UserCustomClaims): Promise<CoreTypes.ResBodyCreateFolder>;
    HandleSetPermissions(body: CoreTypes.ReqBodySetPermissions, claims: CoreTypes.UserCustomClaims): Promise<CoreTypes.ResBodySetPermissions>;
    HandleSetPermissionsObject(body: CoreTypes.ReqBodySetPermissionsObject, claims: CoreTypes.UserCustomClaims): Promise<CoreTypes.ResBodySetPermissions>;
    HandleSaveFile(bucketname: string, directoryPath: string, originalname: string, mimetype: string, buffer: Buffer, claims: CoreTypes.UserCustomClaims): Promise<CoreTypes.ResBodyUploadFile>;
}
