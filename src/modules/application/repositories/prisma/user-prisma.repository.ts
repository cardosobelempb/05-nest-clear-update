import { UserEntity } from '@/modules/anterprise/entity/user.entity'
import { Pagination } from '@/shared/enterprise/repository/types/pagination'
import { PrismaService } from '@/shared/infrastructure/database/prisma/prisma.service'

import { UserRepository } from '../user.repository'
import { UserPrismaMapper } from './mappers/user-prisma.mapper'

export class UserPrismaRepository implements UserRepository {
  constructor(private readonly prismaService: PrismaService) {}

  async findByName(name: string): Promise<UserEntity | null> {
    const user = await this.prismaService.user.findFirst({
      where: { name },
    })
    if (!user) {
      return null
    }

    return UserPrismaMapper.toDomain(user)
  }

  async findById(id: string): Promise<UserEntity | null> {
    const user = await this.prismaService.user.findUnique({
      where: { id },
    })
    if (!user) return null

    return UserPrismaMapper.toDomain(user)
  }

  async findByEmail(email: string): Promise<UserEntity | null> {
    const user = await this.prismaService.user.findUnique({
      where: { email },
    })
    if (!user) return null

    return UserPrismaMapper.toDomain(user)
  }

  async findMany({ page, perPage }: Pagination.Params): Promise<UserEntity[]> {
    const users = await this.prismaService.user.findMany({
      take: perPage,
      skip: (page - 1) * perPage,
      orderBy: {
        createdAt: 'desc',
      },
    })

    return users.map(UserPrismaMapper.toDomain)
  }

  async create(entity: UserEntity): Promise<void> {
    const data = UserPrismaMapper.toPrisma(entity)
    await this.prismaService.user.create({ data })
  }

  async update(entity: UserEntity): Promise<void> {
    const data = UserPrismaMapper.toPrisma(entity)
    await this.prismaService.user.update({
      where: {
        id: data.id,
      },
      data,
    })
  }

  async delete(entity: UserEntity): Promise<void> {
    const data = UserPrismaMapper.toPrisma(entity)
    await this.prismaService.user.delete({
      where: {
        id: data.id,
      },
    })
  }
}
