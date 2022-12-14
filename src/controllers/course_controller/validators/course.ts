import * as yup from 'yup';

export const schema_course_create_body = yup.object().shape({
	course_type: yup.string(),
	course_name: yup.string().required(),
	course_content: yup.string().required(),
});

export const schema_course_update_body = yup.object().shape({
	course_type: yup.string(),
	course_name: yup.string().required(),
	course_content: yup.string().required(),
});
