import { Entity } from '@/shared/enterprise/entities/entity'
import { UniqueEntityUUID } from '@/shared/enterprise/entities/value-objects/unique-entity-uuid/unique-entity-uuid'
import { Optional } from '@prisma/client/runtime/library'

export namespace CategoryProps {
  export interface Props {
    name: string
    isActive: boolean
    userId: UniqueEntityUUID
    createdAt: Date
    updatedAt?: Date | null
  }
  export interface Id {
    categoryId: string
  }
}

export class CategoryEntity extends Entity<CategoryProps.Props> {
  get name() {
    return this.props.name
  }

  set name(name: string) {
    this.props.name = name
    this.touch()
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

  private touch() {
    this.props.updatedAt = new Date()
  }

  static create(
    props: Optional<CategoryProps.Props, 'createdAt'>,
    id?: UniqueEntityUUID,
  ) {
    const time = new CategoryEntity(
      {
        ...props,
        createdAt: props.createdAt ?? new Date(),
      },
      id,
    )

    return time
  }
}
