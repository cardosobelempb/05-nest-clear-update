import { Module } from '@nestjs/common'
import { PrismaService } from 'src/shared/enterprise/database/prisma/prisma.servoce'
import { TimeCreateController } from './infra/controllers/time-create/time-create.controller'

@Module({
  imports: [],
  controllers: [TimeCreateController],
  providers: [PrismaService],
})
export class TimeModule {}
