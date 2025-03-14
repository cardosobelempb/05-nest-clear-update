import { Module } from '@nestjs/common'

import { AvailableTimeRepository } from '../application/repositories/available-time.repository'
import { AvailableTimeCreateService } from '../application/use-cases/available-time/available-time-create.service'
import { AvailableTimeFindByIdUseCase } from '../application/use-cases/available-time/available-time-find-by-id.usercase'
import { AvailableTimeManyUseCase } from '../application/use-cases/available-time/available-time-many.usercase'
import { AvailableTimeUpdateUseCase } from '../application/use-cases/available-time/available-time-update.usercase'
import { AvailableTimeCreateController } from '../infrastructure/controllers/available-time/available-time-create.controller'
import { AvailableTimeFindByIdController } from '../infrastructure/controllers/available-time/available-time-find-by-id.controller'
import { AvailableTimeFindManyController } from '../infrastructure/controllers/available-time/available-time-find-many.controller'
import { AvailableTimeUpdateController } from '../infrastructure/controllers/available-time/available-time-update.controller'
import { DatabaseModule } from './database.module'

@Module({
  imports: [DatabaseModule],
  controllers: [
    AvailableTimeCreateController,
    AvailableTimeFindManyController,
    AvailableTimeFindByIdController,
    AvailableTimeUpdateController,
  ],
  providers: [
    {
      provide: AvailableTimeCreateService,
      useFactory: (availableTimeRepository: AvailableTimeRepository) => {
        return new AvailableTimeCreateService(availableTimeRepository)
      },
      inject: ['AvailableTimeRepository'],
    },
    {
      provide: AvailableTimeManyUseCase,
      useFactory: (availableTimeRepository: AvailableTimeRepository) => {
        return new AvailableTimeManyUseCase(availableTimeRepository)
      },
      inject: ['AvailableTimeRepository'],
    },
    {
      provide: AvailableTimeFindByIdUseCase,
      useFactory: (availableTimeRepository: AvailableTimeRepository) => {
        return new AvailableTimeFindByIdUseCase(availableTimeRepository)
      },
      inject: ['AvailableTimeRepository'],
    },
    {
      provide: AvailableTimeUpdateUseCase,
      useFactory: (availableTimeRepository: AvailableTimeRepository) => {
        return new AvailableTimeUpdateUseCase(availableTimeRepository)
      },
      inject: ['AvailableTimeRepository'],
    },
  ],
})
export class AvailableTimeModule {}
