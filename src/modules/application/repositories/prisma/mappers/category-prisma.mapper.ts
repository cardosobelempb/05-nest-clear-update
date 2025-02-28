import { CategoryEntity } from '@/modules/anterprise/entity/category.entity'
import { UniqueEntityUUID } from '@/shared/enterprise/entities/value-objects/unique-entity-uuid/unique-entity-uuid'
import { Prisma, Category as EntityMapper } from '@prisma/client'

export class CategoryPrismaMapper {
  static toDomain(raw: EntityMapper): CategoryEntity {
    return CategoryEntity.create(
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
