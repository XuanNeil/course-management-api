import jwt from 'jsonwebtoken';
import { configs } from '../../../src/configs';
import { ICredentialDocument } from '../../../database/models';

interface IAccessTokenPayload extends Omit<ICredentialDocument, 'password'> {}
export interface IRefreshTokenPayload {
	id: string;
}

export function signAccessToken(payload: IAccessTokenPayload): string {
	const {
		access_token_key,
		options_access: { expiresIn },
	} = configs.jwt;
	return jwt.sign({ payload }, access_token_key, { expiresIn });
}

export function signRefreshToken(payload: IRefreshTokenPayload): string {
	const {
		refresh_token_key,
		options_refresh: { expiresIn },
	} = configs.jwt;
	return jwt.sign({ payload }, refresh_token_key, { expiresIn });
}
