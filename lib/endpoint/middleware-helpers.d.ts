import { Request, Response, NextFunction, RequestHandler } from 'express';
export declare function OptionRequestsAreOk(req: Request, res: Response, next: NextFunction): RequestHandler;
export declare function PostRequestsOnly(req: Request, res: Response, next: NextFunction): RequestHandler;
export declare function HasBodyProp(bodyFieldName: string): RequestHandler;
export declare function HasQueryParam(paramName: string): RequestHandler;
export declare function AddCors(req: Request, res: Response, next: NextFunction): Promise<void>;
export declare function LogRequest(req: Request, res: Response, next: NextFunction): void;
