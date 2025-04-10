import { ServiceUpdateService } from '@/application/use-cases/service/service-update.service'
import { JwtGuard } from '@/shared/infrastructure/guards/jwt/jwt.guard'
import { JwtPayloadInfer } from '@/shared/infrastructure/guards/jwt/jwt.strategy'
import { UserInLoggaed } from '@/shared/infrastructure/guards/jwt/user-in-logged.decorator'
import { right } from '@core'
import { Body, Controller, HttpCode, HttpStatus, Param, Post, UseGuards } from '@nestjs/common'
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

@Controller('/services/:id')
@UseGuards(JwtGuard)
export class ServiceUpdateController {
  constructor(private readonly serviceUpdateService: ServiceUpdateService) {}

  @HttpCode(HttpStatus.NO_CONTENT)
  @Post()
  async handle(
    @Body() body: AppontmentServiceProps.Request,
    @UserInLoggaed() user: JwtPayloadInfer,
    @Param('id') serviceId: string
  ) {
    const { name, price, duration, categoryId } = body
    const userId = user.sub

    this.serviceUpdateService.execute({
      serviceId,
      userId,
      categoryId,
      name,
      price,
      duration,
      attachmentsIds: [],
    })

    return right({})
  }
}
