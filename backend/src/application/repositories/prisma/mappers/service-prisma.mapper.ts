import { ServiceEntity, UniqueEntityUUID } from '@core'
import { Prisma, Service as ServiceMapper } from '@prisma/client'

export class ServicePrismaMapper {
  static toDomain(raw: ServiceMapper): ServiceEntity {
    return ServiceEntity.create(
      {
        name: raw.name,
        price: Number(raw.price),
        duration: raw.duration,
        categoryId: raw.categoryId
          ? new UniqueEntityUUID(raw.categoryId)
          : null,
        userId: new UniqueEntityUUID(raw.userId),
        isActive: raw.isActive,
        createdAt: raw.createdAt,
        updatedAt: raw.updatedAt,
      },
      new UniqueEntityUUID(raw.id),
    )
  }

  static toPrisma(entity: ServiceEntity): Prisma.ServiceUncheckedCreateInput {
    return {
      id: entity.id.toString(),
      name: entity.name,
      price: entity.price,
      duration: entity.duration,
      userId: entity.userId.toString(),
      isActive: entity.isActive,
      createdAt: entity.createdAt,
      updatedAt: entity.updatedAt,
    }
  }
}
