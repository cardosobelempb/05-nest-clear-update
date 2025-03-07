import { AppointmentInMemoryRepository } from '@/application/repositories/in-memory/appointment-in-memory.repository'
import { appointmentFactory } from '@/application/repositories/in-memory/factories/appointment.factory'
import { NotAllowedErro } from '@/shared/application/usecase-erros/not-allowed.erro'
import { UniqueEntityUUID } from '@/shared/enterprise/entities/value-objects/unique-entity-uuid/unique-entity-uuid'

import { AppointmentUpdate } from '../appointment-update'

let appointmentInMemoryRepository: AppointmentInMemoryRepository
let sut: AppointmentUpdate

describe('AppointmentUpdate', () => {
  beforeAll(() => {
    appointmentInMemoryRepository = new AppointmentInMemoryRepository()
    sut = new AppointmentUpdate(appointmentInMemoryRepository)
  })

  it('should ble to update a appointment from user', async () => {
    const newAppointment = appointmentFactory(
      {
        userId: new UniqueEntityUUID('user-1'),
        serviceId: new UniqueEntityUUID('service-1'),
        availableTimeId: new UniqueEntityUUID('available-time-1'),
      },
      new UniqueEntityUUID('appointment-1'),
    )

    await appointmentInMemoryRepository.create(newAppointment)

    await sut.execute({
      userId: 'user-1',
      serviceId: 'service-1',
      appointmentId: newAppointment.id.toString(),
      availableTimeId: 'available-time-1',
    })

    expect(appointmentInMemoryRepository.items[0]).toMatchObject({
      userId: new UniqueEntityUUID('user-1'),
      serviceId: new UniqueEntityUUID('service-1'),
    })
  })

  it('should not ble to update a appointment from user', async () => {
    const newAppointment = appointmentFactory(
      {
        userId: new UniqueEntityUUID('user-1'),
        serviceId: new UniqueEntityUUID('service-1'),
        availableTimeId: new UniqueEntityUUID('available-time-1'),
      },
      new UniqueEntityUUID('appointment-1'),
    )

    await appointmentInMemoryRepository.create(newAppointment)

    expect(() => {
      return sut.execute({
        userId: 'user-2',
        appointmentId: newAppointment.id.toString(),
        availableTimeId: 'available-time-1',
        serviceId: 'service-1',
      })
    }).rejects.toBeInstanceOf(NotAllowedErro)
  })
})
