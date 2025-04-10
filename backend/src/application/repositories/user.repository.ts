import { RepositoryAbstract, UserEntity } from "@core";

export abstract class UserRepository extends RepositoryAbstract<UserEntity> {
  abstract findByEmail(email: string): Promise<UserEntity | null>
}
