import { ServiceEntity, ServiceProps } from '@/anterprise/entity/service.entity'
import { UniqueEntityUUID } from '@/shared/enterprise/entities/value-objects/unique-entity-uuid/unique-entity-uuid'
import { faker } from '@faker-js/faker'

export function serviceFactory(
  override: Partial<ServiceProps.Props> = {},
  id?: UniqueEntityUUID,
) {
  const category = ServiceEntity.create(
    {
      name: faker.commerce.productName(),
      price: Number(faker.commerce.price()),
      duration: '08:00',
      categoryId: new UniqueEntityUUID(),
      userId: new UniqueEntityUUID(),
      attachments: [],
      ...override,
    },
    id,
  )

  return category
}
