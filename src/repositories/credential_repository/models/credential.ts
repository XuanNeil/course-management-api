export interface ICredential {
	email?: string;
	id?: string;
}

export interface ICredentialRepositoryDetailParams extends ICredential {}

export interface ICredentialQuery extends ICredential {}
