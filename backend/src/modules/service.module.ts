import { CategoryRepository } from '@/application/repositories/category.repository'
import { ServiceAttachmentRepository } from '@/application/repositories/service-attachment.repository'
import { ServiceRepository } from '@/application/repositories/service.repository'
import { ServiceCreateService } from '@/application/use-cases/service/service-create.service'
import { ServiceManyService } from '@/application/use-cases/service/service-many.service'
import { ServiceUpdateService } from '@/application/use-cases/service/service-update.service'
import { ServiceCreateController } from '@/infrastructure/controllers/service/service-create.controller'
import { ServiceFindManyController } from '@/infrastructure/controllers/service/service-find-many.controller'
import { ServiceUpdateController } from '@/infrastructure/controllers/service/service-update.controller'
import { Module } from '@nestjs/common'

import { DatabaseModule } from './database.module'

@Module({
  imports: [DatabaseModule],
  controllers: [
    ServiceCreateController,
    ServiceFindManyController,
    ServiceUpdateController,
  ],
  providers: [
    {
      provide: ServiceCreateService,
      useFactory: (serviceRepository: ServiceRepository) => {
        return new ServiceCreateService(serviceRepository)
      },
      inject: ['ServiceRepository'],
    },
    {
      provide: ServiceManyService,
      useFactory: (serviceRepository: ServiceRepository) => {
        return new ServiceManyService(serviceRepository)
      },
      inject: ['ServiceRepository'],
    },
    {
      provide: ServiceUpdateService,
      useFactory: (
        serviceAttachmentRepository: ServiceAttachmentRepository,
        serviceRepository: ServiceRepository,
        categoryRepository: CategoryRepository,
      ) => {
        return new ServiceUpdateService(
          serviceAttachmentRepository,
          serviceRepository,
          categoryRepository,
        )
      },
      inject: [
        'ServiceAttachmentRepository',
        'ServiceRepository',
        'CategoryRepository',
      ],
    },
  ],
})
export class ServiceModule {}
