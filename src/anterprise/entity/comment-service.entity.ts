import { UniqueEntityUUID } from '@/shared/enterprise/entities/value-objects/unique-entity-uuid/unique-entity-uuid'
import { Optional } from '@prisma/client/runtime/library'
import { CommentEntity, CommentEntityProps } from './comment.entity'

export namespace CommentServiceEntityProps {
  export interface Props extends CommentEntityProps.Props {
    serviceId: UniqueEntityUUID
  }
}

export class CommentServiceEntity extends CommentEntity<CommentServiceEntityProps.Props> {
  get serviceId() {
    return this.props.serviceId
  }

  static create(
    props: Optional<
      CommentServiceEntityProps.Props,
      'createdAt' | 'updatedAt' | 'isActive'
    >,
    id?: UniqueEntityUUID,
  ) {
    const commentService = new CommentServiceEntity(
      {
        ...props,
        isActive: props.isActive ?? true,
        createdAt: props.createdAt ?? new Date(),
      },
      id,
    )

    return commentService
  }
}
