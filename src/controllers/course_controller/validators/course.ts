import * as yup from 'yup';

export const schema_course_create_body = yup.object().shape({
	course_id: yup.string().required(),
	course_name: yup.string().required(),
});
