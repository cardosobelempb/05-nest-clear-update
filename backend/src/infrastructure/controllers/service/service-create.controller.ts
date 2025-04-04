import { ResourceNotFoundError } from '@/shared/application/usecase-erros/resource-not-found.error'
import { PrismaService } from '@/shared/infrastructure/database/prisma/prisma.service'
import { JwtGuard } from '@/shared/infrastructure/guards/jwt/jwt.guard'
import { JwtPayloadInfer } from '@/shared/infrastructure/guards/jwt/jwt.strategy'
import { UserInLoggaed } from '@/shared/infrastructure/guards/jwt/user-in-logged.decorator'
import { Body, ConflictException, Controller, HttpCode, HttpStatus, Post, UseGuards } from '@nestjs/common'
import { Prisma } from '@prisma/client'
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
  constructor(private readonly prisma: PrismaService) {}

  @HttpCode(HttpStatus.CREATED)
  @Post()
  async handle(
    @Body() body: AppontmentServiceProps.Request,
    @UserInLoggaed() user: JwtPayloadInfer,
  ) {
    const { name, price, duration, categoryId } = body

    const Service = await this.prisma.service.findFirst({
      where: {
        name,
      },
    })

    if (Service) {
      throw new ConflictException('Service with name already exists.')
    }

    const category = await this.prisma.category.findUnique({
      where: {
        id: categoryId,
      },
    })

    if (!category) {
      throw new ResourceNotFoundError()
    }

    const data: Prisma.ServiceUncheckedCreateInput = {
      name,
      price,
      userId: user.sub,
      categoryId: category.id,
      duration,
    }
    await this.prisma.service.create({
      data,
    })
  }
}
