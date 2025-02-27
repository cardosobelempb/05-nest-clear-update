import { ServiceEntity } from '@/modules/anterprise/entity/service.entity'
import { Pagination } from '@/shared/enterprise/repository/types/pagination'
import { ServiceRepository } from '../service.repository'

export class PrismaServiceRepository implements ServiceRepository {
  async findById(id: string): Promise<ServiceEntity | null> {
    throw new Error('Method not implemented.')
  }
  findMany(params: Pagination.Params): Promise<ServiceEntity[]> {
    throw new Error('Method not implemented.')
  }
  create(entity: ServiceEntity): Promise<void> {
    throw new Error('Method not implemented.')
  }
  update(entity: ServiceEntity): Promise<void> {
    throw new Error('Method not implemented.')
  }
  delete(entity: ServiceEntity): Promise<void> {
    throw new Error('Method not implemented.')
  }
}
