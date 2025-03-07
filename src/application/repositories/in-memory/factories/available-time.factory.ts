import {
  AvailableTimeEntity,
  AvailableTimeProps,
} from '@/anterprise/entity/available-time.entity'
import { UniqueEntityUUID } from '@/shared/enterprise/entities/value-objects/unique-entity-uuid/unique-entity-uuid'
import { faker } from '@faker-js/faker'

export function availabletimeFactory(
  override: Partial<AvailableTimeProps.Props> = {},
  id?: UniqueEntityUUID,
) {
  const availabletime = AvailableTimeEntity.create(
    {
      name: faker.lorem.word(),
      userId: new UniqueEntityUUID(),
      ...override,
    },
    id,
  )

  return availabletime
}
