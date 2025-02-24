import { Module } from '@nestjs/common'
import { PrismaService } from '@/shared/enterprise/database/prisma/prisma.service'
import { AppointmentTimeCreateController } from './infra/controllers/appointment-time-create/appointment-time-create.controller'
import { AppointmentTimeFindManyController } from './infra/controllers/appointment-time-find-many/appointment-time-find-many.controller'

@Module({
  imports: [],
  controllers: [
    AppointmentTimeCreateController,
    AppointmentTimeFindManyController,
  ],
  providers: [PrismaService],
})
export class AppointmentTimeModule {}
