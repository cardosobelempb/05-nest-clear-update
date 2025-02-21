import { Module } from '@nestjs/common'
import { PrismaService } from 'src/shared/enterprise/database/prisma/prisma.servoce'

import { ServiceCreateController } from './infra/controllers/service-create/service-create.controller'

@Module({
  imports: [],
  controllers: [ServiceCreateController],
  providers: [PrismaService],
})
export class ServiceModule {}
