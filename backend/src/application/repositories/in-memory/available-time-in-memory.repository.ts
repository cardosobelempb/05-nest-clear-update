import { AvailableTimeEntity } from '@/anterprise/entity/available-time.entity'
import { Pagination } from '@/shared/enterprise/repository/types/pagination'

import { AvailableTimeRepository } from '../available-time.repository'

export class AvailableTimeInMemoryRepository
  implements AvailableTimeRepository
{
  public items: AvailableTimeEntity[] = []

  constructor() {}
  async findByName(name: string): Promise<AvailableTimeEntity | null> {
    const availableTime = this.items.find(item => item.time === name)

    if (!availableTime) {
      return null
    }

    return availableTime
  }

  async findById(id: string) {
    const availableTime = this.items.find(item => item.id.toString() === id)

    if (!availableTime) {
      return null
    }

    return availableTime
  }

  async findMany({ page }: Pagination.Params) {
    const availableTimes = this.items
      .sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime())
      .slice((page - 1) * 20, page * 20)

    return availableTimes
  }

  async create(entity: AvailableTimeEntity) {
    this.items.push(entity)
  }

  async created(entity: AvailableTimeEntity): Promise<AvailableTimeEntity | null> {
    this.items.push(entity)

    const availableTime = this.findById(entity.id.toString())

    if (!availableTime) {
      return null
    }

    return availableTime
  }

  async update(entity: AvailableTimeEntity) {
    const itemIndex = this.items.findIndex(item => item.id === entity.id)
    this.items[itemIndex] = entity
  }

  async delete(entity: AvailableTimeEntity) {
    const itemIndex = this.items.findIndex(item => item.id === entity.id)

    this.items.splice(itemIndex, 1)
  }
}
