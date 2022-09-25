import { Request, Response } from 'express';
import { IProjectDocument } from '../../../../database/models';
import { ErrorResponse } from '../../../contants';

// type create
type TProjectControllerCreateBody = {
	project_name: string;
	project_domain: string;
};

type TProjectControllerCreateResponse = {
	project: IProjectDocument;
	api_key: string;
};
export type TProjectCreateRequest = Request<{}, {}, TProjectControllerCreateBody>;
export type TProjectCrateResponse = Response<TProjectControllerCreateResponse & ErrorResponse>;
