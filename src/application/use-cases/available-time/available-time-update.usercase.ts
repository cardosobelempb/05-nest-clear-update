import { AvailableTimeEntity } from '@/anterprise/entity/available-time.entity'
import { UniqueEntityUUID } from '@/shared/enterprise/entities/value-objects/unique-entity-uuid/unique-entity-uuid'
import {
  Either,
  left,
  right,
} from '@/shared/infrastructure/handle-erros/either'

import { AvailableTimeRepository } from '../../repositories/available-time.repository'
import { AvailableTimeNameAlreadyExistsError } from '../errors/available-time-name-already-exists.error'
import { NotAllowedError } from '../errors/not-allowed-error'
import { ResourceNotFoundError } from '../errors/resource-not-found-error'

export namespace AvailableTimeUpdateProps {
  export interface Request {
    name: string
    availableTimeId: string
    userId: string
  }

  export type Response = Either<
    | ResourceNotFoundError
    | NotAllowedError
    | AvailableTimeNameAlreadyExistsError,
    {
      availableTime: AvailableTimeEntity
    }
  >
}

export class AvailableTimeUpdateUseCase {
  constructor(
    private readonly availableTimeRespository: AvailableTimeRepository,
  ) {}

  async execute({
    name,
    availableTimeId,
    userId,
  }: AvailableTimeUpdateProps.Request): Promise<AvailableTimeUpdateProps.Response> {
    const availableTime =
      await this.availableTimeRespository.findById(availableTimeId)

    if (!availableTime) {
      return left(new ResourceNotFoundError())
    }

    if (availableTime?.name === name) {
      return left(new AvailableTimeNameAlreadyExistsError(name))
    }

    if (userId !== availableTime.userId.toString()) {
      return left(new NotAllowedError())
    }

    const result = AvailableTimeEntity.create({
      name,
      userId: new UniqueEntityUUID(userId),
    })

    result.name = name

    await this.availableTimeRespository.update(result)

    return right({
      availableTime,
    })
  }
}
