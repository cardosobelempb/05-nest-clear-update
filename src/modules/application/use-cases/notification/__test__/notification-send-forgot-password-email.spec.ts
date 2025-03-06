import { UserInMemoryRepository } from '@/modules/application/repositories/in-memory/user-in-memory.repository'
import { NotificationSendForgotPasswordEmail } from '../notification-send-forgot-password-email'
import { userFactory } from '@/modules/application/repositories/in-memory/factories/user.factory'

let userInMemoryRepository: UserInMemoryRepository
let sut: NotificationSendForgotPasswordEmail

describe('NotificationSendForgotPasswordEmail', () => {
  beforeAll(() => {
    userInMemoryRepository = new UserInMemoryRepository()
    sut = new NotificationSendForgotPasswordEmail(userInMemoryRepository)
  })

  it('should be ble to recover the password usingg the email', async () => {
    const spy = vitest.spyOn(NotificationSendForgotPasswordEmail, 'execute')
    const user = userFactory()

    await sut.execute({
      email: user.email,
    })

    expect(spy).toHaveBeenCalled()
    // expect(appointmentInMemoryRepository.items[0].id).toEqual(appointment.id)
  })
})
