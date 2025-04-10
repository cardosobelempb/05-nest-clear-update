import { UserEntity, UserProps } from '@/anterprise/entity/user.entity'
import { PrismaService } from '@/shared/infrastructure/database/prisma/prisma.service'
import { UniqueEntityUUID } from '@core'
import { faker } from '@faker-js/faker'
import { Injectable } from '@nestjs/common'

import { UserPrismaMapper } from '../../prisma/mappers/user-prisma.mapper'

export function userFactory(
  override: Partial<UserProps.Props> = {},
  id?: UniqueEntityUUID,
) {
  const user = UserEntity.create(
    {
      name: faker.lorem.word(),
      email: faker.internet.email(),
      phone: faker.phone.number(),
      password: faker.internet.password(),
      ...override,
    },
    id,
  )

  return user
}

@Injectable()
export class UserFactory {
  constructor(private readonly ptisma: PrismaService) { }

  async create(data: Partial<UserProps.Props> = {}): Promise<UserEntity> {
    const user = userFactory(data)

    await this.ptisma.user.create({
      data: UserPrismaMapper.toPrisma(user)
    })

    return user
  }
}
