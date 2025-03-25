import { userFactory } from '@/application/repositories/in-memory/factories/user.factory'
import { UserInMemoryRepository } from '@/application/repositories/in-memory/user-in-memory.repository'

import { NotificationSendForgotPasswordEmailService } from '../notification-send-forgot-password-email.service'

let userInMemoryRepository: UserInMemoryRepository
let sut: NotificationSendForgotPasswordEmailService

describe('NotificationSendForgotPasswordEmailService', () => {
  beforeAll(() => {
    userInMemoryRepository = new UserInMemoryRepository()
    sut = new NotificationSendForgotPasswordEmailService(userInMemoryRepository)
  })

  it('should be ble to recover the password usingg the email', async () => {
    // const spy = vitest.spyOn(NotificationSendForgotPasswordEmail, 'execute')
    const user = userFactory()

    await sut.execute({
      email: user.email,
    })

    // expect(spy).toHaveBeenCalled()
    // expect(appointmentInMemoryRepository.items[0].id).toEqual(appointment.id)
  })
})
