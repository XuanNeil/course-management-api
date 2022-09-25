import { TProjectCrateResponse, TProjectCreateRequest } from './models/project';
import { validation } from '../../libs/yup';
import { schema_project_create_body } from './validators/project';
import mongoose from 'mongoose';
import { apiKeyRepository, projectRepository } from '../../../src/repositories';

export class ProjectController {
	@validation({ schema_body: schema_project_create_body })
	async create(req: TProjectCreateRequest, res: TProjectCrateResponse) {
		const { project_name, project_domain } = req.body;

		const session = await mongoose.startSession();
		await session.startTransaction();

		try {
			const project = await projectRepository.create({ project_name, project_domain }, session);
			const api_key = await apiKeyRepository.create({ project_id: project.project_id, project_domain }, session);

			await session.commitTransaction();
			await session.endSession();

			return res.status(201).json({ project, api_key: api_key.id });
		} catch (e) {
			await session.abortTransaction();
			await session.endSession();
			throw e;
		}
	}
}
