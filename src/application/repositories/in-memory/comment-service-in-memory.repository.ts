import { CommentServiceEntity } from '@/anterprise/entity/comment-service.entity'
import { Pagination } from '@/shared/enterprise/repository/types/pagination'
import { CommentServiceRepository } from '../commnet-service.repository'

export class CommentServiceInMemoryRepository
  implements CommentServiceRepository
{
  public items: CommentServiceEntity[] = []

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

  async create(entity: CommentServiceEntity) {
    this.items.push(entity)
  }

  async update(entity: CommentServiceEntity) {
    const itemIndex = this.items.findIndex(item => item.id === entity.id)
    this.items[itemIndex] = entity
  }

  async delete(entity: CommentServiceEntity) {
    const itemIndex = this.items.findIndex(item => item.id === entity.id)

    this.items.splice(itemIndex, 1)
  }
}
