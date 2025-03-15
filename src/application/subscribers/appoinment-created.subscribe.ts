import { AppointmentCreatedEvent } from "@/anterprise/events/appointment-created.event";
import { DomainEvents } from "@/shared/infrastructure/events/domain-events";
import { EventHandler } from "@/shared/infrastructure/events/event-handler";

export class AppointmentCreatedSubscribe implements EventHandler{

  constructor() {
    this.setupSubscriptions()
  }

  setupSubscriptions(): void {
    DomainEvents.register(this.sendNewAttatiomentNotification.bind(this), AppointmentCreatedEvent.name)
  }

  private async sendNewAttatiomentNotification({appoinment}: AppointmentCreatedEvent) {
    console.log('AppointmentCreatedSubscribe =>', appoinment)
  }

}
