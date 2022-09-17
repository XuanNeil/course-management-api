import mongoose, { Schema } from 'mongoose';

interface ICredentialDocument {
	id: string;
	email: string;
	password: string;
	user_id: string;
	is_deleted: boolean;
	created_at: Date;
	updated_at: Date;
}

const CredentialSchema = new Schema<ICredentialDocument>({
	id: {
		type: String,
		required: true,
	},
	email: {
		type: String,
		required: true,
	},
	password: {
		type: String,
		required: true,
	},
	user_id: {
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

const CredentialModel = mongoose.model<ICredentialDocument>(
	'Credential',
	CredentialSchema,
);

export { CredentialSchema, CredentialModel, ICredentialDocument };
