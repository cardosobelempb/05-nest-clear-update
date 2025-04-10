import { AggregateRoot, Optional, UniqueEntityUUID } from "../../shared/enterprise"
import { Service } from "../../shared/types"
import { ServiceAttachmentListEntity } from "./service-attachment-list.entity"

export class ServiceEntity extends AggregateRoot<Service.Props> {
  get name() {
    return this.props.name
  }

  set name(name: string) {
    this.props.name = name
  }

  get price() {
    return this.props.price
  }

  set price(price: number) {
    this.props.price = price
  }

  get duration() {
    return this.props.duration
  }

  set duration(duration: string) {
    this.props.duration = duration
  }

  get userId() {
    return this.props.userId
  }

  get categoryId(): UniqueEntityUUID | null | undefined {
    return this.props.categoryId
  }

  set categoryId(categoryId: UniqueEntityUUID | null) {
    this.props.categoryId = categoryId
  }

  get isActive() {
    return this.props.isActive
  }

  set isActive(isActive: boolean) {
    this.props.isActive = isActive
  }

  get attachments() {
    return this.props.attachments
  }

  set attachments(attachments: ServiceAttachmentListEntity) {
    this.props.attachments = attachments
    this.touch()
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

  static create(
    props: Optional<
      Service.Props,
      'createdAt' | 'updatedAt' | 'isActive' | 'attachments'
    >,
    id?: UniqueEntityUUID,
  ) {
    const Service = new ServiceEntity(
      {
        ...props,
        isActive: props.isActive ?? true,
        attachments: props.attachments ?? new ServiceAttachmentListEntity(),
        createdAt: props.createdAt ?? new Date(),
      },
      id,
    )

    return Service
  }
}
