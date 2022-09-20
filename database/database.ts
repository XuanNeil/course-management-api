import mongoose from 'mongoose';
import { CourseKeyModel, CourseModel, CredentialModel, UserModel } from './models';
import { credential, user } from './data';

export async function DBConnect() {
	return await mongoose.connect(process.env.DATABASE_URL as string).catch((err) => {
		console.log('connect mongoose error', err);
	});
}

export async function DBDisconnect() {
	return await mongoose.connection.close().catch((err) => {
		console.log('disconnect mongoose error', err);
	});
}

export const load = async () => {
	const session = await mongoose.startSession();
	await session.startTransaction();
	try {
		await CredentialModel.deleteMany().session(session);
		await UserModel.deleteMany().session(session);
		await CourseKeyModel.deleteMany().session(session);
		await CourseModel.deleteMany().session(session);

		await UserModel.insertMany(user, { session });
		await CredentialModel.insertMany(credential, { session });

		await session.commitTransaction();
		await session.endSession();
	} catch (e) {
		await session.abortTransaction();
		await session.endSession();
	}
};

export const remove = async () => {
	const session = await mongoose.startSession();
	await session.startTransaction();
	try {
		await CredentialModel.deleteMany().session(session);
		await UserModel.deleteMany().session(session);
		await CourseKeyModel.deleteMany().session(session);
		await CourseModel.deleteMany().session(session);

		await session.commitTransaction();
		await session.endSession();
	} catch (e) {
		await session.abortTransaction();
		await session.endSession();
	}
};
