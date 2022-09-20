import { ICredentialDocument } from '../../../../database/models';
import { TCredentialMiddlewareRequest } from '../models/credential';
import { Request } from 'express';
import { ErrorUnauthorized } from '../../../contants/errors';

export function setCredentialRequest(req: Request, credential: ICredentialDocument): void {
	const new_req = req as TCredentialMiddlewareRequest;

	new_req.credential = credential;
}

export function getAccessToken(req: Request): string {
	const { authorization } = req.headers;

	const access_token = authorization?.replace('Bearer ', '');

	if (!access_token) {
		throw new ErrorUnauthorized();
	}

	return access_token;
}
