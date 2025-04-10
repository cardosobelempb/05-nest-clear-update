import { UniqueEntityUUID, UserEntity } from '@core'
import { Prisma, User as UserMapper } from '@prisma/client'

export class UserPrismaMapper {
  static toDomain(raw: UserMapper): UserEntity {
    return UserEntity.create(
      {
        name: raw.name,
        email: raw.email,
        password: raw.password,
        phone: raw.phone,
        isActive: raw.isActive,
        createdAt: raw.createdAt,
        updatedAt: raw.updatedAt,
      },
      new UniqueEntityUUID(raw.id),
    )
  }

  static toPrisma(entity: UserEntity): Prisma.UserUncheckedCreateInput {
    return {
      id: entity.id.toString(),
      name: entity.name,
      email: entity.email,
      phone: entity.phone,
      password: entity.password,
      isActive: entity.isActive,
      createdAt: entity.createdAt,
      updatedAt: entity.updatedAt,
    }
  }
}
