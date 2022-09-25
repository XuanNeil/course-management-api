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
export type TProjectCreateResponse = Response<TProjectControllerCreateResponse & ErrorResponse>;

// type update
type TProjectControllerUpdateBody = {
	project_name: string;
	project_domain: string;
};
type TProjectControllerUpdateParams = {
	project_id: string;
};
type TProjectControllerUpdateResponse = {
	project: IProjectDocument;
	api_key: string;
};
export type TProjectUpdateRequest = Request<TProjectControllerUpdateParams, {}, TProjectControllerUpdateBody>;
export type TProjectUpdateResponse = Response<TProjectControllerUpdateResponse & ErrorResponse>;
