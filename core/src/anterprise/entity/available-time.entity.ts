import { Entity, Optional, UniqueEntityUUID } from "../../shared/enterprise"
import { AvailableTime } from "../../shared/types"

export class AvailableTimeEntity extends Entity<AvailableTime.Props> {
  get time() {
    return this.props.time
  }

  set time(time: string) {
    this.props.time = time
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
