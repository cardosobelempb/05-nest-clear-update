import { AppointmentCreatedEvent } from "@/anterprise/events/appointment-created.event";
import { DomainEvents } from "@/shared/infrastructure/events/domain-events";
import { EventHandler } from "@/shared/infrastructure/events/event-handler";

import { NotificationSendService } from "../use-cases/notification/notification-send.service";

export class AppointmentCreatedSubscribe implements EventHandler{

  constructor(
    private notificationSendService: NotificationSendService
  ) {
    this.setupSubscriptions()
  }

  setupSubscriptions(): void {
    DomainEvents.register(this.sendNewAttatiomentNotification.bind(this), AppointmentCreatedEvent.name)
  }

  private async sendNewAttatiomentNotification({appoinment}: AppointmentCreatedEvent) {
    await this.notificationSendService.execute({
      recipientId: appoinment.userId.toString(),
      title: `Novo agendamento em "${appoinment.createdAt}"`,
      content: appoinment.status,
    })
  }

}
