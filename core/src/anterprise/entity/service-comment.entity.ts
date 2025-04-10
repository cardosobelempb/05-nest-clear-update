import { Optional, UniqueEntityUUID } from "../../shared/enterprise"
import { Service } from "../../shared/types"
import { CommentEntity } from "./comment.entity"

export class ServiceCommnetEntity extends CommentEntity<Service.Comment> {
  get serviceId() {
    return this.props.serviceId
  }
  get commentId() {
    return this.props.commentId
  }

  static create(
    props: Optional<
      Service.Comment,
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
