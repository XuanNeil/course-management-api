import { IProjectRepositoryCreateParams } from './models/project';
import { ClientSession, Types } from 'mongoose';
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
}
