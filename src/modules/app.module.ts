import { AuthenticationModule } from '@/modules/authentication.module'

import { envSchema } from '@/shared/infrastructure/env/env'
import { Module } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'
import { AppointmentCategoryModule } from './appointment-category.module'
import { AppointmentServiceModule } from './appointment-service.module'
import { AppointmentTimeModule } from './appointment-time.module'
import { AppointmentModule } from './appointment.module'
import { UserModule } from './user.module'

@Module({
  imports: [
    ConfigModule.forRoot({
      validate: env => envSchema.parse(env),
      isGlobal: true,
    }),
    AuthenticationModule,
    UserModule,
    AppointmentModule,
    AppointmentTimeModule,
    AppointmentServiceModule,
    AppointmentCategoryModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
