import { NotificationEntity } from '@/anterprise/entity/notification.entity'
import { Pagination } from '@/shared/enterprise/repository/types/pagination'

import { NotificationRepository } from '../notifications-repository'

export class NotificationInMemoryRepository implements NotificationRepository {
  public items: NotificationEntity[] = []

  findMany(params: Pagination.Params): Promise<NotificationEntity[]> {
    throw new Error('Method not implemented.')
  }

  async findById(id: string) {
    const notification = this.items.find(item => item.id.toString() === id)

    if (!notification) {
      return null
    }

    return notification
  }

  async create(entity: NotificationEntity): Promise<void> {
    this.items.push(entity)
  }

  async update(entity: NotificationEntity) {
    const itemIndex = this.items.findIndex(item => item.id === entity.id)
    this.items[itemIndex] = entity
  }

  async delete(entity: NotificationEntity) {
    const itemIndex = this.items.findIndex(item => item.id === entity.id)

    this.items.splice(itemIndex, 1)
  }
}
