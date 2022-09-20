import { validation } from '../../libs/yup';
import { schema_course_create_body } from './validators/course';
import { TCourseCreateRequest, TCourseCreateResponse } from './models/course';
import mongoose from 'mongoose';
import { courseKeyRepository, courseRepository } from '../../repositories';

export class CourseController {
	@validation({ schema_body: schema_course_create_body })
	async create(req: TCourseCreateRequest, res: TCourseCreateResponse) {
		const { course_content, course_name } = req.body;
		const session = await mongoose.startSession();
		await session.startTransaction();

		try {
			const course = await courseRepository.create({ course_name, course_content }, session);
			const course_key = await courseKeyRepository.create({ course_id: course.id, course_name }, session);

			res.status(201).json({
				course,
				course_id: course_key.id,
			});

			await session.commitTransaction();
			await session.endSession();
		} catch (e) {
			await session.abortTransaction();
			await session.endSession();
			throw e;
		}
	}
}
