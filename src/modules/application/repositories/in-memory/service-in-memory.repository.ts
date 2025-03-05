import { ServiceEntity } from "@/modules/anterprise/entity/service.entity"
import { Pagination } from "@/shared/enterprise/repository/types/pagination"

import { ServiceRepository } from "../service.repository"

export class ServiceInMemoryRepository implements ServiceRepository{
  findManyByUserId(user: string, { page }: Pagination.Params): Promise<ServiceEntity[]> {
    throw new Error("Method not implemented.")
  }
  findManyByCategoryId(category: string, { page }: Pagination.Params): Promise<ServiceEntity[]> {
    throw new Error("Method not implemented.")
  }

  public items:ServiceEntity[] = []

  async findById(id: string) {
    const question = this.items.find((item) => item.id.toString() === id)

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

  async create(entity:ServiceEntity) {
    this.items.push(entity)
  }

  async update(entity:ServiceEntity) {
    const itemIndex = this.items.findIndex((item) => item.id === entity.id)
    this.items[itemIndex] = entity
  }

  async delete(entity:ServiceEntity) {
    const itemIndex = this.items.findIndex((item) => item.id === entity.id)

    this.items.splice(itemIndex, 1)

 }
}
