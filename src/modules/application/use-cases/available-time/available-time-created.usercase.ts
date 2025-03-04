import { AvailableTimeEntity } from '@/modules/anterprise/entity/available-time.entity'
import { UniqueEntityUUID } from '@/shared/enterprise/entities/value-objects/unique-entity-uuid/unique-entity-uuid'
import { Either, left, right } from '@/shared/infrastructure/handle-erros/either'

import { AvailableTimeRepository } from '../../repositories/available-time.repository'
import { AvailableTimeNameAlreadyExistsError } from '../errors/available-time-name-already-exists.error'

export namespace AvailableTimeCreatedProps {
  export interface Request {
    userId: string
    name: string
  }

  export type Response = Either<
    AvailableTimeNameAlreadyExistsError,
    {
      availableTime: AvailableTimeEntity
    }
  >
}

export class AvailableTimeCreatedUseCase {
  constructor(
    private readonly availableTimeRespository: AvailableTimeRepository,
  ) {}

  async execute({
    name,
    userId,
  }: AvailableTimeCreatedProps.Request): Promise<AvailableTimeCreatedProps.Response> {
    const availableTimeName =
      await this.availableTimeRespository.findByName(name)

    if (
      availableTimeName?.name === name &&
      availableTimeName?.userId.toString() === userId
    ) {
      return left(new AvailableTimeNameAlreadyExistsError(name))
    }

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
