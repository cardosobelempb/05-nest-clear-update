import { PrismaService } from '@/shared/infrastructure/database/prisma/prisma.service'
import { Module } from '@nestjs/common'
import { AvailablePrismaTimeRepository } from './application/repositories/prisma/available-time-prisma.repository'

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
      provide: 'AvailablePrismaTimeRepository',
      useFactory: (prismaService: PrismaService) => {
        return new AvailablePrismaTimeRepository(prismaService)
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
      provide: 'AvailablePrismaTimeRepository',
      useFactory: (prismaService: PrismaService) => {
        return new AvailablePrismaTimeRepository(prismaService)
      },
      inject: ['PrismaService'],
    },
  ],
})
export class DatabaseModule {}
