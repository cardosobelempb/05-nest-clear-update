import { AppointmentInMemoryRepository } from "@/application/repositories/in-memory/appointment-in-memory.repository"
import { appointmentFactory } from "@/application/repositories/in-memory/factories/appointment.factory"

import { AppointmentCreatedSubscribe } from "../appoinment-created.subscribe"

let appointmentInMemoryRepository: AppointmentInMemoryRepository
let appointmentCreatedSubscribe: AppointmentCreatedSubscribe

describe('AppointmentCreatedSubscribe', async () => {

  beforeEach(() => {
    appointmentInMemoryRepository = new AppointmentInMemoryRepository()
    appointmentCreatedSubscribe = new AppointmentCreatedSubscribe()
  })

  afterEach(() => {
    appointmentInMemoryRepository.items = []
  })

  it('should send a notification whe an appointemnt is created', () => {
    appointmentCreatedSubscribe.setupSubscriptions()

    const appointment = appointmentFactory()

    appointmentInMemoryRepository.create(appointment)
  })
})
