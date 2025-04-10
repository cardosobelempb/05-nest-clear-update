import { AvailableTimeEntity } from '@/anterprise/entity/available-time.entity'
import { NotAllowedError } from '@/shared/application/usecase-erros/not-allowed.erro'
import { ResourceNotFoundError } from '@/shared/application/usecase-erros/resource-not-found.error'
import { Either, left, right } from '@/shared/infrastructure/handle-erros/either'
import { UniqueEntityUUID } from '@core'

import { AvailableTimeRepository } from '../../repositories/available-time.repository'
import { AvailableTimeNameAlreadyExistsError } from '../errors/available-time-name-already-exists.error'

export namespace AvailableTimeUpdateProps {
  export interface Request {
    time: string
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
    time,
    availableTimeId,
    userId,
  }: AvailableTimeUpdateProps.Request): Promise<AvailableTimeUpdateProps.Response> {
    const availableTime =
      await this.availableTimeRespository.findById(availableTimeId)

    if (!availableTime) {
      return left(new ResourceNotFoundError())
    }

    if (availableTime?.time === time) {
      return left(new AvailableTimeNameAlreadyExistsError(time))
    }

    if (userId !== availableTime.userId.toString()) {
      return left(new NotAllowedError())
    }

    const result = AvailableTimeEntity.create({
      time,
      userId: new UniqueEntityUUID(userId),
    })

    result.time = time

    await this.availableTimeRespository.update(result)

    return right({
      availableTime,
    })
  }
}
