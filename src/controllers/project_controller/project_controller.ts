import {
	TProjectCreateResponse,
	TProjectCreateRequest,
	TProjectUpdateRequest,
	TProjectUpdateResponse,
} from './models/project';
import { validation } from '../../libs/yup';
import { schema_project_create_body, schema_project_update_body } from './validators/project';
import mongoose from 'mongoose';
import { apiKeyRepository, projectRepository } from '../../../src/repositories';
import { ErrorNotFound } from '../../contants';

export class ProjectController {
	@validation({ schema_body: schema_project_create_body })
	async create(req: TProjectCreateRequest, res: TProjectCreateResponse) {
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

	@validation({ schema_body: schema_project_update_body })
	async update(req: TProjectUpdateRequest, res: TProjectUpdateResponse) {
		const { project_id } = req.params;
		const { project_name, project_domain } = req.body;

		const project_existed = await projectRepository.detail({ project_id, is_deleted: false });
		const api_key_existed = await apiKeyRepository.detail({ project_id, is_deleted: false });

		if (!project_existed || !api_key_existed) {
			throw new ErrorNotFound();
		}

		const session = await mongoose.startSession();
		await session.startTransaction();
		try {
			const project = await projectRepository.update({ project_id, project_name, project_domain }, session);
			const api_key = await apiKeyRepository.update({ id: api_key_existed.id, project_domain });
			if (!project || !api_key) {
				throw new ErrorNotFound();
			}
			await session.commitTransaction();
			await session.endSession();

			return res.status(200).json({ project, api_key: api_key?.id });
		} catch (e) {
			await session.abortTransaction();
			await session.endSession();
			throw e;
		}
	}
}
