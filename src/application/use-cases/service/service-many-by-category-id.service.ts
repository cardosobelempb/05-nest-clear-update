import { ServiceEntity } from '@/anterprise/entity/service.entity'
import { ServiceRepository } from '@/application/repositories/service.repository'
import { Either, right } from '@/shared/infrastructure/handle-erros/either'

export namespace ServiceManyByCategoryIdProps {
  export interface Request {
    categoryId: string
    page: number
  }

  export type Response = Either<null, { services: ServiceEntity[] }>
}

export class ServiceManyByCategoryIdService {
  constructor(private readonly serviceRepository: ServiceRepository) {}
  async execute({
    categoryId,
    page,
  }: ServiceManyByCategoryIdProps.Request): Promise<ServiceManyByCategoryIdProps.Response> {
    const services = await this.serviceRepository.findManyByCategoryId(
      categoryId,
      { page },
    )

    return right({ services })
  }
}
