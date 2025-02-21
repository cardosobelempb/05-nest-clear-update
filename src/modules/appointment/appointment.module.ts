import { Module } from '@nestjs/common'
import { PrismaService } from 'src/shared/enterprise/database/prisma/prisma.servoce'
import { AppointmentCreateController } from './infra/controllers/appointment-create/appointment-create.controller'

@Module({
  imports: [],
  controllers: [AppointmentCreateController],
  providers: [PrismaService],
})
export class AppointmentModule {}
