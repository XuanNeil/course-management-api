import { ClientSession, Types } from 'mongoose';
import { CourseModel, ICourseDocument } from '../../../database/models';
import {
	ICourseRepositoryCountParams,
	ICourseRepositoryCreateParams,
	ICourseRepositoryDeleteParams,
	ICourseRepositoryDetailParams,
	ICourseRepositoryListParams,
	ICourseRepositoryUpdateParams,
} from './models/course';

export class CourseRepository {
	async create(_params: ICourseRepositoryCreateParams, _session: ClientSession | null): Promise<ICourseDocument> {
		const course = new CourseModel({
			course_id: new Types.ObjectId(),
			course_type: _params.course_type,
			course_name: _params.course_name,
			course_content: _params.course_content,
		});

		await course.save({ session: _session });
		return course;
	}

	async list(_params: ICourseRepositoryListParams, _session: ClientSession | null = null): Promise<ICourseDocument[]> {
		const where: any = {};

		const { take, skip, is_deleted } = _params;
		if (is_deleted !== undefined) {
			where.is_deleted = is_deleted;
		}
		return CourseModel.find(where, {}, { limit: take, skip: skip }).session(_session).lean();
	}

	async count(_params: ICourseRepositoryCountParams, _session: ClientSession | null = null): Promise<number> {
		const where: any = {};
		if (_params.is_deleted !== undefined) {
			where.is_deleted = _params.is_deleted;
		}
		return CourseModel.count(where).session(_session).lean();
	}

	async detail(
		_params: ICourseRepositoryDetailParams,
		_session: ClientSession | null = null,
	): Promise<ICourseDocument> {
		const where = {
			course_id: _params.course_id,
			is_deleted: _params.is_deleted,
		};
		return CourseModel.findOne(where).session(_session).lean();
	}

	async update(
		_params: ICourseRepositoryUpdateParams,
		_session: ClientSession | null = null,
	): Promise<ICourseDocument | null> {
		const { course_id, course_type, course_name, course_content } = _params;

		return CourseModel.findOneAndUpdate(
			{ course_id },
			{ course_type, course_name, course_content, updated_at: Date.now() },
			{ new: true },
		).session(_session);
	}

	async delete(
		_params: ICourseRepositoryDeleteParams,
		_session: ClientSession | null,
	): Promise<ICourseDocument | null> {
		const { course_id } = _params;
		return CourseModel.findOneAndUpdate(
			{ course_id },
			{ is_deleted: true, updated_at: Date.now() },
			{ new: true },
		).session(_session);
	}
}
