import mongoose, { Schema } from 'mongoose';

interface ICourseKeyDocument {
	id: string;
	course_id: string;
	course_name: string;
	is_deleted: boolean;
	created_at: Date;
	updated_at: Date;
}

const CourseKeySchema = new Schema<ICourseKeyDocument>({
	id: {
		type: String,
		required: true,
	},
	course_id: {
		type: String,
		required: true,
	},
	course_name: {
		type: String,
		required: true,
	},
	is_deleted: {
		type: Boolean,
		required: true,
		default: false,
	},
	created_at: {
		type: Date,
		required: true,
		default: Date.now,
	},
	updated_at: {
		type: Date,
		required: true,
		default: Date.now,
	},
});

const CourseKeyModel = mongoose.model<ICourseKeyDocument>('CourseKey', CourseKeySchema);

export { ICourseKeyDocument, CourseKeySchema, CourseKeyModel };
