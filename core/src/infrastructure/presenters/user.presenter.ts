import { UserEntity } from '../../anterprise/entity/user.entity'

export class UserPresenter {
  static toHTTP(user: UserEntity) {
    return {
      id: user.id.toString(),
      name: user.name,
      email: user.email,
      phone: user.phone,
      isActive: user.isActive,
      createdAt: user.createdAt,
      updatedAt: user.updatedAt,
    }
  }
}
