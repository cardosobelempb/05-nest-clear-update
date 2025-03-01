import { UserEntity } from '@/modules/anterprise/entity/user.entity'
import { RepositoryAbstract } from '@/shared/enterprise/repository/repository.abstract'

export abstract class UserRepository extends RepositoryAbstract<UserEntity> {
  abstract findByEmail(email: string): Promise<UserEntity | null>
}
