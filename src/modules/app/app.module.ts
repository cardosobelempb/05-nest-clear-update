import { Module } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'
import { AppointmentModule } from 'src/modules/appointment/appointment.module'
import { AuthModule } from 'src/modules/auth/auth.module'
import { ServiceModule } from 'src/modules/service/service.module'
import { TimeModule } from 'src/modules/time/time.module'
import { UserModule } from 'src/modules/user/user.module'
import { envSchema } from 'src/shared/env/env'
import { PrismaService } from '../../shared/enterprise/database/prisma/prisma.servoce'

@Module({
  imports: [
    ConfigModule.forRoot({
      validate: env => envSchema.parse(env),
      isGlobal: true,
    }),
    AuthModule,
    UserModule,
    AppointmentModule,
    TimeModule,
    ServiceModule,
  ],
  controllers: [],
  providers: [PrismaService],
})
export class AppModule {}
