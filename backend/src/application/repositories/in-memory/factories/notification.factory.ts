import { NotificationEntity, NotificationProps } from '@/anterprise/entity/notification.entity'
import { UniqueEntityUUID } from '@core'
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
