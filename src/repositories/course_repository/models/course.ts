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
