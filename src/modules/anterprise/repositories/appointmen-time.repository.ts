import { RepositoryAbstract } from '@/shared/enterprise/repository/repository.abstract'
import { AppointmentTimeEntity } from '../entity/appointment-time.entity'
import { Pagination } from '@/shared/enterprise/repository/types/pagination'

export class AppointmentTimeRepository extends RepositoryAbstract<AppointmentTimeEntity> {
  findById(id: string): Promise<AppointmentTimeEntity | null> {
    throw new Error('Method not implemented.')
  }
  findMany(params: Pagination.Params): Promise<AppointmentTimeEntity[]> {
    throw new Error('Method not implemented.')
  }
  create(entity: AppointmentTimeEntity): Promise<void> {
    throw new Error('Method not implemented.')
  }
  update(entity: AppointmentTimeEntity): Promise<void> {
    throw new Error('Method not implemented.')
  }
  delete(entity: AppointmentTimeEntity): Promise<void> {
    throw new Error('Method not implemented.')
  }
}
