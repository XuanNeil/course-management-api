import {
	TProjectCreateResponse,
	TProjectCreateRequest,
	TProjectUpdateRequest,
	TProjectUpdateResponse,
	TProjectDeleteRequest,
	TProjectDeleteResponse,
	TProjectListRequest,
	TProjectListResponse,
	TProjectDetailRequest,
	TProjectDetailResponse,
} from './models/project';
import { validation } from '../../libs/yup';
import { schema_project_create_body, schema_project_update_body } from './validators/project';
import mongoose from 'mongoose';
import { apiKeyRepository, projectRepository } from '../../../src/repositories';
import { ErrorNotFound } from '../../contants';
import { ProjectRepository } from 'src/repositories/project_repository';
import { projectRouters } from 'src/routers/project_router';

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

	async delete(req: TProjectDeleteRequest, res: TProjectDeleteResponse) {
		const { project_id } = req.params;

		const project_existed = await projectRepository.detail({ project_id, is_deleted: false });
		const api_key_existed = await apiKeyRepository.detail({ project_id, is_deleted: false });

		if (!project_existed || !api_key_existed) {
			throw new ErrorNotFound();
		}

		const session = await mongoose.startSession();
		await session.startTransaction();

		try {
			await projectRepository.delete({ project_id }, session);
			await apiKeyRepository.delete({ id: api_key_existed.id }, session);

			await session.commitTransaction();
			await session.endSession();

			return res.status(200).json({ message: 'Delete Project Successfully' });
		} catch (e) {
			await session.abortTransaction();
			await session.endSession();
			throw e;
		}
	}

	async list(req: TProjectListRequest, res: TProjectListResponse) {
		const { page = 1, page_size = 20 } = req.query;

		const take = Number(page_size);
		const skip = (Number(page) - 1) * Number(page_size);

		const projects = await projectRepository.list({ take, skip, is_deleted: false });
		const api_keys = await apiKeyRepository.list({ is_deleted: false });

		const project_api_key = projects.map((project) => {
			const api_key = api_keys.find((key) => key.project_id === project.project_id);

			if (api_key) {
				return {
					...project,
					api_key: api_key.id,
				};
			}

			return project;
		});

		const total_project = await projectRepository.count({ is_deleted: false });
		const total_page = Math.ceil(total_project / Number(page_size));

		return res.status(200).json({ items: project_api_key, paging: { page, page_size, total_page } });
	}

	async detail(req: TProjectDetailRequest, res: TProjectDetailResponse) {
		const { project_id } = req.params;
		const project = await projectRepository.detail({ project_id, is_deleted: false });
		const api_key = await apiKeyRepository.detail({ project_id, is_deleted: false });

		if (!project || !api_key) {
			throw new ErrorNotFound();
		}

		return res.status(200).json({ ...project, api_key: api_key.id });
	}
}
