import {
	TAuthLoginRequest,
	TAuthLoginResponse,
	TAuthRefreshTokenRequest,
	TAuthRefreshTokenResponse,
	TAuthRegisterRequest,
	TAuthRegisterResponse,
} from './models/auth';
import { credentialRepository, userRepository } from '../../repositories';
import { comparePassword } from '../../libs/bcrypt';
import { ErrorExisted, ErrorForbidden, ErrorNotFound, ErrorUnauthorized } from '../../contants';
import { signAccessToken, signRefreshToken, verifyRefreshToken } from '../../libs/jwt';
import { validation } from '../../libs/yup';
import { schema_auth_login_body, schema_auth_refresh_token_body, schema_auth_register_body } from './validators/auth';
import mongoose from 'mongoose';

export class AuthController {
	@validation({ schema_body: schema_auth_register_body })
	async register(req: TAuthRegisterRequest, res: TAuthRegisterResponse) {
		const { email, password } = req.body;

		const session = await mongoose.startSession();
		await session.startTransaction();

		const credential_existed = await credentialRepository.detail({ email });

		if (credential_existed) {
			throw new ErrorExisted();
		}

		try {
			const create_user = await userRepository.create({ email }, session);
			const create_credential = await credentialRepository.create(
				{ email, password, user_id: create_user.id },
				session,
			);

			res.status(201).json({
				credential: create_credential,
				user: create_user,
			});

			await session.commitTransaction();
			await session.endSession();
		} catch (e) {
			await session.abortTransaction();
			await session.endSession();
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

	@validation({ schema_body: schema_auth_refresh_token_body })
	async refreshToken(req: TAuthRefreshTokenRequest, res: TAuthRefreshTokenResponse) {
		const { refresh_token } = req.body;

		const { id } = verifyRefreshToken(refresh_token);

		const credential = await credentialRepository.detail({ id });

		if (!credential) {
			throw new ErrorForbidden();
		}

		const access_token = signAccessToken(credential);

		res.status(201).json({
			access_token,
		});
	}
}
