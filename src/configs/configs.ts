export const configs = {
	port: process.env.PORT || 3000,
	hash_code: Number(process.env.HASH_CODE) || 8,
	jwt: {
		access_token_key: process.env.ACCESS_TOKEN_KEY || 'ACCESS_SECRET_KEY',
		refresh_token_key: process.env.REFRESH_TOKEN_KEY || 'REFRESH_SECRET_KEY',
		options_access: { expiresIn: process.env.ACCESS_TOKEN_LIFE || '24h' },
		options_refresh: { expiresIn: process.env.REFRESH_TOKEN_LIFE || '24h' },
	},
};
