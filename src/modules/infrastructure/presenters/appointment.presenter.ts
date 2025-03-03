import { AppointmentEntity } from '@/modules/anterprise/entity/appointment.entity'

export class AppointmentPresenter {
  static toHTTP(appointment: AppointmentEntity) {
    return {
      id: appointment.id.toString(),
      name: appointment.status,
      availableTimeId: appointment.availableTimeId?.toString(),
      serviceId: appointment.serviceId?.toString(),
      userId: appointment.userId.toString(),
      isActive: appointment.isActive,
      createdAt: appointment.createdAt,
      updatedAt: appointment.updatedAt,
    }
  }
}
