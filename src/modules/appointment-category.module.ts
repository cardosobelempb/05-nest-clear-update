import { PrismaService } from '@/shared/enterprise/database/prisma/prisma.service'
import { Module } from '@nestjs/common'
import { AppointmentCategoryCreateController } from './infrastructure/controllers/appointment-category/appointment-category-create/appointment-category-create.controller'
import { AppointmentCategoryFindManyController } from './infrastructure/controllers/appointment-category/appointment-category-find-many/appointment-category-find-many.controller'

@Module({
  imports: [],
  controllers: [
    AppointmentCategoryCreateController,
    AppointmentCategoryFindManyController,
  ],
  providers: [PrismaService],
})
export class AppointmentCategoryModule {}
