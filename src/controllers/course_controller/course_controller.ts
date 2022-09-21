import { validation } from '../../libs/yup';
import { schema_course_create_body } from './validators/course';
import { TCourseCreateRequest, TCourseCreateResponse } from './models/course';
import mongoose from 'mongoose';
import { courseRepository } from '../../repositories';

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
}
