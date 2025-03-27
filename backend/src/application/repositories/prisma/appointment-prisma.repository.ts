import { PrismaService } from '@/shared/infrastructure/database/prisma/prisma.service'
import { AppointmentEntity, Pagination } from '@core'

import { AppointmentRepository } from '../appointmen.repository'
import { AppointmentPrismaMapper } from './mappers/appointment-prisma.mapper'

export class AppointmentPrismaRepository implements AppointmentRepository {
  constructor(private readonly prismaService: PrismaService) {}

  async findById(id: string): Promise<AppointmentEntity | null> {
    const appointment = await this.prismaService.appointment.findUnique({
      where: {
        id,
      },
    })

    if (!appointment) {
      return null
    }

    return AppointmentPrismaMapper.toDomain(appointment)
  }

  async findMany({ page }: Pagination.Params): Promise<AppointmentEntity[]> {
    const appointments = await this.prismaService.appointment.findMany({
      take: 20,
      skip: (page - 1) * 20,
      orderBy: {
        createdAt: 'desc',
      },
    })
    return appointments.map(AppointmentPrismaMapper.toDomain)
  }

  async findManyByAvailableTimeId(
    availableTimeId: string,
    { page }: Pagination.Params,
  ): Promise<AppointmentEntity[]> {
    const appointments = await this.prismaService.appointment.findMany({
      where: {
        availableTimeId,
      },
      take: 20,
      skip: (page - 1) * 20,
      orderBy: {
        createdAt: 'desc',
      },
    })
    return appointments.map(AppointmentPrismaMapper.toDomain)
  }

  async findManyByServiceId(
    serviceId: string,
    { page }: Pagination.Params,
  ): Promise<AppointmentEntity[]> {
    const appointments = await this.prismaService.appointment.findMany({
      where: {
        serviceId,
      },
      take: 20,
      skip: (page - 1) * 20,
      orderBy: {
        createdAt: 'desc',
      },
    })
    return appointments.map(AppointmentPrismaMapper.toDomain)
  }

  async findManyByUserId(
    userId: string,
    { page }: Pagination.Params,
  ): Promise<AppointmentEntity[]> {
    const appointments = await this.prismaService.appointment.findMany({
      where: {
        userId,
      },
      take: 20,
      skip: (page - 1) * 20,
      orderBy: {
        createdAt: 'desc',
      },
    })
    return appointments.map(AppointmentPrismaMapper.toDomain)
  }

  async create(entity: AppointmentEntity): Promise<void> {
    const data = AppointmentPrismaMapper.toPrisma(entity)
    await this.prismaService.appointment.create({ data })
  }

  async update(entity: AppointmentEntity): Promise<void> {
    const data = AppointmentPrismaMapper.toPrisma(entity)
    await this.prismaService.appointment.update({
      where: {
        id: entity.id.toString(),
      },
      data,
    })
  }

  async delete(entity: AppointmentEntity): Promise<void> {
    await this.prismaService.appointment.delete({
      where: {
        id: entity.id.toString(),
      },
    })
  }
}
