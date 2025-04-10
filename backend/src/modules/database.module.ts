import { CategoryPrismaRepository } from '@/application/repositories/prisma/category-prisma.repository'
import { ServicePrismaAttachmentRepository } from '@/application/repositories/prisma/service-prisma-attachment.repository'
import { ServicePrismaRepository } from '@/application/repositories/prisma/service-prisma.repository'
import { PrismaService } from '@/shared/infrastructure/database/prisma/prisma.service'
import { Module } from '@nestjs/common'

import { AvailableTimePrismaRepository } from '../application/repositories/prisma/available-time-prisma.repository'
import { UserPrismaRepository } from '../application/repositories/prisma/user-prisma.repository'

@Module({
  imports: [],
  controllers: [],
  providers: [
    PrismaService,
    {
      provide: 'PrismaService',
      useClass: PrismaService,
    },
    {
      provide: 'UserRepository',
      useClass: UserPrismaRepository,
    },
    {
      provide: 'AvailableTimeRepository',
      useClass: AvailableTimePrismaRepository,
    },
    {
      provide: 'ServiceRepository',
      useClass: ServicePrismaRepository,
    },
    {
      provide: 'CategoryRepository',
      useClass: CategoryPrismaRepository,
    },
    {
      provide: 'ServiceAttachmentRepository',
      useClass: ServicePrismaAttachmentRepository,
    },
    {
      provide: 'UserRepository',
      useFactory: (prismaService: PrismaService) => {
        return new UserPrismaRepository(prismaService)
      },
      inject: ['PrismaService'],
    },
    {
      provide: 'ServiceRepository',
      useFactory: (prismaService: PrismaService) => {
        return new ServicePrismaRepository(prismaService)
      },
      inject: ['PrismaService'],
    },
    {
      provide: 'CategoryRepository',
      useFactory: (prismaService: PrismaService) => {
        return new CategoryPrismaRepository(prismaService)
      },
      inject: ['PrismaService'],
    },
    {
      provide: 'AvailableTimeRepository',
      useFactory: (prismaService: PrismaService) => {
        return new AvailableTimePrismaRepository(prismaService)
      },
      inject: ['PrismaService'],
    },
    {
      provide: 'ServiceAttachmentRepository',
      useFactory: () => {
        return new ServicePrismaAttachmentRepository()
      },
      inject: ['PrismaService'],
    },
  ],
  exports: [
    PrismaService,
    {
      provide: 'PrismaService',
      useClass: PrismaService,
    },
    {
      provide: 'UserRepository',
      useClass: UserPrismaRepository,
    },
    {
      provide: 'ServiceRepository',
      useClass: ServicePrismaRepository,
    },
    {
      provide: 'CategoryRepository',
      useClass: CategoryPrismaRepository,
    },
    {
      provide: 'AvailableTimeRepository',
      useClass: AvailableTimePrismaRepository,
    },
    {
      provide: 'ServiceAttachmentRepository',
      useClass: ServicePrismaAttachmentRepository,
    },
    {
      provide: 'UserRepository',
      useFactory: (prismaService: PrismaService) => {
        return new UserPrismaRepository(prismaService)
      },
      inject: ['PrismaService'],
    },
    {
      provide: 'ServiceRepository',
      useFactory: (prismaService: PrismaService) => {
        return new ServicePrismaRepository(prismaService)
      },
      inject: ['PrismaService'],
    },
    {
      provide: 'CategoryRepository',
      useFactory: (prismaService: PrismaService) => {
        return new CategoryPrismaRepository(prismaService)
      },
      inject: ['PrismaService'],
    },
    {
      provide: 'AvailableTimeRepository',
      useFactory: (prismaService: PrismaService) => {
        return new AvailableTimePrismaRepository(prismaService)
      },
      inject: ['PrismaService'],
    },
    {
      provide: 'ServiceAttachmentRepository',
      useFactory: () => {
        return new ServicePrismaAttachmentRepository()
      },
      inject: ['PrismaService'],
    },
  ],
})
export class DatabaseModule {}
