import { ICredentialDocument } from '../../../../database/models';
import { TAuthMiddlewareRequest } from '../models/auth';
import { Request } from 'express';
import { ErrorUnauthorized } from '../../../contants/errors';

export function setCredentialRequest(req: Request, credential: ICredentialDocument): void {
	const new_req = req as TAuthMiddlewareRequest;

	new_req.auth = credential;
}

export function getAccessToken(req: Request): string {
	const { authorization } = req.headers;

	const access_token = authorization?.replace('Bearer ', '');

	if (!access_token) {
		throw new ErrorUnauthorized();
	}

	return access_token;
}
