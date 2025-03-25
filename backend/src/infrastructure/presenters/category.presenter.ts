import { CategoryEntity } from '@/anterprise/entity/category.entity'

export class CategoryPresenter {
  static toHTTP(category: CategoryEntity) {
    return {
      id: category.id.toString(),
      name: category.name,
      userId: category.userId.toString(),
      isActive: category.isActive,
      createdAt: category.createdAt,
      updatedAt: category.updatedAt,
    }
  }
}
