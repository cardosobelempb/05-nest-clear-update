import { UniqueEntityUUID } from '@/shared/enterprise/entities/value-objects/unique-entity-uuid/unique-entity-uuid'
import { Optional } from '@prisma/client/runtime/library'
import { CommentEntity, CommentEntityProps } from './comment.entity'

export namespace ServiceCommentEntityProps {
  export interface Props extends CommentEntityProps.Props {
    serviceId: UniqueEntityUUID
  }
}

export class ServiceCommentEntity extends CommentEntity<ServiceCommentEntityProps.Props> {
  get serviceId() {
    return this.props.serviceId
  }

  static create(
    props: Optional<
      ServiceCommentEntityProps.Props,
      'createdAt' | 'updatedAt' | 'isActive'
    >,
    id?: UniqueEntityUUID,
  ) {
    const serviceComment = new ServiceCommentEntity(
      {
        ...props,
        isActive: props.isActive ?? true,
        createdAt: props.createdAt ?? new Date(),
      },
      id,
    )

    return serviceComment
  }
}
