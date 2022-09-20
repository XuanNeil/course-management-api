import mongoose, { Schema } from 'mongoose';

interface ICourseDocument {
	id: string;
	course_name: string;
	course_content: string;
	is_delete: boolean;
	created_at: Date;
	update_at: Date;
}

const CourseSchema = new Schema<ICourseDocument>({
	id: {
		type: String,
		required: true,
	},
	course_name: {
		type: String,
		required: true,
	},
	course_content: {
		type: String,
		required: true,
	},
	is_delete: {
		type: Boolean,
		required: true,
		default: false,
	},
	created_at: {
		type: Date,
		required: true,
		default: Date.now,
	},
	update_at: {
		type: Date,
		required: true,
		default: Date.now,
	},
});
const CourseModel = mongoose.model<ICourseDocument>('Course', CourseSchema);

export { ICourseDocument, CourseSchema, CourseModel };
