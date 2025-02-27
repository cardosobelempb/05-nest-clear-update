import { AvailableTimeEntity } from '@/modules/anterprise/entity/available-time.entity'
import { Pagination } from '@/shared/enterprise/repository/types/pagination'
import { PrismaService } from '@/shared/infrastructure/database/prisma/prisma.service'
import { AvailableTimeRepository } from '../available-time.repository'
import { AvailableTimePrismaMapper } from './mappers/available-prisma-mapper-time.mapper'

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

  async findMany({ page }: Pagination.Params): Promise<AvailableTimeEntity[]> {
    const perPage = 20
    const availableTimes = await this.prisma.availableTime.findMany({
      take: perPage,
      skip: (page - 1) * perPage,
      orderBy: {
        createdAt: 'desc',
      },
    })

    return availableTimes.map(availableTime =>
      AvailableTimePrismaMapper.toDomain(availableTime),
    )
  }

  async create(entity: AvailableTimeEntity): Promise<void> {
    const data = AvailableTimePrismaMapper.toPrisma(entity)
    await this.prisma.user.findUnique({
      where: {
        id: data.userId,
      },
    })
    await this.prisma.availableTime.create({ data })
  }

  update(entity: AvailableTimeEntity): Promise<void> {
    throw new Error('Method not implemented.')
  }

  delete(entity: AvailableTimeEntity): Promise<void> {
    throw new Error('Method not implemented.')
  }
}
