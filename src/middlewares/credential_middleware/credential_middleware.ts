import { Request, Response, NextFunction } from 'express';
import { ErrorNotFound } from '../../contants/errors';
import { credentialRepository } from '../../repositories';
import { verifyAccessToken } from '../../libs/jwt';
import { getAccessToken, setCredentialRequest } from './utils/credential';

export class CredentialMiddleware {
	async verify(req: Request, res: Response, next: NextFunction) {
		const access_token = getAccessToken(req);

		const access_token_payload = verifyAccessToken(access_token);

		const credential = await credentialRepository.detail({ id: access_token_payload.id });

		if (!credential) {
			throw new ErrorNotFound();
		}

		setCredentialRequest(req, credential);
		next();
	}
}
