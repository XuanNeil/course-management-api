import { ICredentialDocument, IUserDocument } from './models';
import { hashPassword } from '../src/libs/bcrypt';

export const user: Omit<
	IUserDocument,
	'is_deleted' | 'created_at' | 'updated_at'
>[] = [
	{
		id: '630f12f1aa7c72551995cee9',
		email: 'admin01@gmail.com',
	},
	{
		id: '430f12f1aa1c72551995cee3',
		email: 'dev.haxuan@gmail.com',
	},
	{
		id: '130f1201ag7c72552001cee1',
		email: 'admin02@gmail.com',
	},
];

export const credential: Omit<
	ICredentialDocument,
	'is_deleted' | 'created_at' | 'updated_at'
>[] = [
	{
		id: '130x12f0aa7c72551995ced1',
		email: 'admin01@gmail.com',
		password: hashPassword('PASSWORD'),
		user_id: '630f12f1aa7c72551995cee9',
	},
	{
		id: '830f12f0aa7d72551995ced2',
		email: 'dev.haxuan@gmail.com',
		password: hashPassword('PASSWORD03'),
		user_id: '430f12f1aa1c72551995cee3',
	},
	{
		id: '330f12f0aa7d92551995ceg2',
		email: 'admin02@gmail.com',
		password: hashPassword('PASSWORD25'),
		user_id: '130f1201ag7c72552001cee1',
	},
];
