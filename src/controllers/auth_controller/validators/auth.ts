import * as yup from 'yup';

export const schema_auth_login_body = yup.object().shape({
	email: yup.string().email().required(),
	password: yup.string().min(8).required(),
});
