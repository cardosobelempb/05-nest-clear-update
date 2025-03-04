import { Entity } from '@/shared/enterprise/entities/entity'
import { UniqueEntityUUID } from '@/shared/enterprise/entities/value-objects/unique-entity-uuid/unique-entity-uuid'
import { Prisma } from '@prisma/client'
import { Optional } from '@prisma/client/runtime/library'

export namespace ServiceProps {
  export interface Props {
    name: string
    price: Prisma.Decimal
    duration: string
    isActive: boolean
    userId: UniqueEntityUUID
    categoryId: UniqueEntityUUID | null
    createdAt: Date
    updatedAt?: Date | null
  }
  export interface Id {
    timeId: string
  }
}

export class ServiceEntity extends Entity<ServiceProps.Props> {
  get name() {
    return this.props.name
  }

  set name(name: string) {
    this.props.name = name
    this.touch()
  }

  get price() {
    return this.props.price
  }

  set price(price: Prisma.Decimal) {
    this.props.price = price
    this.touch()
  }

  get duration() {
    return this.props.duration
  }

  set duration(duration: string) {
    this.props.duration = duration
    this.touch()
  }

  get userId() {
    return this.props.userId
  }

  get categoryId() {
    return this.props.categoryId
  }

  get isActive() {
    return this.props.isActive
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
    props: Optional<ServiceProps.Props, 'createdAt'>,
    id?: UniqueEntityUUID,
  ) {
    const Service = new ServiceEntity(
      {
        ...props,
        createdAt: props.createdAt ?? new Date(),
      },
      id,
    )

    return Service
  }
}
