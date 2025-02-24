import { AppModule } from '@/modules/app/app.module'
import { PrismaService } from '@/shared/enterprise/database/prisma/prisma.service'
import { INestApplication } from '@nestjs/common'
import { Test } from '@nestjs/testing'
import request from 'supertest'

describe('UserSignUpController (E2E)', () => {
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

  test('[POST] /signup', async () => {
    const response = await request(app.getHttpServer()).post('/signup').send({
      name: 'John Doe',
      phone: '83999887766',
      email: 'johndoe@example.com',
      password: '123456',
    })

    const userOndatabase = await prisma.user.findUnique({
      where: { email: 'johndoe@example.com' },
    })

    expect(response.statusCode).toBe(201)
    expect(userOndatabase).toBeTruthy()
  })
})
