import { AuthenticationModule } from '@/modules/authentication.module'
import { envSchema } from '@/shared/infrastructure/env/env'
import { Module } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'

import { AppointmentModule } from './appointment.module'
import { AvailableTimeModule } from './available-time.module'
import { CategoryModule } from './category.module'
import { ServiceModule } from './service.module'
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
    AvailableTimeModule,
    ServiceModule,
    CategoryModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
