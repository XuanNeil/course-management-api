import { CredentialRepository } from './credential_repository';
import { UserRepository } from './user_repository';
import { CourseKeyRepository } from './course_key_repository';
import { CourseRepository } from './course_repository';

export const credentialRepository = new CredentialRepository();
export const userRepository = new UserRepository();
export const courseKeyRepository = new CourseKeyRepository();
export const courseRepository = new CourseRepository();
