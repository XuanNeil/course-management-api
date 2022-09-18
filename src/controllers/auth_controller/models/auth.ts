import { Request, Response } from 'express';
import { ErrorResponse } from 'src/contants';
import { ICredentialDocument, IUserDocument } from 'database/models';

// type login
type TAuthControllerLoginBody = {
	email: string;
	password: string;
};

type TAuthControllerLoginResponse = {
	credential?: {
		access_token: string;
		refresh_token: string;
	};
};
export type TAuthLoginRequest = Request<{}, {}, TAuthControllerLoginBody>;
export type TAuthLoginResponse = Response<TAuthControllerLoginResponse & ErrorResponse>;

// type register
type TAuthControllerRegisterResponse = {
	credential?: ICredentialDocument;
	user?: IUserDocument;
};
export type TAuthRegisterRequest = Request<{}, {}, TAuthControllerLoginBody>;
export type TAuthRegisterResponse = Response<TAuthControllerRegisterResponse & ErrorResponse>;
