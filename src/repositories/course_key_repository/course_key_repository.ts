import { ICourseKeyRepositoryCreateParams } from './models/course_key';
import { ClientSession, Types } from 'mongoose';
import { CourseKeyModel, ICourseKeyDocument } from '../../../database/models';

export class CourseKeyRepository {
	async create(_params: ICourseKeyRepositoryCreateParams, _session: ClientSession | null): Promise<ICourseKeyDocument> {
		const course_key = new CourseKeyModel({
			id: new Types.ObjectId(),
			course_id: _params.course_id,
			course_name: _params.course_name,
		});

		await course_key.save({ session: _session });
		return course_key;
	}
}
