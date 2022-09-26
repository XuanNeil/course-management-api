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

// type delete
type TProjectControllerDeleteParams = {
	project_id: string;
};
type TProjectControllerDeleteResponse = {};
export type TProjectDeleteRequest = Request<TProjectControllerDeleteParams>;
export type TProjectDeleteResponse = Response<TProjectControllerDeleteResponse & ErrorResponse>;

// type list
type TProjectControllerListQuery = {
	page?: number;
	page_size?: number;
};
interface IProject extends IProjectDocument {
	api_key?: string;
}
type TProjectControllerListResponse = {
	items: IProject[];
	paging: {};
};
export type TProjectListRequest = Request<{}, {}, {}, TProjectControllerListQuery>;
export type TProjectListResponse = Response<TProjectControllerListResponse & ErrorResponse>;
