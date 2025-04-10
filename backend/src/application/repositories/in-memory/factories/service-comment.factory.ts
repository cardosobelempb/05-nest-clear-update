import { ServiceCommentEntityProps, ServiceCommnetEntity } from '@/anterprise/entity/service-comment.entity'
import { UniqueEntityUUID } from '@core'
import { faker } from '@faker-js/faker'

export function serviceCommentFactory(
  override: Partial<ServiceCommentEntityProps.Props> = {},
  id?: UniqueEntityUUID,
) {
  const commentservice = ServiceCommnetEntity.create(
    {
      content: faker.lorem.word(),
      userId: new UniqueEntityUUID(),
      serviceId: new UniqueEntityUUID(),
      commentId: new UniqueEntityUUID(),
      ...override,
    },
    id,
  )

  return commentservice
}
