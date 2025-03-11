import { AvailableTimeEntity } from '@/anterprise/entity/available-time.entity'
import { NotAllowedError } from '@/shared/application/usecase-erros/not-allowed.erro'
import { UniqueEntityUUID } from '@/shared/enterprise/entities/value-objects/unique-entity-uuid/unique-entity-uuid'
import { Either, right } from '@/shared/infrastructure/handle-erros/either'

import { AvailableTimeRepository } from '../../repositories/available-time.repository'
import { AvailableTimeNameAlreadyExistsError } from '../errors/available-time-name-already-exists.error'

export namespace AvailableTimeCreateProps {
  export interface Request {
    userId: string
    name: string
  }

  export type Response = Either<
    AvailableTimeNameAlreadyExistsError | NotAllowedError,
    {
      availableTime: AvailableTimeEntity
    }
  >
}

export class AvailableTimeCreateService {
  constructor(
    private readonly availableTimeRespository: AvailableTimeRepository,
  ) {}

  async execute({
    userId,
    name,
  }: AvailableTimeCreateProps.Request): Promise<AvailableTimeCreateProps.Response> {

    const availableTime = AvailableTimeEntity.create({
      userId: new UniqueEntityUUID(userId),
      name,
    })

    await this.availableTimeRespository.create(availableTime)

    return right({
      availableTime,
    })
  }
}
