import { Appointment, AppointmentEntity, UniqueEntityUUID } from "@core"

export function appointmentFactory(
  override: Partial<Appointment.Props> = {},
  id?: UniqueEntityUUID,
) {
  const appointment = AppointmentEntity.create(
    {
      userId: new UniqueEntityUUID(),
      serviceId: new UniqueEntityUUID(),
      availableTimeId: new UniqueEntityUUID(),
      ...override,
    },
    id,
  )

  return appointment
}
