import { Module } from '@nestjs/common'
import { PrismaService } from '@/shared/enterprise/database/prisma/prisma.servoce'

import { ServiceCreateController } from './infra/controllers/service-create/service-create.controller'
import { ServiceFindManyController } from './infra/controllers/service-find-many/service-find-many.controller'

@Module({
  imports: [],
  controllers: [ServiceCreateController, ServiceFindManyController],
  providers: [PrismaService],
})
export class ServiceModule {}
