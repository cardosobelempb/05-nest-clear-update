import { CategoryRepository } from '@/application/repositories/category.repository'
import { NotAllowedErro } from '@/shared/application/usecase-erros/not-allowed.erro'
import { ResourceNotFoundErro } from '@/shared/application/usecase-erros/resource-not-found.error'
import { Either, left, right } from '@/shared/infrastructure/handle-erros/either'

export namespace CategoryUpdateProps {
  export interface Request {
    categoryId: string
    name: string
    userId: string
  }

  export type Response = Either<ResourceNotFoundErro | NotAllowedErro, {}>
}

export class CategoryUpdateService {
  constructor(private readonly categoryRepository: CategoryRepository) {}

  async execute({ categoryId, name, userId }: CategoryUpdateProps.Request) {
    const category = await this.categoryRepository.findById(categoryId)

    if (!category) {
      return left(new ResourceNotFoundErro())
    }

    if (userId !== category.userId.toString()) {
      return left( new NotAllowedErro())
    }

    category.name = name

    await this.categoryRepository.update(category)

      return right({})
  }
}
