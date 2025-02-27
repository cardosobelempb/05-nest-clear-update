import { AuthenticationModule } from '@/modules/authentication.module'

import { envSchema } from '@/shared/infrastructure/env/env'
import { Module } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'

import { AvailableTimeModule } from './available-time.module'
import { AppointmentModule } from './appointment.module'
import { UserModule } from './user.module'
import { ServiceModule } from './service.module'
import { CategoryModule } from './category.module'
import { PrismaService } from '@/shared/infrastructure/database/prisma/prisma.service'

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
  providers: [PrismaService],
})
export class AppModule {}
