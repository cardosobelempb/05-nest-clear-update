import { Entity, UniqueEntityUUID } from '@core'

export namespace CommentEntityProps {
  export interface Props {
    userId: UniqueEntityUUID
    content: string
    isActive: boolean
    createdAt: Date
    updatedAt?: Date | null
  }
}

export abstract class CommentEntity<
  Props extends CommentEntityProps.Props,
> extends Entity<Props> {
  get content() {
    return this.props.content
  }

  set content(content: string) {
    this.props.content = content
  }

  get userId() {
    return this.props.userId
  }

  get createdAt() {
    return this.props.createdAt
  }

  get updatedAt() {
    return this.props.updatedAt
  }

  get isActive() {
    return this.props.isActive
  }

  set isActive(isActive: boolean) {
    this.props.isActive = isActive
    this.touch()
  }

  private touch() {
    this.props.updatedAt = new Date()
  }
}
