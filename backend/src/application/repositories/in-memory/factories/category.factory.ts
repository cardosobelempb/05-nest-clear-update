import { CategoryEntity, CategoryEntityProps } from '@/anterprise/entity/category.entity'
import { UniqueEntityUUID } from '@core'
import { faker } from '@faker-js/faker'

export function categoryFactory(
  override: Partial<CategoryEntityProps.Props> = {},
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
