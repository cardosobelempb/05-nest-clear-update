import { Entity } from "../../shared/enterprise/entities/entity"
import { UniqueEntityUUID } from "../../shared/enterprise/entities/value-objects/unique-entity-uuid/unique-entity-uuid"
import { Optional } from "../../shared/enterprise/types/optional"
import { User } from "../../shared/types"



export class UserEntity extends Entity<User.Props> {
  get name() {
    return this.props.name
  }

  set name(name: string) {
    this.props.name = name
    this.touch()
  }

  get email() {
    return this.props.email
  }

  set email(email: string) {
    this.props.email = email
  }

  get password() {
    return this.props.password
  }

  get phone() {
    return this.props.phone
  }

  set phone(phone: string) {
    this.props.phone = phone
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
    props: Optional<User.Props, 'createdAt' | 'updatedAt' | 'isActive'>,
    id?: UniqueEntityUUID,
  ) {
    const User = new UserEntity(
      {
        ...props,
        isActive: props.isActive ?? true,
        createdAt: props.createdAt ?? new Date(),
      },
      id,
    )

    return User
  }
}
