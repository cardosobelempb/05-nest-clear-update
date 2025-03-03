import { AvailableTimeEntity } from '@/modules/anterprise/entity/available-time.entity'
import { Pagination } from '@/shared/enterprise/repository/types/pagination'
import { PrismaService } from '@/shared/infrastructure/database/prisma/prisma.service'

import { AvailableTimeRepository } from '../available-time.repository'
import { AvailableTimePrismaMapper } from './mappers/available-time-prisma.mapper'

export class AvailablePrismaTimeRepository implements AvailableTimeRepository {
  constructor(private readonly prisma: PrismaService) {}

  async findByName(name: string): Promise<AvailableTimeEntity | null> {
    const availableTime = await this.prisma.availableTime.findFirst({
      where: { name },
    })
    if (!availableTime) {
      return null
    }

    return AvailableTimePrismaMapper.toDomain(availableTime)
  }

  async findById(id: string): Promise<AvailableTimeEntity | null> {
    const availableTime = await this.prisma.availableTime.findUnique({
      where: { id },
    })
    if (!availableTime) return null

    return AvailableTimePrismaMapper.toDomain(availableTime)
  }

  async findMany({
    page,

  }: Pagination.Params): Promise<AvailableTimeEntity[]> {
    const availableTimes = await this.prisma.availableTime.findMany({
      take: 20,
      skip: (page - 1) * 20,
      orderBy: {
        name: 'asc',
      },
    })

    return availableTimes.map(AvailableTimePrismaMapper.toDomain)
  }

  async create(entity: AvailableTimeEntity): Promise<void> {
    const data = AvailableTimePrismaMapper.toPrisma(entity)
    await this.prisma.availableTime.create({ data })
  }

  async update(entity: AvailableTimeEntity): Promise<void> {
    const data = AvailableTimePrismaMapper.toPrisma(entity)
    await this.prisma.availableTime.update({
      where: {
        id: data.id,
      },
      data,
    })
  }

  async delete(entity: AvailableTimeEntity): Promise<void> {
    const data = AvailableTimePrismaMapper.toPrisma(entity)
    await this.prisma.availableTime.delete({
      where: {
        id: data.id,
      },
    })
  }
}
