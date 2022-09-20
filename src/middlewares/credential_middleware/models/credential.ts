import { Request } from 'express';
import { ICredentialDocument } from '../../../../database/models';

export type TCredentialMiddlewareRequest = Request & {
	credential: ICredentialDocument;
};
