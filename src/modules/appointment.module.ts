import { Module } from '@nestjs/common'
import { PrismaService } from '@/shared/infrastructure/database/prisma/prisma.service'
import { AppointmentCreateController } from './infrastructure/controllers/appointment/appointment-create/appointment-create.controller'
import { AppointmentFindManyController } from './infrastructure/controllers/appointment/appointment-find-many/appointment-find-many.controller'
import { DatabaseModule } from './database.module'

@Module({
  imports: [DatabaseModule],
  controllers: [],
  providers: [],
})
export class AppointmentModule {}
