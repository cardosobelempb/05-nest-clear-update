import { Entity, Optional, UniqueEntityUUID } from "../../shared/enterprise"
import { Category } from "../../shared/types"

export class CategoryEntity extends Entity<Category.Props> {
  get name() {
    return this.props.name
  }

  set name(name: string) {
    this.props.name = name
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
      Category.Props,
      'createdAt' | 'updatedAt' | 'isActive'
    >,
    id?: UniqueEntityUUID,
  ) {
    const category = new CategoryEntity(
      {
        ...props,
        isActive: props.isActive ?? true,
        createdAt: props.createdAt ?? new Date(),
      },
      id,
    )

    return category
  }
}
