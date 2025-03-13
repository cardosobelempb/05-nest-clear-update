import { ServiceAttachmentEntity } from '@/anterprise/entity/service-attachment.entity'
import { Pagination } from '@/shared/enterprise/repository/types/pagination'

import { ServiceAttachmentRepository } from '../service-attachment.repository'

export class ServiceAttachmentInMemoryRepository
  implements ServiceAttachmentRepository
{

  public items: ServiceAttachmentEntity[] = []

  async findManyByServiceId(
    serviceId: string,
  ): Promise<ServiceAttachmentEntity[]> {
    const serviceAttachments = this.items.filter(
      item => item.serviceId?.toString() === serviceId,
    )

    return serviceAttachments
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

  async create(entity: ServiceAttachmentEntity) {
    this.items.push(entity)
  }

  async update(entity: ServiceAttachmentEntity) {
    const itemIndex = this.items.findIndex(item => item.id === entity.id)
    this.items[itemIndex] = entity
  }

  async delete(entity: ServiceAttachmentEntity) {
    const itemIndex = this.items.findIndex(item => item.id === entity.id)

    this.items.splice(itemIndex, 1)
  }

  async deleteManyServiceId(serviceId: string): Promise<void> {
    const serviceAttachments = this.items.filter(item => item.serviceId.toString() !== serviceId)
    this.items = serviceAttachments
  }


}
