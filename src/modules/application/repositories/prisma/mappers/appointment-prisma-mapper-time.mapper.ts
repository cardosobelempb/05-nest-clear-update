import { AppointmentTimeEntity } from '@/modules/anterprise/entity/appointment-time.entity'
import { UniqueEntityUUID } from '@/shared/enterprise/entities/value-objects/unique-entity-uuid/unique-entity-uuid'
import {
  AppointmentTime as PrismaAppointmentTime,
  Prisma,
} from '@prisma/client'

export class AppointmentTimePrismaMapper {
  static toDomain(raw: PrismaAppointmentTime): AppointmentTimeEntity {
    return AppointmentTimeEntity.create(
      {
        name: raw.name,
        userId: new UniqueEntityUUID(raw.userId),
        isActive: raw.isActive,
        createdAt: raw.createdAt,
        updatedAt: raw.updatedAt,
      },
      new UniqueEntityUUID(raw.id),
    )
  }

  static toPrisma(
    entity: AppointmentTimeEntity,
  ): Prisma.AppointmentTimeUncheckedCreateInput {
    return {
      id: entity.id.toString(),
      name: entity.name,
      userId: entity.userId.toString(),
      isActive: entity.isActive,
      createdAt: entity.createdAt,
      updatedAt: entity.updatedAt,
    }
  }
}
