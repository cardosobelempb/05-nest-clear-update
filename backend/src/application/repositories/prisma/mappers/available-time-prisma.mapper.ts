import { AvailableTimeEntity } from '@/anterprise/entity/available-time.entity'
import { UniqueEntityUUID } from '@/shared/enterprise/entities/value-objects/unique-entity-uuid/unique-entity-uuid'
import { Prisma, AvailableTime as PrismaAvailableTime } from '@prisma/client'

export class AvailableTimePrismaMapper {
  static toDomain(raw: PrismaAvailableTime): AvailableTimeEntity {
    return AvailableTimeEntity.create(
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
    entity: AvailableTimeEntity,
  ): Prisma.AvailableTimeUncheckedCreateInput {
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
