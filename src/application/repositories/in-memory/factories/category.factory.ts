import {
  CategoryEntity,
  CategoryProps,
} from '@/anterprise/entity/category.entity'
import { UniqueEntityUUID } from '@/shared/enterprise/entities/value-objects/unique-entity-uuid/unique-entity-uuid'
import { faker } from '@faker-js/faker'

export function categoryFactory(
  override: Partial<CategoryProps.Props> = {},
  id?: UniqueEntityUUID,
) {
  const category = CategoryEntity.create(
    {
      name: faker.lorem.word(),
      userId: new UniqueEntityUUID(),
      ...override,
    },
    id,
  )

  return category
}
