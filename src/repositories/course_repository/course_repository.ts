import { ClientSession, Types } from 'mongoose';
import { CourseModel, ICourseDocument } from '../../../database/models';
import { ICourseRepositoryCreateParams } from './models/course';

export class CourseRepository {
	async create(_params: ICourseRepositoryCreateParams, _session: ClientSession | null): Promise<ICourseDocument> {
		const course = new CourseModel({
			id: new Types.ObjectId(),
			course_name: _params.course_name,
			course_content: _params.course_content,
		});

		await course.save({ session: _session });
		return course;
	}
}
