import { Module } from '@nestjs/common'
import { AppointmentModule } from 'src/modules/auth/appointment/appointment.module'
import { ServiceModule } from 'src/modules/service/service.module'
import { TimeModule } from 'src/modules/time/time.module'
import { UserModule } from 'src/modules/user/user.module'
import { PrismaService } from '../../shared/enterprise/database/prisma/prisma.servoce'
import { ConfigModule } from '@nestjs/config'
import { envSchema } from 'src/shared/env/env'
import { AuthModule } from 'src/modules/auth/auth.module'

@Module({
  imports: [
    ConfigModule.forRoot({
      validate: env => envSchema.parse(env),
      isGlobal: true,
    }),
    AuthModule,
    UserModule,
    TimeModule,
    ServiceModule,
    AppointmentModule,
  ],
  controllers: [],
  providers: [PrismaService],
})
export class AppModule {}
