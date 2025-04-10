import { UniqueEntityUUID } from '@core'

export interface DomainEvent {
  ocurredAt: Date
  getAggregateId(): UniqueEntityUUID
}
