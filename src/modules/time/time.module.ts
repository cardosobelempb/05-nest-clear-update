import { Module } from '@nestjs/common'
import { PrismaService } from 'src/shared/enterprise/database/prisma/prisma.servoce'
import { TimeCreateController } from './infra/controllers/time-create/time-create.controller'
import { TimeFindManyController } from './infra/controllers/time-find-many/time-find-many.controller'

@Module({
  imports: [],
  controllers: [TimeCreateController, TimeFindManyController],
  providers: [PrismaService],
})
export class TimeModule {}
