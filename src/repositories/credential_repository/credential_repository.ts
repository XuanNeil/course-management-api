import {
	ICredentialRepositoryDetailParams,
	ICredentialQuery,
	ICredentialRepositoryCreateParams,
} from 'src/repositories/credential_repository/models/credential';
import { ClientSession, Types } from 'mongoose';
import { CredentialModel, ICredentialDocument } from '../../../database/models';
import { hashPassword } from '../../libs/bcrypt';

export class CredentialRepository {
	async create(
		_params: ICredentialRepositoryCreateParams,
		_session: ClientSession | null = null,
	): Promise<ICredentialDocument> {
		const credential = new CredentialModel({
			id: new Types.ObjectId(),
			email: _params.email.toLocaleLowerCase().trim(),
			password: hashPassword(_params.password),
			user_id: _params.user_id,
		});
		await credential.save({ session: _session });
		return credential;
	}

	async detail(
		_params: ICredentialRepositoryDetailParams,
		_session: ClientSession | null = null,
	): Promise<ICredentialDocument | null> {
		const query: ICredentialQuery = {};

		if (_params.email) {
			query.email = _params.email.toLocaleLowerCase().trim();
		}

		if (_params.id) {
			query.id = _params.id;
		}

		return CredentialModel.findOne(query).session(_session).lean();
	}
}
