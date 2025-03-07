import { ServiceEntity } from '@/anterprise/entity/service.entity'
import { Pagination } from '@/shared/enterprise/repository/types/pagination'
import { PrismaService } from '@/shared/infrastructure/database/prisma/prisma.service'

import { ServiceRepository } from '../service.repository'
import { ServicePrismaMapper } from './mappers/service-prisma.mapper'

export class PrismaServiceRepository implements ServiceRepository {
  constructor(private readonly prismaService: PrismaService) {}

  async findById(id: string): Promise<ServiceEntity | null> {
    const service = await this.prismaService.service.findUnique({
      where: { id },
    })

    if (!service) {
      return null
    }

    return ServicePrismaMapper.toDomain(service)
  }

  async findMany({ page }: Pagination.Params): Promise<ServiceEntity[]> {
    const services = await this.prismaService.service.findMany({
      take: 20,
      skip: (page - 1) * 20,
      orderBy: { createdAt: 'desc' },
    })

    return services.map(ServicePrismaMapper.toDomain)
  }

  async findManyByUserId(
    userId: string,
    { page }: Pagination.Params,
  ): Promise<ServiceEntity[]> {
    const services = await this.prismaService.service.findMany({
      where: { userId },
      take: 20,
      skip: (page - 1) * 20,
      orderBy: { createdAt: 'desc' },
    })

    return services.map(ServicePrismaMapper.toDomain)
  }

  async findManyByCategoryId(
    categoryId: string,
    { page }: Pagination.Params,
  ): Promise<ServiceEntity[]> {
    const services = await this.prismaService.service.findMany({
      where: { categoryId },
      take: 20,
      skip: (page - 1) * 20,
      orderBy: { createdAt: 'desc' },
    })

    return services.map(ServicePrismaMapper.toDomain)
  }

  async create(entity: ServiceEntity): Promise<void> {
    const data = ServicePrismaMapper.toPrisma(entity)

    await this.prismaService.service.create({ data })
  }

  async update(entity: ServiceEntity): Promise<void> {
    const data = ServicePrismaMapper.toPrisma(entity)

    await this.prismaService.service.update({
      where: {
        id: data.id,
      },
      data,
    })
  }

  async delete(entity: ServiceEntity): Promise<void> {
    await this.prismaService.service.delete({
      where: {
        id: entity.id.toString(),
      },
    })
  }
}
