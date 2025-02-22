import { Module } from '@nestjs/common'
import { PrismaService } from 'src/shared/enterprise/database/prisma/prisma.servoce'
import { AppointmentCreateController } from './infra/controllers/appointment-create/appointment-create.controller'
import { AppointmentFindManyController } from './infra/controllers/appointment-find-many/appointment-find-many.controller'

@Module({
  imports: [],
  controllers: [AppointmentCreateController, AppointmentFindManyController],
  providers: [PrismaService],
})
export class AppointmentModule {}
