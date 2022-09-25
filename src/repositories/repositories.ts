import { CredentialRepository } from './credential_repository';
import { UserRepository } from './user_repository';
import { CourseRepository } from './course_repository';
import { ApiKeyRepository } from './api_key_repository';
import { ProjectRepository } from './project_repository';

export const credentialRepository = new CredentialRepository();
export const userRepository = new UserRepository();
export const courseRepository = new CourseRepository();
export const apiKeyRepository = new ApiKeyRepository();
export const projectRepository = new ProjectRepository();
