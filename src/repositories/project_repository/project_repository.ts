import {
	IProjectRepositoryCreateParams,
	IProjectRepositoryDetailParams,
	IProjectRepositoryUpdateParams,
} from './models/project';
import { ClientSession, Schema, Types } from 'mongoose';
import { IProjectDocument, ProjectModel } from '../../../database/models';

export class ProjectRepository {
	async create(_params: IProjectRepositoryCreateParams, _session: ClientSession | null): Promise<IProjectDocument> {
		const { project_name, project_domain } = _params;
		const project = new ProjectModel({
			project_id: new Types.ObjectId(),
			project_name,
			project_domain,
		});
		await project.save({ session: _session });
		return project;
	}

	async detail(
		_params: IProjectRepositoryDetailParams,
		_session: ClientSession | null = null,
	): Promise<IProjectDocument> {
		const { project_id, is_deleted } = _params;
		return ProjectModel.findOne({ project_id, is_deleted }).session(_session).lean();
	}

	async update(
		_params: IProjectRepositoryUpdateParams,
		_session: ClientSession | null,
	): Promise<IProjectDocument | null> {
		const { project_id, project_name, project_domain } = _params;
		return ProjectModel.findOneAndUpdate(
			{ project_id },
			{ project_name, project_domain, updated_at: Date.now() },
			{ new: true },
		).session(_session);
	}
}
