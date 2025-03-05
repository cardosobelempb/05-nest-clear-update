import { AppointmentEntity, AppointmentProps } from '@/modules/anterprise/entity/appointment.entity'
import { UniqueEntityUUID } from '@/shared/enterprise/entities/value-objects/unique-entity-uuid/unique-entity-uuid'

export function appointmentFactory(
  override: Partial<AppointmentProps.Props> = {},
  id?: UniqueEntityUUID,
) {
  const appointment = AppointmentEntity.create({
    userId: new UniqueEntityUUID(),
    serviceId: new UniqueEntityUUID(),
    availableTimeId: new UniqueEntityUUID(),
    ...override,
  }, id)

  return appointment
}
