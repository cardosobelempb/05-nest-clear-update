import { Module } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'
import { AppointmentModule } from '@/modules/appointment/appointment.module'
import { AuthModule } from '@/modules/auth/auth.module'
import { ServiceModule } from '@/modules/service/service.module'
import { TimeModule } from '@/modules/time/time.module'
import { UserModule } from '@/modules/user/user.module'
import { envSchema } from '@/shared/env/env'
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
