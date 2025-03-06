import {
  NotificationEntity,
  NotificationProps,
} from '@/modules/anterprise/entity/notification.entity'
import { UniqueEntityUUID } from '@/shared/enterprise/entities/value-objects/unique-entity-uuid/unique-entity-uuid'
import { faker } from '@faker-js/faker'
export function notificationFactory(
  override: Partial<NotificationProps.Props> = {},
  id?: UniqueEntityUUID,
) {
  const notification = NotificationEntity.create(
    {
      recipientId: new UniqueEntityUUID(),
      title: faker.lorem.word(),
      content: faker.lorem.text(),
      ...override,
    },
    id,
  )

  return notification
}
