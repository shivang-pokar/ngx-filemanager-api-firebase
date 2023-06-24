import { File } from '../types/google-cloud-types';
declare function SetMetaPropertyString(file: File, key: string, newValueString: string): Promise<any>;
declare function SetMetaPropertyObj(file: File, key: string, newValue: {}): Promise<{}>;
declare function GetMetaPropertyString(file: File, key: string): Promise<string>;
declare function GetMetaPropertyObj<T>(file: File, key: string): Promise<T>;
export declare const permHelper: {
    GetMetaPropertyObj: typeof GetMetaPropertyObj;
    SetMetaPropertyObj: typeof SetMetaPropertyObj;
    GetMetaPropertyString: typeof GetMetaPropertyString;
    SetMetaPropertyString: typeof SetMetaPropertyString;
};
export {};
