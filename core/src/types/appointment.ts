import { UniqueEntityUUID } from "../shared/enterprise/entities/value-objects/unique-entity-uuid/unique-entity-uuid"

export namespace Appointment {
  export type Status = 'ATTENDED' | 'SCHEDULED' | 'CANCELLED' | 'INATTENDANCE'

  export interface Props {
    id: string
    status: Status
    isActive: boolean
    createdAt: Date
    updatedAt?: Date | null
    userId: UniqueEntityUUID
    availableTimeId: UniqueEntityUUID
    serviceId: UniqueEntityUUID
  }
}
