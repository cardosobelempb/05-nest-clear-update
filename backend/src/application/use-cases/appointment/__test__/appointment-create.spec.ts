import { AppointmentInMemoryRepository } from '@/application/repositories/in-memory/appointment-in-memory.repository'

import { AppointmentCreatedUseCase } from '../appointment-created.usercase'

let appointmentInMemoryRepository: AppointmentInMemoryRepository
let sut: AppointmentCreatedUseCase

describe('AppointmentCreateUseCase', () => {
  beforeAll(() => {
    appointmentInMemoryRepository = new AppointmentInMemoryRepository()

    sut = new AppointmentCreatedUseCase(appointmentInMemoryRepository)
  })

  it('should be ble create a available time', async () => {
    const result = await sut.execute({
      userId: '1',
      serviceId: '1',
      availableTimeId: '1',
    })

    expect(result.value?.appointment.id).toBeTruthy()
    expect(appointmentInMemoryRepository.items[0].id).toEqual(result.value?.appointment.id)
  })
})
