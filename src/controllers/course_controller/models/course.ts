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
export interface TCourseControllerDetailResponse extends ICourseDocument {}

export type TCourseDetailRequest = Request<TCourseControllerDetailParams>;
export type TCourseDetailResponse = Response<TCourseControllerDetailResponse & ErrorResponse>;
