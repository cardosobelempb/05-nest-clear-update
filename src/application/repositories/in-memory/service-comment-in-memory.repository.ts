import { ServiceCommnetEntity } from '@/anterprise/entity/service-comment.entity'
import { Pagination } from '@/shared/enterprise/repository/types/pagination'
import { ServiceCommentRepository } from '../service-commnet.repository'

export class ServiceCommentInMemoryRepository
  implements ServiceCommentRepository
{
  public items: ServiceCommnetEntity[] = []

  async findById(id: string) {
    const commentService = this.items.find(item => item.id.toString() === id)

    if (!commentService) {
      return null
    }

    return commentService
  }

  async findManyServiceId(serviceId: string, { page }: Pagination.Params) {
    const commentServices = this.items
      .filter(item => item.serviceId.toString() === serviceId)
      .sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime())
      .slice((page - 1) * 20, page * 20)

    return commentServices
  }

  async findMany({ page }: Pagination.Params) {
    const commentService = this.items
      .sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime())
      .slice((page - 1) * 20, page * 20)

    return commentService
  }

  async create(entity: ServiceCommnetEntity) {
    this.items.push(entity)
  }

  async update(entity: ServiceCommnetEntity) {
    const itemIndex = this.items.findIndex(item => item.id === entity.id)
    this.items[itemIndex] = entity
  }

  async delete(entity: ServiceCommnetEntity) {
    const itemIndex = this.items.findIndex(item => item.id === entity.id)

    this.items.splice(itemIndex, 1)
  }
}
