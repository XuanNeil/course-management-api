import {
	IApiKeyRepositoryCreateParams,
	IApiKeyRepositoryDetailParams,
	IApiKeyRepositoryUpdateParams,
} from './models/api_key';
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

	async detail(
		_params: IApiKeyRepositoryDetailParams,
		_session: ClientSession | null = null,
	): Promise<IApiKeyDocument | null> {
		const { project_id, is_deleted } = _params;
		return ApiKeyModel.findOne({ project_id, is_deleted }).session(_session).lean();
	}

	async update(
		_params: IApiKeyRepositoryUpdateParams,
		_session: ClientSession | null = null,
	): Promise<IApiKeyDocument | null> {
		const { id, project_domain } = _params;
		return ApiKeyModel.findOneAndUpdate({ id }, { project_domain, updated_at: Date.now() }, { new: true })
			.session(_session)
			.lean();
	}
}
