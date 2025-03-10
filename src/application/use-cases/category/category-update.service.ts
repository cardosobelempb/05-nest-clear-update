import { CategoryRepository } from '@/application/repositories/category.repository'
import { NotAllowedErro } from '@/shared/application/usecase-erros/not-allowed.erro'
import { ResourceNotFoundErro } from '@/shared/application/usecase-erros/resource-not-found.error'

export namespace CategoryUpdateProps {
  export interface Request {
    categoryId: string
    name: string
    userId: string
  }

  export type Response = {}
}

export class CategoryUpdateService {
  constructor(private readonly categoryRepository: CategoryRepository) {}

  async execute({ categoryId, name, userId }: CategoryUpdateProps.Request) {
    const category = await this.categoryRepository.findById(categoryId)

    if (!category) {
      throw new ResourceNotFoundErro()
    }

    if (userId !== category.userId.toString()) {
      throw new NotAllowedErro()
    }

    category.name = name

    await this.categoryRepository.update(category)

    return {}
  }
}
