import { AppointmentInMemoryRepository } from '@/application/repositories/in-memory/appointment-in-memory.repository'
import { appointmentFactory } from '@/application/repositories/in-memory/factories/appointment.factory'
import { UniqueEntityUUID } from '@core'

import { AppointmentDelete } from '../appointment-delete'

let appointmentInMemoryRepository: AppointmentInMemoryRepository
let sut: AppointmentDelete

describe('AppointmentDelete', () => {
  beforeAll(() => {
    appointmentInMemoryRepository = new AppointmentInMemoryRepository()
    sut = new AppointmentDelete(appointmentInMemoryRepository)
  })

  it('should be ble to delete a appointment', async () => {
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

  // it('should not ble to delete a appointment another user', async () => {
  //   const newAppointment = appointmentFactory(
  //     {
  //       userId: new UniqueEntityUUID('user-1'),
  //     },
  //     new UniqueEntityUUID('appointment-1'),
  //   )

  //   await appointmentInMemoryRepository.create(newAppointment)

  //   expect(() => {
  //     return sut.execute({
  //       appointmentId: 'appointment-1',
  //       userId: 'user-2',
  //     })
  //   }).rejects.toBeInstanceOf(NotAllowedErro)
  // })
})
