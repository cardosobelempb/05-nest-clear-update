import { AppointmentInMemoryRepository } from '@/modules/application/repositories/in-memory/appointment-in-memory.repository'
import { appointmentFactory } from '@/modules/application/repositories/in-memory/factories/appointment.factory'
import { NotAllowedErro } from '@/shared/application/usecase-erros/not-allowed.erro'
import { UniqueEntityUUID } from '@/shared/enterprise/entities/value-objects/unique-entity-uuid/unique-entity-uuid'

import { AppointmentDelete } from '../appointment-delete'

let appointmentInMemoryRepository: AppointmentInMemoryRepository
let sut: AppointmentDelete

describe('AppointmentDelete', () => {
  beforeAll(() => {
    appointmentInMemoryRepository = new AppointmentInMemoryRepository()
    sut = new AppointmentDelete(appointmentInMemoryRepository)
  })

  it('should not ble to delete a appointment from user', async () => {
    const newAppointment = appointmentFactory(
      {
        userId: new UniqueEntityUUID('user-1'),
      },
      new UniqueEntityUUID('appointment-1'),
    )

    await appointmentInMemoryRepository.create(newAppointment)

    await sut.execute({
      appointmentId: 'appointment-1',
      userId: 'user-1',
    })

    expect(appointmentInMemoryRepository.items).toHaveLength(0)
  })

  it('should be ble to delete a appointment', async () => {
    const newAppointment = appointmentFactory(
      {
        userId: new UniqueEntityUUID('user-1'),
      },
      new UniqueEntityUUID('appointment-1'),
    )

    await appointmentInMemoryRepository.create(newAppointment)

    expect(() => {
      return sut.execute({
        appointmentId: 'appointment-1',
        userId: 'user-2',
      })
    }).rejects.toBeInstanceOf(NotAllowedErro)
  })
})
