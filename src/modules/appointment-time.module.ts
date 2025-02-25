import { Module } from '@nestjs/common'
import { PrismaService } from '@/shared/enterprise/database/prisma/prisma.service'
import { AppointmentTimeCreateController } from './infrastructure/controllers/appointment-time/appointment-time-create/appointment-time-create.controller'
import { AppointmentTimeFindManyController } from './infrastructure/controllers/appointment-time/appointment-time-find-many/appointment-time-find-many.controller'

@Module({
  imports: [],
  controllers: [
    AppointmentTimeCreateController,
    AppointmentTimeFindManyController,
  ],
  providers: [PrismaService],
})
export class AppointmentTimeModule {}
