import { Request, Response, NextFunction } from 'express';
import { ErrorNotFound } from '../../contants/errors';
import { credentialRepository } from '../../repositories';
import { verifyAccessToken } from '../../libs/jwt';
import { getAccessToken, setCredentialRequest } from './utils/credential';

export class CredentialMiddleware {
	async verify(req: Request, res: Response, next: NextFunction) {
		const access_token = getAccessToken(req);

		const { id } = verifyAccessToken(access_token);

		const credential = await credentialRepository.detail({ id });

		if (!credential) {
			throw new ErrorNotFound();
		}

		setCredentialRequest(req, credential);
		next();
	}
}
