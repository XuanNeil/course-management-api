import bcrypt from 'bcryptjs';
import { configs } from '../../configs';

// Auto-gen a salt and hash:
export function hashPassword(password: string): string {
	return bcrypt.hashSync(password, configs.hash_code);
}

// To check a password:
export function comparePassword(
	password: string,
	hashPassword: string,
): boolean {
	return bcrypt.compareSync(password, hashPassword);
}
