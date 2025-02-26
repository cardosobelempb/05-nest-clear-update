import { AppointmentServiceEntity } from '@/modules/anterprise/entity/appointment-service.entity'
import { AppointmentServiceRepository } from '../appointmen-service.repository'
import { Pagination } from '@/shared/enterprise/repository/types/pagination'

export class AppointmentPrismaServiceRepository
  implements AppointmentServiceRepository
{
  async findById(id: string): Promise<AppointmentServiceEntity | null> {
    throw new Error('Method not implemented.')
  }
  findMany(params: Pagination.Params): Promise<AppointmentServiceEntity[]> {
    throw new Error('Method not implemented.')
  }
  create(entity: AppointmentServiceEntity): Promise<void> {
    throw new Error('Method not implemented.')
  }
  update(entity: AppointmentServiceEntity): Promise<void> {
    throw new Error('Method not implemented.')
  }
  delete(entity: AppointmentServiceEntity): Promise<void> {
    throw new Error('Method not implemented.')
  }
}
