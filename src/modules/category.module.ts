import { PrismaService } from '@/shared/infrastructure/database/prisma/prisma.service'
import { Module } from '@nestjs/common'
import { CategoryCreateController } from './infrastructure/controllers/category/category-create/category-create.controller'
import { CategoryFindManyController } from './infrastructure/controllers/category/category-find-many/category-find-many.controller'
import { DatabaseModule } from './database.module'

@Module({
  imports: [DatabaseModule],
  controllers: [],
  providers: [],
})
export class CategoryModule {}
