import { PrismaService } from '@/shared/infrastructure/database/prisma/prisma.service'
import { JwtPayloadInfer } from '@/shared/infrastructure/guards/jwt/jwt.strategy'
import { UserInLoggaed } from '@/shared/infrastructure/guards/jwt/user-in-logged.decorator'
import { Body, ConflictException, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common'
import { Prisma } from '@prisma/client'
import { z } from 'zod'

export namespace CategoryProps {
  export const request = z.object({
    name: z.string(),
  })

  export type Request = z.infer<typeof request>

  export interface Response {}
}

@Controller('/categories')
export class CategoryCreateController {
  constructor(private readonly prisma: PrismaService) {}

  @HttpCode(HttpStatus.CREATED)
  @Post()
  async handle(
    @Body() body: CategoryProps.Request,
    @UserInLoggaed() user: JwtPayloadInfer,
  ) {
    const { name } = body

    const category = await this.prisma.category.findFirst({
      where: {
        name,
      },
    })

    if (category) {
      throw new ConflictException('Category with name already exists.')
    }

    const data: Prisma.CategoryUncheckedCreateInput = {
      name,
      userId: user.sub,
    }
    await this.prisma.category.create({
      data,
    })
  }
}
