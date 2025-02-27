import { CategoryEntity } from '@/modules/anterprise/entity/category.entity'
import { CategoryRepository } from '../category.repository'
import { Pagination } from '@/shared/enterprise/repository/types/pagination'

export class PrismaCategoryRepository implements CategoryRepository {
  findById(id: string): Promise<CategoryEntity | null> {
    throw new Error('Method not implemented.')
  }
  findMany(params: Pagination.Params): Promise<CategoryEntity[]> {
    throw new Error('Method not implemented.')
  }
  create(entity: CategoryEntity): Promise<void> {
    throw new Error('Method not implemented.')
  }
  update(entity: CategoryEntity): Promise<void> {
    throw new Error('Method not implemented.')
  }
  delete(entity: CategoryEntity): Promise<void> {
    throw new Error('Method not implemented.')
  }
}
