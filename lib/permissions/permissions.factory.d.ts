import { CoreTypes } from '../types';
declare function blankUserClaim(): CoreTypes.UserCustomClaims;
declare function blankPermissionsObj(): CoreTypes.FilePermissionsObject;
export declare const permsFactory: {
    blankPermissionsObj: typeof blankPermissionsObj;
    blankUserClaim: typeof blankUserClaim;
};
export {};
