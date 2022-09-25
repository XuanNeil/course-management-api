import * as yup from 'yup';

export const schema_project_create_body = yup.object().shape({
	project_name: yup.string().required(),
	project_domain: yup.string().url().required(),
});
