import { AppointmentInMemoryRepository } from '@/application/repositories/in-memory/appointment-in-memory.repository'
import { AvailableTimeInMemoryRepository } from '@/application/repositories/in-memory/available-time-in-memory.repository'
import { appointmentFactory } from '@/application/repositories/in-memory/factories/appointment.factory'
import { availabletimeFactory } from '@/application/repositories/in-memory/factories/available-time.factory'
import { serviceFactory } from '@/application/repositories/in-memory/factories/service.factory'
import { userFactory } from '@/application/repositories/in-memory/factories/user.factory'
import { ServiceAttachmentInMemoryRepository } from '@/application/repositories/in-memory/service-attachment-in-memory.repository'
import { ServiceInMemoryRepository } from '@/application/repositories/in-memory/service-in-memory.repository'
import { UserInMemoryRepository } from '@/application/repositories/in-memory/user-in-memory.repository'
import { UniqueEntityUUID } from '@core'

import { AppointmentUpdate } from '../appointment-update'

let serviceAttachmentInMemoryRepository: ServiceAttachmentInMemoryRepository
let userInMemoryRepository: UserInMemoryRepository
let appointmentInMemoryRepository: AppointmentInMemoryRepository
let serviceInMemoryRepository: ServiceInMemoryRepository
let availableTimeInMemoryRepository: AvailableTimeInMemoryRepository
let sut: AppointmentUpdate

describe('AppointmentUpdate', () => {
  beforeAll(() => {
    serviceAttachmentInMemoryRepository = new ServiceAttachmentInMemoryRepository()
    appointmentInMemoryRepository = new AppointmentInMemoryRepository()
    serviceInMemoryRepository = new ServiceInMemoryRepository(serviceAttachmentInMemoryRepository)
    availableTimeInMemoryRepository = new AvailableTimeInMemoryRepository()
    userInMemoryRepository = new UserInMemoryRepository()
    sut = new AppointmentUpdate(
      appointmentInMemoryRepository,
      serviceInMemoryRepository,
      availableTimeInMemoryRepository,
      userInMemoryRepository,
    )
  })

  it('should ble to update a appointment from user', async () => {
    const newUser = userFactory({}, new UniqueEntityUUID('user-01'))
    await userInMemoryRepository.create(newUser)

    const newService = serviceFactory(
      {
        userId: newUser.id,
      },
      new UniqueEntityUUID('service-01'),
    )
    await serviceInMemoryRepository.create(newService)

    const newAvailableTime = availabletimeFactory(
      {
        userId: newUser.id,
      },
      new UniqueEntityUUID('available-time-01'),
    )
    await availableTimeInMemoryRepository.create(newAvailableTime)

    const newAppointment = appointmentFactory(
      {
        userId: newUser.id,
        serviceId: newService.id,
        availableTimeId: newAvailableTime.id,
      },
      new UniqueEntityUUID('appointment-01'),
    )

    await appointmentInMemoryRepository.create(newAppointment)

    await sut.execute({
      userId: 'user-01',
      appointmentId: 'appointment-01',
      serviceId: 'service-01',
      availableTimeId: 'available-time-01',
    })

    expect(appointmentInMemoryRepository.items[0]).toMatchObject({
      userId: new UniqueEntityUUID('user-01'),
      serviceId: new UniqueEntityUUID('service-01'),
    })
  })

  // it('should not ble to update a appointment another user', async () => {
  //   const newUser01 = userFactory({}, new UniqueEntityUUID('userId-01'))
  //   const newUser02 = userFactory({}, new UniqueEntityUUID('userId-02'))

  //   await userInMemoryRepository.create(newUser01)
  //   await userInMemoryRepository.create(newUser02)

  //   const newService = serviceFactory({
  //     userId: newUser01.id,
  //   })

  //   await serviceInMemoryRepository.create(newService)

  //   const newAvailableTime = availabletimeFactory({
  //     userId: newUser01.id,
  //   })

  //   await availableTimeInMemoryRepository.create(newAvailableTime)

  //   const newAppointment = appointmentFactory({
  //     userId: new UniqueEntityUUID('user-01'),
  //     serviceId: new UniqueEntityUUID('serviceId-01'),
  //     availableTimeId: new UniqueEntityUUID('availableTimeId-01'),
  //   })

  //   await appointmentInMemoryRepository.create(newAppointment)

  //   expect(() => {
  //     return sut.execute({
  //       userId: newUser02.id.toString(),
  //       appointmentId: newAppointment.id.toString(),
  //       availableTimeId: newAvailableTime.id.toString(),
  //       serviceId: newService.id.toString(),
  //     })
  //   }).rejects.toBeInstanceOf(NotAllowedErro)
  // })
})
