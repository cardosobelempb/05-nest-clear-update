import { CategoryEntity } from '@/modules/anterprise/entity/category.entity'
import { RepositoryAbstract } from '@/shared/enterprise/repository/repository.abstract'

export abstract class CategoryRepository extends RepositoryAbstract<CategoryEntity> {}
