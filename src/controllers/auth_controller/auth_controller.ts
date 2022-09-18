import { TAuthLoginRequest, TAuthLoginResponse } from './models/auth';
import { credentialRepository } from '../../repositories';
import { comparePassword } from '../../libs/bcrypt';
import { ErrorNotFound, ErrorUnauthorized } from '../../contants';
import { signAccessToken, signRefreshToken } from '../../libs/jwt';
import { validation } from '../../libs/yup';
import { schema_auth_login_body } from './validators/auth';

export class AuthController {
	@validation({ schema_body: schema_auth_login_body })
	async login(req: TAuthLoginRequest, res: TAuthLoginResponse) {
		const { email, password } = req.body;
		const credential = await credentialRepository.detail({ email });

		if (!credential) {
			throw new ErrorNotFound();
		}

		const { password: user_password, id, ...credential_rest } = credential;
		const check_password = comparePassword(password, user_password);

		if (!check_password) {
			throw new ErrorUnauthorized();
		}

		const access_token = signAccessToken({ id, ...credential_rest });
		const refresh_token = signRefreshToken({ id });

		res.status(200).json({
			credential: {
				access_token,
				refresh_token,
			},
		});
	}
}
