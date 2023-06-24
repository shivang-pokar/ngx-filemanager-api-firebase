/// <reference types="node" />
import { FileFromStorage, File } from '../types/google-cloud-types';
import { Readable } from 'stream';
import * as request from 'request';
import { CoreTypes } from '../types';
export declare function translateRawStorage(storageObject: File): FileFromStorage;
export declare function makePhantomStorageFolder(folderPath: string): FileFromStorage;
export declare function translateStorageToResFile(f: FileFromStorage): Promise<CoreTypes.ResFile>;
export declare function StreamToPromise(stream: Readable): Promise<string>;
export declare function getResult(res: request.Response): CoreTypes.ResultObj;
export declare function getResultFromArray(res: request.Response[]): CoreTypes.ResultObj;
export declare function ResultsObjFromArray(moveResults: CoreTypes.ResultObj[]): CoreTypes.ResultObj;
