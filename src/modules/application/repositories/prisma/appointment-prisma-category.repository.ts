import { AppointmentCategoryEntity } from '@/modules/anterprise/entity/appointment-category.entity'
import { AppointmentCategoryRepository } from '../appointmen-category.repository'
import { Pagination } from '@/shared/enterprise/repository/types/pagination'

export class AppointmentPrismaCategoryRepository
  implements AppointmentCategoryRepository
{
  findById(id: string): Promise<AppointmentCategoryEntity | null> {
    throw new Error('Method not implemented.')
  }
  findMany(params: Pagination.Params): Promise<AppointmentCategoryEntity[]> {
    throw new Error('Method not implemented.')
  }
  create(entity: AppointmentCategoryEntity): Promise<void> {
    throw new Error('Method not implemented.')
  }
  update(entity: AppointmentCategoryEntity): Promise<void> {
    throw new Error('Method not implemented.')
  }
  delete(entity: AppointmentCategoryEntity): Promise<void> {
    throw new Error('Method not implemented.')
  }
}
