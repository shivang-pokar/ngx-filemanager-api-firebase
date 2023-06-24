import { CoreTypes } from '../types';
export declare function GetTokenFromRequest(req: Request): Promise<CoreTypes.UserCustomClaims>;
export declare function DecodeJWT(bearer: string): Promise<{}>;
