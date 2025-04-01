import { Entity } from "../../shared/enterprise/entities/entity"
import { UniqueEntityUUID } from "../../shared/enterprise/entities/value-objects/unique-entity-uuid/unique-entity-uuid"
import { Optional } from "../../shared/enterprise/types/optional"
import { AvailableTime } from '../../shared/types/available-time'

export class AvailableTimeEntity extends Entity<AvailableTime.Props> {
  get name() {
    return this.props.name
  }

  set name(name: string) {
    this.props.name = name
    this.touch()
  }

  get isActive() {
    return this.props.isActive
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
    props: Optional<
      AvailableTime.Props,
      'createdAt' | 'updatedAt' | 'isActive'
    >,
    id?: UniqueEntityUUID,
  ) {
    const availableTime = new AvailableTimeEntity(
      {
        ...props,
        isActive: props.isActive ?? true,
        createdAt: props.createdAt ?? new Date(),
      },
      id,
    )

    return availableTime
  }
}
