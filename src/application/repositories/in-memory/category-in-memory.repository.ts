import { CategoryEntity } from '@/anterprise/entity/category.entity'
import { Pagination } from '@/shared/enterprise/repository/types/pagination'
import { CategoryRepository } from '../category.repository'

export class CategoryInMemoryRepository implements CategoryRepository {
  public items: CategoryEntity[] = []

  async findById(id: string) {
    const question = this.items.find(item => item.id.toString() === id)

    if (!question) {
      return null
    }

    return question
  }

  async findMany({ page }: Pagination.Params) {
    const questions = this.items
      .sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime())
      .slice((page - 1) * 20, page * 20)

    return questions
  }

  async create(entity: CategoryEntity) {
    this.items.push(entity)
  }

  async update(entity: CategoryEntity) {
    const itemIndex = this.items.findIndex(item => item.id === entity.id)
    this.items[itemIndex] = entity
  }

  async delete(entity: CategoryEntity) {
    const itemIndex = this.items.findIndex(item => item.id === entity.id)

    this.items.splice(itemIndex, 1)
  }
}
