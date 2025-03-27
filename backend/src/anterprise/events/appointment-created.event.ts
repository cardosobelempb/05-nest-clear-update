import { AppointmentEntity, DomainEvent, UniqueEntityUUID } from '@core';

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
