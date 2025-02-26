import { AppModule } from '@/modules/app.module'
import { PrismaService } from '@/shared/infrastructure/database/prisma/prisma.service'
import { waitFor } from '@/shared/utils/wait-for'
import { INestApplication } from '@nestjs/common'
import { JwtService } from '@nestjs/jwt'
import { Test } from '@nestjs/testing'
import { hash } from 'bcryptjs'
import request from 'supertest'

describe('AppointmentTimeFindManyController (E2E)', () => {
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

  test('[GET] /times', async () => {
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

    const times = await prisma.appointmentTime.createMany({
      data: [
        { name: 'Time-01', userId: user.id },
        { name: 'Time-02', userId: user.id },
      ],
    })

    const response = await request(app.getHttpServer())
      .get('/times')
      .set('Authorization', `Bearer ${accessToken}`)
      .send()

    await waitFor(() => {
      expect(response.statusCode).toBe(200)
      expect(times.count).toEqual(2)
    })
  })
})
