import { AppointmentServiceModule } from '@/modules/appointment-service/appointment-service.module'
import { AppointmentTimeModule } from '@/modules/appointment-time/appointment-time.module'
import { AppointmentModule } from '@/modules/appointment/appointment.module'
import { AuthModule } from '@/modules/auth/auth.module'
import { UserModule } from '@/modules/user/user.module'
import { envSchema } from '@/shared/env/env'
import { Module } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'
import { PrismaService } from '@/shared/enterprise/database/prisma/prisma.service'
import { AppointmentCategoryModule } from '@/modules/appointment-category/appointment-category.module'

@Module({
  imports: [
    ConfigModule.forRoot({
      validate: env => envSchema.parse(env),
      isGlobal: true,
    }),
    AuthModule,
    UserModule,
    AppointmentModule,
    AppointmentTimeModule,
    AppointmentServiceModule,
    AppointmentCategoryModule,
  ],
  controllers: [],
  providers: [PrismaService],
})
export class AppModule {}
