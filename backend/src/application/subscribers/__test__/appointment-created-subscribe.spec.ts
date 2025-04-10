import { AppointmentInMemoryRepository } from "@/application/repositories/in-memory/appointment-in-memory.repository"
import { appointmentFactory } from "@/application/repositories/in-memory/factories/appointment.factory"
import { NotificationInMemoryRepository } from "@/application/repositories/in-memory/notification-in-memory.repository"
import { NotificationSendProps, NotificationSendService } from "@/application/use-cases/notification/notification-send.service"
import { waitFor } from "@/shared/utils/wait-for"
import { MockInstance } from "vitest"

import { AppointmentCreatedSubscribe } from "../appoinment-created.subscribe"

let appointmentInMemoryRepository: AppointmentInMemoryRepository
let notificationInMemoryRepository: NotificationInMemoryRepository
let appointmentCreatedSubscribe: AppointmentCreatedSubscribe
let notificationSendService: NotificationSendService
let spyDispatch: MockInstance<() => Promise<NotificationSendProps.Response>>

describe.skip('AppointmentCreatedSubscribe', async () => {

  beforeEach(() => {
    appointmentInMemoryRepository = new AppointmentInMemoryRepository()
    notificationInMemoryRepository = new NotificationInMemoryRepository()
    notificationSendService = new NotificationSendService(notificationInMemoryRepository)

    spyDispatch  = vi.spyOn(notificationSendService, 'execute')

    appointmentCreatedSubscribe = new AppointmentCreatedSubscribe(notificationSendService)
  })

  afterEach(() => {
    appointmentInMemoryRepository.items = []
  })

  it('should send a notification whe an appointemnt is created', async () => {
    appointmentCreatedSubscribe.setupSubscriptions()
    const appointment = appointmentFactory()

    appointmentInMemoryRepository.create(appointment)

    await waitFor(() => expect(spyDispatch).toHaveBeenCalled())
  })
})
