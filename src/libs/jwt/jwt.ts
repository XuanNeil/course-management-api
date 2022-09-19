import jwt from 'jsonwebtoken';
import { configs } from '../../../src/configs';
import { ICredentialDocument } from '../../../database/models';
import { ErrorUnauthorized } from '../../../src/contants';

interface IAccessTokenPayload extends Omit<ICredentialDocument, 'password'> {}

interface IAccessTokenVerify {
	payload: IAccessTokenPayload;
}

export interface IRefreshTokenPayload {
	id: string;
}

export interface IRefreshTokenVerify {
	payload: IRefreshTokenPayload;
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

export function verifyAccessToken(access_token: string): IAccessTokenPayload {
	const { access_token_key } = configs.jwt;
	try {
		const data = jwt.verify(access_token, access_token_key) as IAccessTokenVerify;
		return data.payload;
	} catch (e) {
		throw new ErrorUnauthorized();
	}
}

export function verifyRefreshToken(refresh_token: string): IRefreshTokenPayload {
	const { refresh_token_key } = configs.jwt;
	try {
		const data = jwt.verify(refresh_token, refresh_token_key) as IRefreshTokenVerify;
		return data.payload;
	} catch (e) {
		throw new ErrorUnauthorized();
	}
}
