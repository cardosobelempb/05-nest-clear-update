import { CategoryEntity, UniqueEntityUUID } from '@core'
import { Category as EntityMapper, Prisma } from '@prisma/client'

export class CategoryPrismaMapper {
  static toDomain(raw: EntityMapper): CategoryEntity {
    return CategoryEntity.create(
      {
        name: raw.name,
        userId: raw.userId,
        isActive: raw.isActive,
        createdAt: raw.createdAt,
        updatedAt: raw.updatedAt,
      },
      new UniqueEntityUUID(raw.id),
    )
  }

  static toPrisma(entity: CategoryEntity): Prisma.CategoryUncheckedCreateInput {
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
