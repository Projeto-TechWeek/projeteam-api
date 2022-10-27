import type { Request, ParamsDictionary } from 'express-serve-static-core';

export type RequestWithoutParams<ResBody, ReqBody> = Request<ParamsDictionary, ResBody, ReqBody>;
