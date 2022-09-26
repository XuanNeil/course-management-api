export interface IProjectRepositoryCreateParams {
	project_name: string;
	project_domain: string;
}
export interface IProjectRepositoryDetailParams {
	project_id: string;
	is_deleted: boolean;
}
export interface IProjectRepositoryUpdateParams {
	project_id: string;
	project_name: string;
	project_domain: string;
}
export interface IProjectRepositoryDeleteParams {
	project_id: string;
}
export interface IProjectRepositoryListParams {
	is_deleted?: boolean;
	take?: number;
	skip?: number;
}
export interface IProjectRepositoryCountParams {
	is_deleted: boolean;
}
