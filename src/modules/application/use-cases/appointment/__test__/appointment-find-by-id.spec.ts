import { AppointmentInMemoryRepository } from '@/modules/application/repositories/in-memory/appointment-in-memory.repository'
import { appointmentFactory } from '@/modules/application/repositories/in-memory/factories/appointment.factory'

import { AppointmentFindByIdUseCase } from '../appointment-find-by-id.usecase'

let appointmentInMemoryRepository: AppointmentInMemoryRepository
let sut: AppointmentFindByIdUseCase

describe('AppointmentFindByIdUseCase', () => {
  beforeAll(() => {
    appointmentInMemoryRepository = new AppointmentInMemoryRepository()
    sut = new AppointmentFindByIdUseCase(appointmentInMemoryRepository)
  })

  it('should be ble to find by id appointment', async () => {
    const newAppointment = appointmentFactory()

    await appointmentInMemoryRepository.create(newAppointment)

    const { appointment } = await sut.execute({
      appointmentId: newAppointment.id.toString(),
    })


    expect(appointment.id.toString()).toBeTruthy()
    expect(appointmentInMemoryRepository.items).toHaveLength(1)
  })
})
