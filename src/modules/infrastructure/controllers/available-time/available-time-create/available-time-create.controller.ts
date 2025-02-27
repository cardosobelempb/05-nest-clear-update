import { AvailableTimeEntity } from '@/modules/anterprise/entity/available-time.entity'
import { AvailableTimeCreatedUseCase } from '@/modules/application/use-cases/available-time/created/available-time-created.usercase'
import { UniqueEntityUUID } from '@/shared/enterprise/entities/value-objects/unique-entity-uuid/unique-entity-uuid'
import { JwtGuard } from '@/shared/infrastructure/guards/jwt/jwt.guard'
import { JwtPayloadInfer } from '@/shared/infrastructure/guards/jwt/jwt.strategy'
import { UserInLoggaed } from '@/shared/infrastructure/guards/jwt/user-in-logged.decorator'
import {
  Body,
  Controller,
  HttpCode,
  HttpStatus,
  Post,
  UseGuards,
} from '@nestjs/common'
import { z } from 'zod'

export namespace AvailableTimeProps {
  export const request = z.object({
    name: z.string(),
  })

  export type Request = z.infer<typeof request>

  export interface Response {}
}

@Controller('/available-times')
@UseGuards(JwtGuard)
export class AvailableTimeCreateController {
  constructor(
    private readonly availableTimeCreatedUseCase: AvailableTimeCreatedUseCase,
  ) {}

  @HttpCode(HttpStatus.CREATED)
  @Post()
  async handle(
    @Body() body: AvailableTimeProps.Request,
    @UserInLoggaed() user: JwtPayloadInfer,
  ) {
    const { name } = body

    const availableTime = AvailableTimeEntity.create({
      name,
      userId: new UniqueEntityUUID(user.sub),
    })

    await this.availableTimeCreatedUseCase.execute(availableTime)
  }
}
