import { Request, Response } from 'express';
import { ICourseDocument } from 'database/models';
import { ErrorResponse } from 'src/contants';

// type create course
export type TCourseControllerCreateBody = {
	course_type: string;
	course_name: string;
	course_content: string;
};
export type ICourseControllerCreateResponse = {
	course: ICourseDocument;
};
export type TCourseCreateRequest = Request<{}, {}, TCourseControllerCreateBody>;

export type TCourseCreateResponse = Response<ICourseControllerCreateResponse | ErrorResponse>;

// type list course
export type TCourseControllerListQuery = {
	page?: number;
	page_size?: number;
};
export type TPaging = {
	page?: number;
	page_size?: number;
	total_page?: number;
};
export type TCourseControllerListResponse = {
	courses: ICourseDocument[];
	paging: TPaging;
};
export type TCourseListRequest = Request<{}, {}, {}, TCourseControllerListQuery>;
export type TCourseListResponse = Response<TCourseControllerListResponse & ErrorResponse>;

// type detail
export type TCourseControllerDetailParams = {
	course_id: string;
};
export interface TCourseControllerDetailResponse {
	course: ICourseDocument;
}

export type TCourseDetailRequest = Request<TCourseControllerDetailParams>;
export type TCourseDetailResponse = Response<TCourseControllerDetailResponse & ErrorResponse>;

// type update
export type TCourseControllerUpdateBody = {
	course_type: string;
	course_name: string;
	course_content: string;
};
export type TCourseControllerUpdateParams = {
	course_id: string;
};
export type TCourseControllerUpdateResponse = {
	course: ICourseDocument;
};
export type TCourseUpdateRequest = Request<TCourseControllerUpdateParams, {}, TCourseControllerUpdateBody>;
export type TCourseUpdateResponse = Response<TCourseControllerUpdateResponse & ErrorResponse>;

// type delete
export type TCourseControllerDeleteParams = {
	course_id: string;
};
export type TCourseControllerDeleteResponse = {};
export type TCourseDeleteRequest = Request<TCourseControllerDeleteParams>;
export type TCourseDeleteResponse = Response<TCourseControllerDeleteResponse & ErrorResponse>;
