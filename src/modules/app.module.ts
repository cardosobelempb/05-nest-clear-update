import { AuthModule } from '@/modules/auth.module'

import { PrismaService } from '@/shared/enterprise/database/prisma/prisma.service'
import { envSchema } from '@/shared/env/env'
import { Module } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'
import { UserModule } from './user.module'
import { AppointmentModule } from './appointment.module'
import { AppointmentTimeModule } from './appointment-time.module'
import { AppointmentServiceModule } from './appointment-service.module'
import { AppointmentCategoryModule } from './appointment-category.module'

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
