import { AppointmentEntity } from '@/modules/anterprise/entity/appointment.entity'
import { AppointmentRepository } from '../appointmen.repository'
import { Pagination } from '@/shared/enterprise/repository/types/pagination'

export class AppointmentPrismaRepository implements AppointmentRepository {
  findById(id: string): Promise<AppointmentEntity | null> {
    throw new Error('Method not implemented.')
  }
  findMany(params: Pagination.Params): Promise<AppointmentEntity[]> {
    throw new Error('Method not implemented.')
  }
  create(entity: AppointmentEntity): Promise<void> {
    throw new Error('Method not implemented.')
  }
  update(entity: AppointmentEntity): Promise<void> {
    throw new Error('Method not implemented.')
  }
  delete(entity: AppointmentEntity): Promise<void> {
    throw new Error('Method not implemented.')
  }
}
