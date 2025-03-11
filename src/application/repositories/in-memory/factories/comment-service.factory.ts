import {
  CommentServiceEntity,
  CommentServiceEntityProps,
} from '@/anterprise/entity/comment-service.entity'
import { UniqueEntityUUID } from '@/shared/enterprise/entities/value-objects/unique-entity-uuid/unique-entity-uuid'
import { faker } from '@faker-js/faker'

export function commentServiceFactory(
  override: Partial<CommentServiceEntityProps.Props> = {},
  id?: UniqueEntityUUID,
) {
  const commentservice = CommentServiceEntity.create(
    {
      content: faker.lorem.word(),
      userId: new UniqueEntityUUID(),
      serviceId: new UniqueEntityUUID(),
      ...override,
    },
    id,
  )

  return commentservice
}
