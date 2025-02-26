import { PrismaService } from '@/shared/infrastructure/database/prisma/prisma.service'
import { Module } from '@nestjs/common'
import { AppointmentCategoryCreateController } from './infrastructure/controllers/appointment-category/appointment-category-create/appointment-category-create.controller'
import { AppointmentCategoryFindManyController } from './infrastructure/controllers/appointment-category/appointment-category-find-many/appointment-category-find-many.controller'
import { DatabaseModule } from './database.module'

@Module({
  imports: [DatabaseModule],
  controllers: [],
  providers: [],
})
export class AppointmentCategoryModule {}
