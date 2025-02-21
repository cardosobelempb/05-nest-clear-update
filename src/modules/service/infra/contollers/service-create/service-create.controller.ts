import {
  Body,
  ConflictException,
  Controller,
  HttpCode,
  HttpStatus,
  Post,
  UseGuards,
} from '@nestjs/common'
import { Prisma } from '@prisma/client'
import { PrismaService } from 'src/shared/enterprise/database/prisma/prisma.servoce'
import { JwtGuard } from 'src/shared/infra/guards/jwt/jwt.guard'
import { JwtPayloadInfer } from 'src/shared/infra/guards/jwt/jwt.strategy'
import { UserInLoggaed } from 'src/shared/infra/guards/jwt/user-in-logged.decorator'
import { z } from 'zod'

export namespace ServiceProps {
  export const request = z.object({
    name: z.string(),
  })

  export type Request = z.infer<typeof request>

  export interface Response {}
}

@Controller('/services')
@UseGuards(JwtGuard)
export class ServiceCreateController {
  constructor(private readonly prisma: PrismaService) {}

  @HttpCode(HttpStatus.CREATED)
  @Post()
  async handle(
    @Body() body: ServiceProps.Request,
    @UserInLoggaed() user: JwtPayloadInfer,
  ) {
    const { name } = body
    console.log('User => ', user.sub)

    const service = await this.prisma.service.findFirst({
      where: {
        name,
      },
    })

    if (service) {
      throw new ConflictException('Service with name already exists.')
    }

    const data: Prisma.ServiceUncheckedCreateInput = {
      name,
      userId: user.sub,
    }
    await this.prisma.service.create({
      data,
    })
  }
}
