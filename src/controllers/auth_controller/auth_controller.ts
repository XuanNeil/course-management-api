import { TAuthLoginRequest, TAuthLoginResponse, TAuthRegisterRequest, TAuthRegisterResponse } from './models/auth';
import { credentialRepository, userRepository } from '../../repositories';
import { comparePassword } from '../../libs/bcrypt';
import { ErrorExisted, ErrorNotFound, ErrorUnauthorized } from '../../contants';
import { signAccessToken, signRefreshToken } from '../../libs/jwt';
import { validation } from '../../libs/yup';
import { schema_auth_login_body, schema_auth_register_body } from './validators/auth';

export class AuthController {
	@validation({ schema_body: schema_auth_register_body })
	async register(req: TAuthRegisterRequest, res: TAuthRegisterResponse) {
		const { email, password } = req.body;

		const credential_existed = await credentialRepository.detail({ email });

		if (credential_existed) {
			throw new ErrorExisted();
		}

		try {
			const create_user = await userRepository.create({ email });
			const create_credential = await credentialRepository.create({ email, password, user_id: create_user.id });

			res.status(201).json({
				credential: create_credential,
				user: create_user,
			});
		} catch (e) {
			throw e;
		}
	}

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
