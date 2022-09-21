import HttpStatusCodes from 'http-status-codes';

export type ErrorResponse = {
	message?: ErrorsMessage | string;
	errors?: IErrors;
};

export enum ErrorsMessage {
	ERROR_FORBIDDEN = 'ERROR FORBIDDEN',
	ERROR_UNAUTHORIZED = 'ERROR UNAUTHORIZED',
	ERROR_NOT_FOUND = 'ERROR NOT FOUND',
	ERROR_EXISTED = 'ERROR EXISTED',
	ERROR_FORMAT_PARAMS = 'ERROR FORMAT PARAMS',
	ERROR_FORMAT_BODY = 'ERROR FORMAT BODY',
	ERROR_FORMAT_QUERY = 'ERROR FORMAT QUERY',
	ERROR_BAD_REQUEST = 'ERROR BAD REQUEST',
}

interface IErrors {
	[key: string]: { message: string };
}

export class CustomError extends Error {
	public readonly status = HttpStatusCodes.BAD_REQUEST;
	public readonly response: ErrorResponse;

	constructor(message: string, status?: number, errors?: IErrors) {
		super(message);
		if (status != null) {
			this.status = status;
		}
		this.response = {
			message,
			...(errors ? { errors } : {}),
		};
	}
}

export class ErrorUnauthorized extends CustomError {
	constructor(errors?: IErrors) {
		super(ErrorsMessage.ERROR_UNAUTHORIZED, HttpStatusCodes.UNAUTHORIZED, errors);
	}
}

export class ErrorNotFound extends CustomError {
	constructor(errors?: IErrors) {
		super(ErrorsMessage.ERROR_NOT_FOUND, HttpStatusCodes.NOT_FOUND, errors);
	}
}

export class ErrorExisted extends CustomError {
	constructor(errors?: IErrors) {
		super(ErrorsMessage.ERROR_EXISTED, HttpStatusCodes.CONFLICT, errors);
	}
}

export class ErrorForbidden extends CustomError {
	constructor(errors?: IErrors) {
		super(ErrorsMessage.ERROR_FORBIDDEN, HttpStatusCodes.FORBIDDEN, errors);
	}
}
