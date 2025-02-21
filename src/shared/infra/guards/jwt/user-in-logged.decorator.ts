import { ExecutionContext, createParamDecorator } from '@nestjs/common'
import { JwtPayloadInfer } from './jwt.strategy'

export const UserInLoggaed = createParamDecorator(
  (_: never, context: ExecutionContext) => {
    const request = context.switchToHttp().getRequest()

    return request.user as JwtPayloadInfer
  },
)
