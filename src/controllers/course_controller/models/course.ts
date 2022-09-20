import { Request, Response } from 'express';
import { ICourseDocument } from 'database/models';
import { ErrorResponse } from 'src/contants';

// type create course
export type TCourseControllerCreateBody = {
	course_name: string;
	course_content: string;
};
export type ICourseControllerCreateResponse = {
	course: ICourseDocument;
	course_id: string;
};
export type TCourseCreateRequest = Request<{}, {}, TCourseControllerCreateBody>;

export type TCourseCreateResponse = Response<ICourseControllerCreateResponse & ErrorResponse>;
