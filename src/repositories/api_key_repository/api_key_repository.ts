import { IApiKeyRepositoryCreateParams } from './models/api_key';
import { ClientSession, Types } from 'mongoose';
import { ApiKeyModel, IApiKeyDocument } from '../../../database/models';

export class ApiKeyRepository {
	async create(_params: IApiKeyRepositoryCreateParams, _session: ClientSession | null): Promise<IApiKeyDocument> {
		const { project_id, project_domain } = _params;
		const api_key = new ApiKeyModel({
			id: new Types.ObjectId(),
			project_id,
			project_domain,
		});
		await api_key.save({ session: _session });
		return api_key;
	}
}
