/* eslint-disable @typescript-eslint/no-explicit-any */

import { ObjectSchema } from 'yup';

import { ErrorType as TErrorType, formatError } from './format_error';

export type ErrorType<T extends ObjectSchema<any>> = TErrorType<T>;

interface SuccessType {
	success: true;
}

interface FailedType<S extends ObjectSchema<any>> {
	success: false;
	errors: ErrorType<S>;
}

export function safeValidate<S extends ObjectSchema<any>>(schema: S, data: any): SuccessType | FailedType<S> {
	try {
		schema.validateSync(data, { abortEarly: false });
		return {
			success: true,
		};
	} catch (error: any) {
		return {
			success: false,
			errors: formatError(error),
		};
	}
}
