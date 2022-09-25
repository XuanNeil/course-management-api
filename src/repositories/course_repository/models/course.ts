export interface ICourseRepositoryCreateParams {
	course_type?: string;
	course_name: string;
	course_content: string;
}
export interface ICourseRepositoryListParams {
	take?: number;
	skip?: number;
	is_deleted?: boolean;
}
export interface ICourseRepositoryCountParams {
	is_deleted?: boolean;
}
export interface ICourseRepositoryDetailParams {
	course_id: string;
	is_deleted: boolean;
}
export interface ICourseRepositoryUpdateParams {
	course_id: string;
	course_type: string;
	course_name: string;
	course_content: string;
}
export interface ICourseRepositoryDeleteParams {
	course_id: string;
}
