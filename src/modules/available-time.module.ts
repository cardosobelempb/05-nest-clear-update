import { Module } from '@nestjs/common'

import { AvailablePrismaTimeRepository } from './application/repositories/prisma/available-time-prisma.repository'

import { AvailableTimeCreatedUseCase } from './application/use-cases/available-time/available-time-created.usercase'
import { AvailableTimeFindByIdUseCase } from './application/use-cases/available-time/available-time-find-by-id.usercase'
import { AvailableTimeManyUseCase } from './application/use-cases/available-time/available-time-many.usercase'
import { DatabaseModule } from './database.module'
import { AvailableTimeCreateController } from './infrastructure/controllers/available-time/available-time-create.controller'
import { AvailableTimeFindByIdController } from './infrastructure/controllers/available-time/available-time-find-by-id.controller'
import { AvailableTimeFindManyController } from './infrastructure/controllers/available-time/available-time-find-many.controller'

@Module({
  imports: [DatabaseModule],
  controllers: [
    AvailableTimeCreateController,
    AvailableTimeFindManyController,
    AvailableTimeFindByIdController,
  ],
  providers: [
    {
      provide: AvailableTimeCreatedUseCase,
      useFactory: (
        availablePrismaTimeRepository: AvailablePrismaTimeRepository,
      ) => {
        return new AvailableTimeCreatedUseCase(availablePrismaTimeRepository)
      },
      inject: [AvailablePrismaTimeRepository],
    },
    {
      provide: AvailableTimeManyUseCase,
      useFactory: (
        availablePrismaTimeRepository: AvailablePrismaTimeRepository,
      ) => {
        return new AvailableTimeManyUseCase(availablePrismaTimeRepository)
      },
      inject: [AvailablePrismaTimeRepository],
    },
    {
      provide: AvailableTimeFindByIdUseCase,
      useFactory: (
        availablePrismaTimeRepository: AvailablePrismaTimeRepository,
      ) => {
        return new AvailableTimeFindByIdUseCase(availablePrismaTimeRepository)
      },
      inject: [AvailablePrismaTimeRepository],
    },
  ],
})
export class AvailableTimeModule {}
