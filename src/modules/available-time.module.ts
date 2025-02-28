import { Module } from '@nestjs/common'
import { AvailablePrismaTimeRepository } from './application/repositories/prisma/available-time-prisma.repository'
import { AvailableTimeCreatedUseCase } from './application/use-cases/available-time/created/available-time-created.usercase'
import { DatabaseModule } from './database.module'
import { AvailableTimeCreateController } from './infrastructure/controllers/available-time/available-time-create/available-time-create.controller'
import { AvailableTimeFindManyController } from './infrastructure/controllers/available-time/available-time-find-many/available-time-find-many.controller'
import { AvailableTimeManyUseCase } from './application/use-cases/available-time/many/available-time-many.usercase'
import { AvailableTimeFindByIdController } from './infrastructure/controllers/available-time/available-time-find-by-id/available-time-find-by-id.controller'
import { AvailableTimeFindByIdUseCase } from './application/use-cases/available-time/find-by-id/available-time-find-by-id.usercase'

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
    {
      provide: AvailableTimeFindByIdUseCase,
      useFactory: (
        availablePrismaTimeRepository: AvailablePrismaTimeRepository,
      ) => {
        return new AvailableTimeFindByIdUseCase(availablePrismaTimeRepository)
      },
      inject: ['AvailablePrismaTimeRepository'],
    },
  ],
})
export class AvailableTimeModule {}
