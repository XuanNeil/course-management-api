import { model, Schema } from 'mongoose';

export interface IProjectDocument {
	project_id: string;
	project_name: string;
	project_domain: string;
	is_deleted: boolean;
	created_at: Date;
	updated_at: Date;
}
export const ProjectSchema = new Schema<IProjectDocument>({
	project_id: {
		type: String,
		required: true,
	},
	project_name: {
		type: String,
		required: true,
	},
	project_domain: {
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
export const ProjectModel = model<IProjectDocument>('Project', ProjectSchema);
