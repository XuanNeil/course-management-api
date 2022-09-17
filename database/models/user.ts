import mongoose, { Schema } from 'mongoose';

// 1. Create an interface representing a document in MongoDB.
interface IUserDocument {
	id: string;
	email: string;
	is_deleted: boolean;
	created_at: Date;
	updated_at: Date;
}

// 2. Create a Schema corresponding to the document interface.
const UserSchema = new Schema<IUserDocument>({
	id: {
		type: String,
		required: true,
	},
	email: {
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

// 3. Create a Model.
const UserModel = mongoose.model<IUserDocument>('User', UserSchema);

export { UserSchema, UserModel, IUserDocument };
