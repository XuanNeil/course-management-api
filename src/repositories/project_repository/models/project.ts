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
