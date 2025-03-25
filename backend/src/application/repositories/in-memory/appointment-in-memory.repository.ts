import { AppointmentEntity } from '@/anterprise/entity/appointment.entity'
import { UserEntity } from '@/anterprise/entity/user.entity'
import { Pagination } from '@/shared/enterprise/repository/types/pagination'
import { DomainEvents } from '@/shared/infrastructure/events/domain-events'

import { AppointmentRepository } from '../appointmen.repository'

export class AppointmentInMemoryRepository implements AppointmentRepository {
  public items: AppointmentEntity[] = []

  findManyByServiceId(
    serviceId: string,
    { page }: Pagination.Params,
  ): Promise<AppointmentEntity[]> {
    throw new Error('Method not implemented.')
  }

  findManyByAvailableTimeId(
    availableTimeId: string,
    { page }: Pagination.Params,
  ): Promise<AppointmentEntity[]> {
    throw new Error('Method not implemented.')
  }

  async findById(id: string) {
    const appointment = this.items.find(item => item.id.toString() === id)

    if (!appointment) {
      return null
    }

    return appointment
  }

  async findMany({ page }: Pagination.Params) {
    const appointments = this.items
      .sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime())
      .slice((page - 1) * 20, page * 20)

    return appointments
  }

  async create(entity: AppointmentEntity) {
    this.items.push(entity)
    DomainEvents.dispatchEventsForAggregate(entity.id)
  }

  async update(entity: AppointmentEntity) {
    const itemIndex = this.items.findIndex(item => item.id === entity.id)
    this.items[itemIndex] = entity
    DomainEvents.dispatchEventsForAggregate(entity.id)
  }

  async delete(entity: AppointmentEntity) {
    const itemIndex = this.items.findIndex(item => item.id === entity.id)

    this.items.splice(itemIndex, 1)
  }
}
