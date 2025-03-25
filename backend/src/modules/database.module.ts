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
      provide: 'UserRepository',
      useFactory: (prismaService: PrismaService) => {
        return new UserPrismaRepository(prismaService)
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
      provide: 'AvailableTimeRepository',
      useClass: AvailableTimePrismaRepository,
    },
    {
      provide: 'UserRepository',
      useFactory: (prismaService: PrismaService) => {
        return new UserPrismaRepository(prismaService)
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
  ],
})
export class DatabaseModule {}
