import { Request, Response } from 'express';
import { ErrorResponse } from 'src/contants';

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
export type TAuthLoginResponse = Response<TAuthControllerLoginResponse | ErrorResponse>;
