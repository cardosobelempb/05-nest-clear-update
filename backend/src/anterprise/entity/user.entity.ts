import { Entity, Optional, UniqueEntityUUID } from '@core'

export namespace UserProps {
  export interface Props {
    name: string
    email: string
    password: string
    phone: string
    isActive: boolean
    createdAt: Date
    updatedAt?: Date | null
  }
  export interface Id {
    timeId: string
  }
}

export class UserEntity extends Entity<UserProps.Props> {
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
    props: Optional<UserProps.Props, 'createdAt' | 'updatedAt' | 'isActive'>,
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
