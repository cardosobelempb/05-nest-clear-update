import { AppointmentCategoryEntity } from '@/modules/anterprise/entity/appointment-category.entity'
import { RepositoryAbstract } from '@/shared/enterprise/repository/repository.abstract'

export abstract class AppointmentCategoryRepository extends RepositoryAbstract<AppointmentCategoryEntity> {}
