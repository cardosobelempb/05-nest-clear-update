import { AvailableTimeFactory } from '@/application/repositories/in-memory/factories/available-time.factory'
import { UserFactory } from '@/application/repositories/in-memory/factories/user.factory'
import { AppModule } from '@/modules/app.module'
import { DatabaseModule } from '@/modules/database.module'
import { PrismaService } from '@/shared/infrastructure/database/prisma/prisma.service'
import { waitFor } from '@/shared/utils/wait-for'
import { INestApplication } from '@nestjs/common'
import { JwtService } from '@nestjs/jwt'
import { Test } from '@nestjs/testing'
import request from 'supertest'

describe.skip('AppointmentTimeCreateController (E2E)', () => {
  let app: INestApplication
  let prisma: PrismaService
  let availableTimeFactory: AvailableTimeFactory
    let userFactory: UserFactory
  let jwt: JwtService

  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [AppModule, DatabaseModule],
      providers: [AvailableTimeFactory, UserFactory]
    }).compile()

    app = moduleRef.createNestApplication()

    prisma = moduleRef.get(PrismaService)
    availableTimeFactory = moduleRef.get(AvailableTimeFactory)
    userFactory = moduleRef.get(UserFactory)
    jwt = moduleRef.get(JwtService)

    await app.init()
  })

  test('[POST] /available-times', async () => {
    const user = await userFactory.create()

    const accessToken = jwt.sign({
      sub: user.id.toString(),
    })

    const response = await request(app.getHttpServer())
      .post('/available-times')
      .set('Authorization', `Bearer ${accessToken}`)
      .send({
        name: 'Time 01',
      })

    const timesOndatabase = await prisma.availableTime.findFirst({
      where: { time: 'Time 01' },
    })

    await waitFor(() => {
      expect(response.statusCode).toBe(201)
      expect(timesOndatabase).toBeTruthy()
    })
  })
})
