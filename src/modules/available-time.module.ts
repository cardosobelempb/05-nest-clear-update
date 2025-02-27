import { Module } from '@nestjs/common'
import { AvailablePrismaTimeRepository } from './application/repositories/prisma/available-time-prisma.repository'
import { AvailableTimeCreatedUseCase } from './application/use-cases/available-time/created/available-time-created.usercase'
import { DatabaseModule } from './database.module'
import { AvailableTimeCreateController } from './infrastructure/controllers/available-time/available-time-create/available-time-create.controller'
import { AvailableTimeFindManyController } from './infrastructure/controllers/available-time/available_time-find-many/available-time-find-many.controller'
import { AvailableTimeManyUseCase } from './application/use-cases/available-time/many/available-time-many.usercase'

@Module({
  imports: [DatabaseModule],
  controllers: [AvailableTimeCreateController, AvailableTimeFindManyController],
  providers: [
    {
      provide: AvailableTimeCreatedUseCase,
      useFactory: (
        availablePrismaTimeRepository: AvailablePrismaTimeRepository,
      ) => {
        return new AvailableTimeCreatedUseCase(availablePrismaTimeRepository)
      },
      inject: ['AvailablePrismaTimeRepository'],
    },
    {
      provide: AvailableTimeManyUseCase,
      useFactory: (
        availablePrismaTimeRepository: AvailablePrismaTimeRepository,
      ) => {
        return new AvailableTimeManyUseCase(availablePrismaTimeRepository)
      },
      inject: ['AvailablePrismaTimeRepository'],
    },
  ],
})
export class AvailableTimeModule {}
