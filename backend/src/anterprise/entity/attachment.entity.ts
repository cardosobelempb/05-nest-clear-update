import { Entity } from '@/shared/enterprise/entities/entity'

export namespace AttachmentProps {
  export interface Props {
    name: string
    link: string
    isActive: boolean
    createdAt: Date
    updatedAt?: Date | null
  }
}
export class AttachmentEntity<
  Props extends AttachmentProps.Props,
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
