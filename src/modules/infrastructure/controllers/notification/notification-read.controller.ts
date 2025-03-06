import { NotificationRead } from '@/modules/application/use-cases/notification/notification-read'
import { JwtPayloadInfer } from '@/shared/infrastructure/guards/jwt/jwt.strategy'
import { UserInLoggaed } from '@/shared/infrastructure/guards/jwt/user-in-logged.decorator'
import {
  BadRequestException,
  Controller,
  HttpCode,
  HttpStatus,
  Param,
  Patch,
} from '@nestjs/common'

@Controller('/notifications/:notificationId/read')
export class NotificationReadController {
  constructor(private readNotification: NotificationRead) {}

  @Patch()
  @HttpCode(HttpStatus.NO_CONTENT)
  async handle(
    @UserInLoggaed() user: JwtPayloadInfer,
    @Param('notificationId') notificationId: string,
  ) {
    const result = await this.readNotification.execute({
      notificationId,
      recipientId: user.sub,
    })

    if (result.isLeft()) {
      throw new BadRequestException()
    }
  }
}
