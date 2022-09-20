import * as yup from 'yup';

export const schema_course_create_body = yup.object().shape({
	course_name: yup.string().required(),
	course_content: yup.string().required(),
});
