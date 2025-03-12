import { UniqueEntityUUID } from '@/shared/enterprise/entities/value-objects/unique-entity-uuid/unique-entity-uuid'
import { Optional } from '@prisma/client/runtime/library'
import { CommentEntity, CommentEntityProps } from './comment.entity'

export namespace CommentServiceEntityProps {
  export interface Props extends CommentEntityProps.Props {
    serviceId: UniqueEntityUUID
    commentId: UniqueEntityUUID
  }
}

export class ServiceCommnetEntity extends CommentEntity<CommentServiceEntityProps.Props> {
  get serviceId() {
    return this.props.serviceId
  }
  get commentId() {
    return this.props.commentId
  }

  static create(
    props: Optional<
      CommentServiceEntityProps.Props,
      'createdAt' | 'updatedAt' | 'isActive'
    >,
    id?: UniqueEntityUUID,
  ) {
    const serviceComment = new ServiceCommnetEntity(
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
