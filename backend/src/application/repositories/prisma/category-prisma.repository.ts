import { PrismaService } from '@/shared/infrastructure/database/prisma/prisma.service'
import { CategoryEntity, Pagination } from '@core'

import { CategoryRepository } from '../category.repository'
import { CategoryPrismaMapper } from './mappers/category-prisma.mapper'

export class CategoryPrismaRepository implements CategoryRepository {
  constructor(private readonly prisma: PrismaService) {}

  async findById(id: string): Promise<CategoryEntity | null> {
    const category = await this.prisma.category.findUnique({
      where: {
        id,
      },
    })

    if (!category) {
      return null
    }

    return CategoryPrismaMapper.toDomain(category)
  }

  async findMany({ page }: Pagination.Params): Promise<CategoryEntity[]> {
    const categories = await this.prisma.category.findMany({
      take: 20,
      skip: (page - 1) * 20,
      orderBy: {
        createdAt: 'desc',
      },
    })
    return categories.map(CategoryPrismaMapper.toDomain)
  }

  async create(entity: CategoryEntity): Promise<void> {
    const data = CategoryPrismaMapper.toPrisma(entity)
    await this.prisma.category.create({ data })
  }

  async update(entity: CategoryEntity): Promise<void> {
    const data = CategoryPrismaMapper.toPrisma(entity)
    await this.prisma.category.update({
      where: {
        id: entity.id.toString(),
      },
      data,
    })
  }

  async delete(entity: CategoryEntity): Promise<void> {
    const data = CategoryPrismaMapper.toPrisma(entity)
    await this.prisma.category.delete({
      where: {
        id: entity.id.toString(),
      },
    })
  }
}
