/* eslint-disable @typescript-eslint/no-explicit-any */

import type { ObjectSchema, ValidationError } from 'yup';

type RemoveIndex<T> = {
	[P in keyof T as string extends P ? never : number extends P ? never : P]: T[P];
};

type ObjectSchemaType<T extends ObjectSchema<any>> = T extends ObjectSchema<infer O> ? O : never;

export type ErrorType<T extends ObjectSchema<any>> = T extends ObjectSchema<any>
	? { [key in keyof RemoveIndex<ObjectSchemaType<T>>]?: { message: string } }
	: never;

export function formatError<SchemaType extends ObjectSchema<any>>(error: ValidationError): ErrorType<SchemaType> {
	if (!error.inner) {
		if (process.env.NODE_ENV === 'development') {
			// eslint-disable-next-line no-console
			console.warn(`error object has no inner property`, error);
		}
		throw new Error('validation system error');
	}

	const errorObj: { [key: string]: { message: string } } = {};
	error.inner.forEach((err) => {
		if (err.path && err.message) {
			errorObj[err.path] = { message: err.message };
		}
	});
	return errorObj as ErrorType<SchemaType>;
}
