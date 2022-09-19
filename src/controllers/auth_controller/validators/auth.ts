import * as yup from 'yup';

// register_body
export const schema_auth_register_body = yup.object().shape({
	email: yup.string().email().required(),
	password: yup.string().min(8).required(),
});

// login_body
export const schema_auth_login_body = yup.object().shape({
	email: yup.string().email().required(),
	password: yup.string().min(8).required(),
});

// refresh_token_body
export const schema_auth_refresh_token_body = yup.object().shape({
	refresh_token: yup.string().required(),
});
