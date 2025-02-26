import { PrismaService } from '@/shared/infrastructure/database/prisma/prisma.service'
import { Module } from '@nestjs/common'
import { AppointmentPrismaTimeRepository } from './application/repositories/prisma/appointment-prisma-time.repository'

@Module({
  imports: [],
  controllers: [],
  providers: [
    {
      provide: 'PrismaService',
      useClass: PrismaService,
    },
    {
      provide: 'AppointmentPrismaTimeRepository',
      useFactory: (prismaService: PrismaService) => {
        return new AppointmentPrismaTimeRepository(prismaService)
      },
      inject: ['PrismaService'],
    },
  ],
  exports: [
    {
      provide: 'PrismaService',
      useClass: PrismaService,
    },
    {
      provide: 'AppointmentPrismaTimeRepository',
      useFactory: (prismaService: PrismaService) => {
        return new AppointmentPrismaTimeRepository(prismaService)
      },
      inject: ['PrismaService'],
    },
  ],
})
export class DatabaseModule {}
