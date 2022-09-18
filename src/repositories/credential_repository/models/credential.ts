export interface ICredential {
	email?: string;
	id?: string;
}

export interface ICredentialRepositoryDetailParams extends ICredential {}

export interface ICredentialQuery extends ICredential {}

export interface ICredentialRepositoryCreateParams {
	email: string;
	password: string;
	user_id: string;
}
