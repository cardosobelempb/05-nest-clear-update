import { Entity } from "../../shared/enterprise/entities/entity"
import { Attachment } from "../../types/attachment"

export class AttachmentEntity<
  Props extends Attachment.Props,
> extends Entity<Props> {
  get name() {
    return this.props.name
  }

  set name(name: string) {
    this.props.name = name
  }

  get link() {
    return this.props.link
  }

  set link(link: string) {
    this.props.link = link
  }

  get isActive() {
    return this.props.isActive
  }

  set isActive(isActive: boolean) {
    this.props.isActive = isActive
  }

  get createdAt() {
    return this.props.createdAt
  }

  get updatedAt() {
    return this.props.updatedAt
  }

  private touch() {
    this.props.updatedAt = new Date()
  }
}
