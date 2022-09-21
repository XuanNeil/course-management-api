import { CredentialRepository } from './credential_repository';
import { UserRepository } from './user_repository';
import { CourseRepository } from './course_repository';

export const credentialRepository = new CredentialRepository();
export const userRepository = new UserRepository();
export const courseRepository = new CourseRepository();
