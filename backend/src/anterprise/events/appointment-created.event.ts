import { UniqueEntityUUID } from "@/shared/enterprise/entities/value-objects/unique-entity-uuid/unique-entity-uuid";
import { DomainEvent } from "@/shared/infrastructure/events/domain-event";

import { AppointmentEntity } from "../entity/appointment.entity";

export class AppointmentCreatedEvent implements DomainEvent {
  ocurredAt: Date;
  appoinment: AppointmentEntity

  constructor(appoinment: AppointmentEntity) {
    this.appoinment = appoinment
    this.ocurredAt = new Date()
  }

  getAggregateId(): UniqueEntityUUID {
    return this.appoinment.id
  }

}
