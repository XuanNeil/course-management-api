import mongoose, { Schema } from 'mongoose';

export interface CourseType {
	FrontEnd: 'Front End';
	BackEnd: 'Back End';
	DevOps: 'DevOps';
	Blockchain: 'Blockchain';
}

interface ICourseDocument {
	course_id: string;
	course_type?: CourseType;
	course_name: string;
	course_content: string;
	is_deleted: boolean;
	created_at: Date;
	updated_at: Date;
}

const CourseSchema = new Schema<ICourseDocument>({
	course_id: {
		type: String,
		required: true,
	},
	course_type: {
		type: String,
		required: true,
		default: 'Front End',
	},
	course_name: {
		type: String,
		required: true,
	},
	course_content: {
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
const CourseModel = mongoose.model<ICourseDocument>('Course', CourseSchema);

export { ICourseDocument, CourseSchema, CourseModel };
