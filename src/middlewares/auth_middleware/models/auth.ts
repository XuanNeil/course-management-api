import { Request } from 'express';
import { ICredentialDocument } from '../../../../database/models';

export type TAuthMiddlewareRequest = Request & {
	auth: ICredentialDocument;
};
