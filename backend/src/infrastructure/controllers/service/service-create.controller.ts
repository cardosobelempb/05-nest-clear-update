import { ServiceCreateService } from '@/application/use-cases/service/service-create.service'
import { JwtGuard } from '@/shared/infrastructure/guards/jwt/jwt.guard'
import { JwtPayloadInfer } from '@/shared/infrastructure/guards/jwt/jwt.strategy'
import { UserInLoggaed } from '@/shared/infrastructure/guards/jwt/user-in-logged.decorator'
import { right } from '@core'
import { Body, Controller, HttpCode, HttpStatus, Post, UseGuards } from '@nestjs/common'
import { z } from 'zod'

export namespace AppontmentServiceProps {
  export const request = z.object({
    name: z.string(),
    price: z.number(),
    duration: z.string(),
    categoryId: z.string(),
  })

  export type Request = z.infer<typeof request>

  export interface Response {}
}

@Controller('/services')
@UseGuards(JwtGuard)
export class ServiceCreateController {
  constructor(private readonly serviceCreateService: ServiceCreateService) {}

  @HttpCode(HttpStatus.CREATED)
  @Post()
  async handle(
    @Body() body: AppontmentServiceProps.Request,
    @UserInLoggaed() user: JwtPayloadInfer,
  ) {
    const { name, price, duration, categoryId } = body



    await this.serviceCreateService.execute( {
      name,
      price,
      attachmentsIds: [],
      userId: user.sub,
      categoryId,
      duration,
    })

    return right({})
  }
}
