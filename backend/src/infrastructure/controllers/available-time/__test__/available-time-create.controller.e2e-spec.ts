import { AppModule } from '@/modules/app.module'
import { PrismaService } from '@/shared/infrastructure/database/prisma/prisma.service'
import { waitFor } from '@/shared/utils/wait-for'
import { INestApplication } from '@nestjs/common'
import { JwtService } from '@nestjs/jwt'
import { Test } from '@nestjs/testing'
import { hash } from 'bcryptjs'
import request from 'supertest'

describe('AppointmentTimeCreateController (E2E)', () => {
  let app: INestApplication
  let prisma: PrismaService
  let jwt: JwtService

  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [AppModule],
    }).compile()

    app = moduleRef.createNestApplication()

    prisma = moduleRef.get(PrismaService)
    jwt = moduleRef.get(JwtService)

    await app.init()
  })

  test('[POST] /times', async () => {
    const user = await prisma.user.create({
      data: {
        name: 'John Doe',
        phone: '83999887766',
        email: 'johndoe@example.com',
        password: await hash('123456', 8),
      },
    })

    const accessToken = jwt.sign({
      sub: user.id,
    })

    const response = await request(app.getHttpServer())
      .post('/times')
      .set('Authorization', `Bearer ${accessToken}`)
      .send({
        name: 'Time 01',
      })

    const timesOndatabase = await prisma.availableTime.findFirst({
      where: { name: 'Time 01' },
    })

    await waitFor(() => {
      expect(response.statusCode).toBe(201)
      expect(timesOndatabase).toBeTruthy()
    })
  })
})
