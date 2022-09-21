import { ClientSession, Types } from 'mongoose';
import { CourseModel, ICourseDocument } from '../../../database/models';
import { ICourseRepositoryCreateParams } from './models/course';

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
}
