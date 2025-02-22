import { AppModule } from '@/modules/app/app.module'
import { PrismaService } from '@/shared/enterprise/database/prisma/prisma.servoce'
import { INestApplication } from '@nestjs/common'
import { Test } from '@nestjs/testing'
import { hash } from 'bcryptjs'

import request from 'supertest'

describe('AuthController (E2E)', () => {
  let app: INestApplication
  let prisma: PrismaService

  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [AppModule],
    }).compile()

    app = moduleRef.createNestApplication()

    prisma = moduleRef.get(PrismaService)

    await app.init()
  })

  test('[POST] /auth/token', async () => {

    const user = await prisma.user.create({
      data: {
        name: 'John Doe',
        phone: "83999887766",
        email: 'johndoe@example.com',
        password: await hash('123456', 8),
      }
    })

    const response = await request(app.getHttpServer()).post('/auth/token').send({
      email: 'johndoe@example.com',
      password: '123456',
    })

    const userOndatabase = await prisma.user.findUnique({
      where: {email: 'johndoe@example.com'}
    })

    expect(response.statusCode).toBe(201)
    expect(response.body).toEqual({
      access_token: expect.any(String)
    })
  })
})
