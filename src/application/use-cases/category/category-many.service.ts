import { CategoryEntity } from "@/anterprise/entity/category.entity";
import { CategoryRepository } from "@/application/repositories/category.repository";
import { Either, right } from "@/shared/infrastructure/handle-erros/either";

export namespace CategoryManyProps {
  export interface Request {
    page: number
  }

  export type Response = Either<
    null,
    {
      categories: CategoryEntity[]
    }
    >
}

export class CategoryManyService {

  constructor(private readonly categoryRepository: CategoryRepository){}

  async execute({page}: CategoryManyProps.Request): Promise<CategoryManyProps.Response> {
    const categories = await this.categoryRepository.findMany({ page })
    return right({
      categories
    })
  }
}
