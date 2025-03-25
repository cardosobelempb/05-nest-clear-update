import { CategoryRepository } from '@/application/repositories/category.repository'
import { NotAllowedError } from '@/shared/application/usecase-erros/not-allowed.erro'
import { ResourceNotFoundError } from '@/shared/application/usecase-erros/resource-not-found.error'
import { Either, left, right } from '@/shared/infrastructure/handle-erros/either'

export namespace CategoryUpdateProps {
  export interface Request {
    categoryId: string
    name: string
    userId: string
  }

  export type Response = Either<ResourceNotFoundError | NotAllowedError, {}>
}

export class CategoryUpdateService {
  constructor(private readonly categoryRepository: CategoryRepository) {}

  async execute({ categoryId, name, userId }: CategoryUpdateProps.Request) {
    const category = await this.categoryRepository.findById(categoryId)

    if (!category) {
      return left(new ResourceNotFoundError())
    }

    if (userId !== category.userId.toString()) {
      return left( new NotAllowedError())
    }

    category.name = name

    await this.categoryRepository.update(category)

      return right({})
  }
}
