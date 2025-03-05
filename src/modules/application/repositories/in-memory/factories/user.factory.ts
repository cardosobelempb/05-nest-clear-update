import { UserEntity, UserProps } from '@/modules/anterprise/entity/user.entity'
import { UniqueEntityUUID } from '@/shared/enterprise/entities/value-objects/unique-entity-uuid/unique-entity-uuid'
import { faker } from '@faker-js/faker'

export function userFactory(
  override: Partial<UserProps.Props> = {},
  id?: UniqueEntityUUID,
) {
  const user = UserEntity.create({
    name: faker.lorem.word(),
    email: faker.internet.email(),
    phone: faker.phone.number(),
    password: faker.internet.password(),
    ...override,
  }, id)

  return user
}
