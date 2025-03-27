import { AppointmentEntity, UniqueEntityUUID } from '@core'
import { Appointment as AppointmentMapper, Prisma } from '@prisma/client'

export class AppointmentPrismaMapper {
  static toDomain(raw: AppointmentMapper): AppointmentEntity {
    return AppointmentEntity.create(
      {
        status: raw.status,
        userId: new UniqueEntityUUID(raw.userId),
        availableTimeId: new UniqueEntityUUID(raw.availableTimeId),
        serviceId: new UniqueEntityUUID(raw.serviceId),
        isActive: raw.isActive,
        createdAt: raw.createdAt,
        updatedAt: raw.updatedAt,
      },
      new UniqueEntityUUID(raw.id),
    )
  }

  static toPrisma(entity: AppointmentEntity): Prisma.AppointmentUncheckedCreateInput {
    return {
      id: entity.id.toString(),
      status: entity.status,
      userId: entity.userId.toString(),
      availableTimeId: entity.availableTimeId?.toString(),
      serviceId: entity.serviceId?.toString(),
      isActive: entity.isActive,
      createdAt: entity.createdAt,
      updatedAt: entity.updatedAt,
    }
  }
}
