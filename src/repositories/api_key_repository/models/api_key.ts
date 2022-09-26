export interface IApiKeyRepositoryCreateParams {
	project_id: string;
	project_domain: string;
}
export interface IApiKeyRepositoryDetailParams {
	project_id: string;
	is_deleted: boolean;
}
export interface IApiKeyRepositoryUpdateParams {
	id: string;
	project_domain: string;
}
export interface IApiKeyRepositoryDeleteParams {
	id: string;
}

export interface IApiKeyRepositoryListParams {
	is_deleted: boolean;
}
