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

describe('AvailableTimeFindManyController (E2E)', () => {
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

  test('[GET] /available-times', async () => {
    const user = await userFactory.create()

    const accessToken = jwt.sign({
      sub: user.id.toString(),
    })

    // const time01 = await availableTimeFactory.create()
    // const time02 = await availableTimeFactory.create()

    const times = await prisma.availableTime.createMany({
      data: [
        { time: 'Time-01', userId: user.id.toString() },
        { time: 'Time-02', userId: user.id.toString() },
      ],
    })

    const response = await request(app.getHttpServer())
      .get('/available-times')
      .set('Authorization', `Bearer ${accessToken}`)
      .send()

    await waitFor(() => {
      expect(response.statusCode).toBe(200)
      expect(times.count).toEqual(2)
    })
  })
})
