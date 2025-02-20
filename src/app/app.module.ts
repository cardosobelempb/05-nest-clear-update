import { Module } from '@nestjs/common'
import { AppointmentModule } from 'src/appointment/appointment.module'
import { ServiceModule } from 'src/service/service.module'
import { TimeModule } from 'src/time/time.module'
import { UserModule } from 'src/user/user.module'
import { PrismaService } from '../shared/enterprise/database/prisma/prisma.servoce'
import { ConfigModule } from '@nestjs/config'
import { envSchema } from 'src/shared/env/env'

@Module({
  imports: [
    ConfigModule.forRoot({
      validate: env => envSchema.parse(env),
      isGlobal: true,
    }),
    UserModule,
    TimeModule,
    ServiceModule,
    AppointmentModule,
  ],
  controllers: [],
  providers: [PrismaService],
})
export class AppModule {}
