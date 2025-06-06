import { PrismaService } from '@/shared/infrastructure/database/prisma/prisma.service'
import { AvailableTimeEntity, Pagination } from '@core'

import { AvailableTimeRepository } from '../available-time.repository'
import { AvailableTimePrismaMapper } from './mappers/available-time-prisma.mapper'

export class AvailableTimePrismaRepository implements AvailableTimeRepository {
  constructor(
    private readonly prismaService: PrismaService
  ) { }

  async findByName(time: string): Promise<AvailableTimeEntity | null> {
    const availableTime = await this.prismaService.availableTime.findFirst({
      where: { time},
    })

    console.log('AvailableTimePrismaRepository =>', availableTime)
    if (!availableTime) {
      return null
    }

    return AvailableTimePrismaMapper.toDomain(availableTime)
  }

  async findById(id: string): Promise<AvailableTimeEntity | null> {
    const availableTime = await this.prismaService.availableTime.findUnique({
      where: { id },
    })
    if (!availableTime) return null

    return AvailableTimePrismaMapper.toDomain(availableTime)
  }

  async findMany({ page }: Pagination.Params): Promise<AvailableTimeEntity[]> {
    const availableTimes = await this.prismaService.availableTime.findMany({
      take: 20,
      skip: (page - 1) * 20,
      orderBy: {
        time: 'asc',
      },
    })

    return availableTimes.map(AvailableTimePrismaMapper.toDomain)
  }

  async create(entity: AvailableTimeEntity): Promise<void> {
    const data = AvailableTimePrismaMapper.toPrisma(entity)
    await this.prismaService.availableTime.create({ data })
  }

  async update(entity: AvailableTimeEntity): Promise<void> {
    const data = AvailableTimePrismaMapper.toPrisma(entity)
    await this.prismaService.availableTime.update({
      where: {
        id: data.id,
      },
      data,
    })
  }

  async delete(entity: AvailableTimeEntity): Promise<void> {
    await this.prismaService.availableTime.delete({
      where: {
        id: entity.id.toString(),
      },
    })
  }
}
