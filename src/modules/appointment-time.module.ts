import { PrismaService } from '@/shared/infrastructure/database/prisma/prisma.service'
import { Module } from '@nestjs/common'
import { AppointmentPrismaTimeRepository } from './application/repositories/prisma/appointment-prisma-time.repository'
import { DatabaseModule } from './database.module'
import { AppointmentTimeCreateController } from './infrastructure/controllers/appointment-time/appointment-time-create/appointment-time-create.controller'
import { AppointmentTimeFindManyController } from './infrastructure/controllers/appointment-time/appointment-time-find-many/appointment-time-find-many.controller'
import { AppointmentTimeCreatedUseCase } from './application/use-cases/appointment-time/created/appointment-time-created.usercase'

@Module({
  imports: [DatabaseModule],
  controllers: [],
  providers: [
    {
      provide: AppointmentTimeCreatedUseCase,
      useFactory: (
        appointmentPrismaTimeRepository: AppointmentPrismaTimeRepository,
      ) => {
        return new AppointmentTimeCreatedUseCase(
          appointmentPrismaTimeRepository,
        )
      },
      inject: ['AppointmentPrismaTimeRepository'],
    },
  ],
})
export class AppointmentTimeModule {}
