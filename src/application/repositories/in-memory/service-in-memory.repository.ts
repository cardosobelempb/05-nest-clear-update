import { ServiceEntity } from '@/anterprise/entity/service.entity'
import { Pagination } from '@/shared/enterprise/repository/types/pagination'

import { ServiceRepository } from '../service.repository'

export class ServiceInMemoryRepository implements ServiceRepository {
  public items: ServiceEntity[] = []

  async findByCategoryId(categoryId: string): Promise<ServiceEntity | null> {
    const service = this.items.find(
      item => item.categoryId?.toString() === categoryId,
    )

    if (!service) {
      return null
    }

    return service
  }

  async findManyByCategoryId(
    categoryId: string,
    { page }: Pagination.Params,
  ): Promise<ServiceEntity[]> {
    const services = this.items
      .filter(item => item.categoryId?.toString() === categoryId)
      .slice((page - 1) * 20, page * 20)

    return services
  }

  async findById(id: string) {
    const service = this.items.find(item => item.id.toString() === id)

    if (!service) {
      return null
    }

    return service
  }

  async findMany({ page }: Pagination.Params) {
    const services = this.items
      .sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime())
      .slice((page - 1) * 20, page * 20)

    return services
  }

  async create(entity: ServiceEntity) {
    this.items.push(entity)
  }

  async update(entity: ServiceEntity) {
    const itemIndex = this.items.findIndex(item => item.id === entity.id)
    this.items[itemIndex] = entity
  }

  async delete(entity: ServiceEntity) {
    const itemIndex = this.items.findIndex(item => item.id === entity.id)

    this.items.splice(itemIndex, 1)
  }
}
