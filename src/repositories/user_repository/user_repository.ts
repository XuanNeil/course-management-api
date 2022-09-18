import { IUserRepositoryCreateParams } from 'src/repositories/user_repository/models/user';
import { ClientSession, Types } from 'mongoose';
import { IUserDocument, UserModel } from '../../../database/models';

export class UserRepository {
	async create(_params: IUserRepositoryCreateParams, _session: ClientSession | null = null): Promise<IUserDocument> {
		const user = new UserModel({
			id: new Types.ObjectId(),
			email: _params.email,
		});
		return await user.save({ session: _session });
	}
}
