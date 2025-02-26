import { Module } from '@nestjs/common'
import { PrismaService } from '@/shared/infrastructure/database/prisma/prisma.service'
import { AppointmentServiceCreateController } from './infrastructure/controllers/appointment-service/appointment-service-create/appointment-service-create.controller'
import { AppointmentServiceFindManyController } from './infrastructure/controllers/appointment-service/appointment-service-find-many/appointment-service-find-many.controller'
import { DatabaseModule } from './database.module'

@Module({
  imports: [DatabaseModule],
  controllers: [],
  providers: [],
})
export class AppointmentServiceModule {}
