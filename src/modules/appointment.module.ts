import { Module } from '@nestjs/common'
import { PrismaService } from '@/shared/enterprise/database/prisma/prisma.service'
import { AppointmentCreateController } from './infra/controllers/appointment/appointment-create/appointment-create.controller'
import { AppointmentFindManyController } from './infra/controllers/appointment/appointment-find-many/appointment-find-many.controller'

@Module({
  imports: [],
  controllers: [AppointmentCreateController, AppointmentFindManyController],
  providers: [PrismaService],
})
export class AppointmentModule {}
