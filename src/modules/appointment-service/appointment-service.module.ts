import { Module } from '@nestjs/common'
import { PrismaService } from '@/shared/enterprise/database/prisma/prisma.service'

import { AppointmentServiceCreateController } from './infra/controllers/appointment-service-create/appointment-service-create.controller'
import { AppointmentServiceFindManyController } from './infra/controllers/appointment-service-find-many/appointment-service-find-many.controller'

@Module({
  imports: [],
  controllers: [
    AppointmentServiceCreateController,
    AppointmentServiceFindManyController,
  ],
  providers: [PrismaService],
})
export class AppointmentServiceModule {}
