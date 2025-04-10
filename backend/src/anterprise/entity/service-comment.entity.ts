import { Optional, UniqueEntityUUID } from '@core'

import { CommentEntity, CommentEntityProps } from './comment.entity'

export namespace ServiceCommentEntityProps {
  export interface Props extends CommentEntityProps.Props {
    serviceId: UniqueEntityUUID
    commentId: UniqueEntityUUID
  }
}

export class ServiceCommnetEntity extends CommentEntity<ServiceCommentEntityProps.Props> {
  get serviceId() {
    return this.props.serviceId
  }
  get commentId() {
    return this.props.commentId
  }

  static create(
    props: Optional<
      ServiceCommentEntityProps.Props,
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
