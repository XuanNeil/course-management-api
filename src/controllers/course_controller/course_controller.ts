import { validation } from '../../libs/yup';
import { schema_course_create_body, schema_course_update_body } from './validators/course';
import {
	TCourseCreateRequest,
	TCourseCreateResponse,
	TCourseDetailRequest,
	TCourseDetailResponse,
	TCourseListRequest,
	TCourseListResponse,
	TCourseUpdateRequest,
	TCourseUpdateResponse,
} from './models/course';
import mongoose from 'mongoose';
import { courseRepository } from '../../repositories';
import { ErrorNotFound } from '../../contants/errors';

export class CourseController {
	@validation({ schema_body: schema_course_create_body })
	async create(req: TCourseCreateRequest, res: TCourseCreateResponse) {
		const { course_type, course_content, course_name } = req.body;

		const session = await mongoose.startSession();
		await session.startTransaction();

		try {
			const course = await courseRepository.create({ course_type, course_name, course_content }, session);

			res.status(201).json({ course });

			await session.commitTransaction();
			await session.endSession();
		} catch (e) {
			await session.abortTransaction();
			await session.endSession();
			throw e;
		}
	}

	async list(req: TCourseListRequest, res: TCourseListResponse) {
		const { page = 1, page_size = 20 } = req.query;

		const take = Number(page_size);
		const skip = (Number(page) - 1) * Number(page_size);

		const courses = await courseRepository.list({ take, skip, is_deleted: false });
		const total_course = await courseRepository.count({ is_deleted: false });
		const total_page = Math.ceil(total_course / Number(page_size));

		return res.status(200).json({
			courses,
			paging: {
				page,
				page_size,
				total_page,
			},
		});
	}

	async detail(req: TCourseDetailRequest, res: TCourseDetailResponse) {
		const { course_id } = req.params;
		const course = await courseRepository.detail({ course_id, is_deleted: false });

		if (!course) {
			throw new ErrorNotFound();
		}

		return res.status(200).json({ course });
	}

	@validation({ schema_body: schema_course_update_body })
	async update(req: TCourseUpdateRequest, res: TCourseUpdateResponse) {
		const { course_type, course_name, course_content } = req.body;
		const { course_id } = req.params;

		const course_existed = await courseRepository.detail({ course_id, is_deleted: false });

		if (!course_existed) {
			throw new ErrorNotFound();
		}

		const session = await mongoose.startSession();
		await session.startTransaction();

		try {
			const course = await courseRepository.update({ course_id, course_type, course_name, course_content });

			if (!course) {
				throw new ErrorNotFound();
			}

			res.status(200).json({ course });

			await session.commitTransaction();
			await session.endSession();
		} catch (e) {
			await session.abortTransaction();
			await session.endSession();
			throw e;
		}
	}
}
