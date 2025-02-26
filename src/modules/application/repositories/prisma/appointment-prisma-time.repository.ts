import { AppointmentTimeEntity } from '@/modules/anterprise/entity/appointment-time.entity'
import { Pagination } from '@/shared/enterprise/repository/types/pagination'
import { PrismaService } from '@/shared/infrastructure/database/prisma/prisma.service'
import { AppointmentTimeRepository } from '../appointmen-time.repository'
import { AppointmentTimePrismaMapper } from './mappers/appointment-prisma-mapper-time.mapper'

export class AppointmentPrismaTimeRepository
  implements AppointmentTimeRepository
{
  constructor(private readonly prisma: PrismaService) {}

  async findByName(name: string): Promise<AppointmentTimeEntity | null> {
    const appointmenTime = await this.prisma.appointmentTime.findFirst({
      where: { name },
    })
    if (!appointmenTime) {
      return null
    }

    return AppointmentTimePrismaMapper.toDomain(appointmenTime)
  }

  async findById(id: string): Promise<AppointmentTimeEntity | null> {
    const appointmenTime = await this.prisma.appointmentTime.findUnique({
      where: { id },
    })
    if (!appointmenTime) return null

    return AppointmentTimePrismaMapper.toDomain(appointmenTime)
  }

  async findMany(params: Pagination.Params): Promise<AppointmentTimeEntity[]> {
    const appointmentTimes = await this.prisma.appointmentTime.findMany()

    if (!appointmentTimes) return []

    return []
  }

  async create({ name }: AppointmentTimeEntity): Promise<void> {
    throw new Error('Method not implemented.')
  }

  update(entity: AppointmentTimeEntity): Promise<void> {
    throw new Error('Method not implemented.')
  }

  delete(entity: AppointmentTimeEntity): Promise<void> {
    throw new Error('Method not implemented.')
  }
}
