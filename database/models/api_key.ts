import { model, Schema } from 'mongoose';

export interface IApiKeyDocument {
	id: string;
	project_id: string;
	project_domain: string;
	is_deleted: boolean;
	created_at: Date;
	updated_at: Date;
}
export const ApiKeySchema = new Schema<IApiKeyDocument>({
	id: {
		type: String,
		required: true,
	},
	project_id: {
		type: String,
		required: true,
	},
	project_domain: {
		type: String,
		required: true,
	},
	is_deleted: {
		type: Boolean,
		required: true,
		default: false,
	},
	created_at: {
		type: Date,
		required: true,
		default: Date.now,
	},
	updated_at: {
		type: Date,
		required: true,
		default: Date.now,
	},
});
export const ApiKeyModel = model<IApiKeyDocument>('ApiKey', ApiKeySchema);
