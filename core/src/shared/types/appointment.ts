import { AppointmentEntity } from "../../anterprise/entity"
import { UniqueEntityUUID } from "../enterprise"
import { Either } from "../infrastructure"

export namespace Appointment {
  export type Status = 'ATTENDED' | 'SCHEDULED' | 'CANCELLED' | 'INATTENDANCE'

  export interface Props {
    status: Status
    isActive: boolean
    createdAt: Date
    updatedAt?: Date | null
    userId: UniqueEntityUUID
    availableTimeId: UniqueEntityUUID
    serviceId: UniqueEntityUUID
  }

  
  export interface Request {
    userId: string
    availableTimeId: string
    serviceId: string
  }

  export type Response = Either<
    null,
    {
      appointment: AppointmentEntity
    }
  >
}
