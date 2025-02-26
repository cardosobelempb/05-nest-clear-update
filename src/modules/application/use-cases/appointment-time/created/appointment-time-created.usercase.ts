import { AppointmentTimeEntity } from '@/modules/anterprise/entity/appointment-time.entity'
import { AppointmentPrismaTimeRepository } from '@/modules/application/repositories/prisma/appointment-prisma-time.repository'
import { ConflictException } from '@nestjs/common'

export class AppointmentTimeCreatedUseCase {
  constructor(
    private readonly appointmentPrismaTimeRespository: AppointmentPrismaTimeRepository,
  ) {}

  async execute(entity: AppointmentTimeEntity): Promise<void> {
    const appointmentTimeName =
      await this.appointmentPrismaTimeRespository.findByName(entity.name)

    if (appointmentTimeName) {
      throw new ConflictException('Time with name already exists.')
    }

    this.appointmentPrismaTimeRespository.create(entity)
  }
}
