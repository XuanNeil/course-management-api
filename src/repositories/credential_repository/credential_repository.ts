import {
	ICredentialRepositoryDetailParams,
	ICredentialQuery,
} from 'src/repositories/credential_repository/models/credential';
import { ClientSession } from 'mongoose';
import { CredentialModel, ICredentialDocument } from '../../../database/models';

export class CredentialRepository {
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
