import { UserEntity } from '@/anterprise/entity/user.entity'
import { Pagination } from '@/shared/enterprise/repository/types/pagination'

import { UserRepository } from '../user.repository'

export class UserInMemoryRepository implements UserRepository {
  findByEmail(email: string): Promise<UserEntity | null> {
    throw new Error('Method not implemented.')
  }

  public items: UserEntity[] = []

  async findById(id: string) {
    const question = this.items.find(item => item.id.toString() === id)

    if (!question) {
      return null
    }

    return question
  }

  async findMany({ page }: Pagination.Params) {
    const questions = this.items
      .sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime())
      .slice((page - 1) * 20, page * 20)

    return questions
  }

  async create(entity: UserEntity) {
    this.items.push(entity)
  }

  async update(entity: UserEntity) {
    const itemIndex = this.items.findIndex(item => item.id === entity.id)
    this.items[itemIndex] = entity
  }

  async delete(entity: UserEntity) {
    const itemIndex = this.items.findIndex(item => item.id === entity.id)

    this.items.splice(itemIndex, 1)
  }
}
