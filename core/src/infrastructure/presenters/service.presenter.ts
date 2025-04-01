import { ServiceEntity } from '../../anterprise/entity/service.entity'

export class ServicePresenter {
  static toHTTP(service: ServiceEntity) {
    return {
      id: service.id.toString(),
      name: service.name,
      userId: service.userId.toString(),
      categoryId: service.categoryId,
      isActive: service.isActive,
      createdAt: service.createdAt,
      updatedAt: service.updatedAt,
    }
  }
}
