import { UniqueEntityUUID } from "../../enterprise"

export interface DomainEvent {
  ocurredAt: Date
  getAggregateId(): UniqueEntityUUID
}
