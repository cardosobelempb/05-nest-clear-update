import { Entity } from '@/shared/enterprise/entities/entity'
import { UniqueEntityUUID } from '@/shared/enterprise/entities/value-objects/unique-entity-uuid/unique-entity-uuid'
import { Optional } from '@prisma/client/runtime/library'

export namespace CategoryProps {
  export interface Props {
    name: string
    isActive: boolean
    createdAt: Date
    updatedAt?: Date | null
    userId: UniqueEntityUUID
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

  static create(
    props: Optional<
      CategoryProps.Props,
      'createdAt' | 'isActive' | 'updatedAt'
    >,
    id?: UniqueEntityUUID,
  ) {
    const time = new CategoryEntity(
      {
        ...props,
        isActive: props.isActive ?? true,
        createdAt: props.createdAt ?? new Date(),
      },
      id,
    )

    return time
  }
}
