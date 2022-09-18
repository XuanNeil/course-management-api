/* eslint-disable @typescript-eslint/no-explicit-any */
import { safeValidate } from './safe_validate';
import { NextFunction, Request, Response } from 'express';
import { ObjectSchema } from 'yup';
import { ErrorsMessage } from '../../../src/contants';

type ISchema = {
	schema_params?: ObjectSchema<any>;
	schema_body?: ObjectSchema<any>;
	schema_query?: ObjectSchema<any>;
};

export function validation(schema: ISchema) {
	return function (target: any, propertyKey: string, descriptor: PropertyDescriptor) {
		const original = descriptor.value;

		descriptor.value = function (req: Request, res: Response, next: NextFunction) {
			const { schema_body, schema_params, schema_query } = schema || {};

			if (schema_params) {
				const result = safeValidate(schema_params, req.params);

				if (!result.success) {
					return res.status(422).json({
						message: ErrorsMessage.ERROR_FORMAT_PARAMS,
						errors: result.errors,
					});
				}

				req.params = schema_params.cast(req.params);
			}

			if (schema_body) {
				const result = safeValidate(schema_body, req.body);

				if (!result.success) {
					return res.status(422).json({
						message: ErrorsMessage.ERROR_FORMAT_BODY,
						errors: result.errors,
					});
				}

				req.body = schema_body.cast(req.body);
			}

			if (schema_query) {
				const result = safeValidate(schema_query, req.query);

				if (!result.success) {
					return res.status(422).json({
						message: ErrorsMessage.ERROR_FORMAT_QUERY,
						errors: result.errors,
					});
				}

				req.query = schema_query.cast(req.query);
			}

			return original.apply(this, [req, res, next]);
		};

		return descriptor;
	};
}
