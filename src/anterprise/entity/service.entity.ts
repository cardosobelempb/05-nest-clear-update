import { Entity } from '@/shared/enterprise/entities/entity'
import { UniqueEntityUUID } from '@/shared/enterprise/entities/value-objects/unique-entity-uuid/unique-entity-uuid'
import { Optional } from '@prisma/client/runtime/library'

export namespace ServiceProps {
  export interface Props {
    name: string
    price: number
    duration: string
    isActive: boolean
    userId: UniqueEntityUUID
    categoryId: UniqueEntityUUID | null
    createdAt: Date
    updatedAt?: Date | null
  }
  export interface Id {
    serviceId: string
  }
}

export class ServiceEntity extends Entity<ServiceProps.Props> {
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

  get categoryId() {
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
    props: Optional<ServiceProps.Props, 'createdAt' | 'updatedAt' | 'isActive'>,
    id?: UniqueEntityUUID,
  ) {
    const Service = new ServiceEntity(
      {
        ...props,
        isActive: props.isActive ?? true,
        createdAt: props.createdAt ?? new Date(),
      },
      id,
    )

    return Service
  }
}
