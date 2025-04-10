import { AvailableTimeEntity } from '@/anterprise/entity/available-time.entity'
import { NotAllowedError } from '@/shared/application/usecase-erros/not-allowed.erro'
import { Either, right } from '@/shared/infrastructure/handle-erros/either'
import { AvailableTimeNameAlreadyExistsError, UniqueEntityUUID } from '@core'

import { AvailableTimeRepository } from '../../repositories/available-time.repository'

export namespace AvailableTimeCreateProps {
  export interface Request {
    userId: string
    time: string
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
    time,
  }: AvailableTimeCreateProps.Request): Promise<AvailableTimeCreateProps.Response> {
    // const currentTimeName = await this.availableTimeRespository.findByName(time)

    // if (!currentTimeName) {
    //   return left(new AvailableTimeNameAlreadyExistsError(time))
    // }

    const availableTime = AvailableTimeEntity.create({
        userId: new UniqueEntityUUID(userId),
        time,
      })

      await this.availableTimeRespository.create(availableTime)

      return right({
        availableTime,
      })

  }
}

/*
  [V] Time Name => 08:00 === Param time =>  08:00
  [F] Time userId => 97685654-50d2-46d7-b398-21920d10d932 === Param UserId => c8d897e2-7ad3-455d-b697-d76bb62142b2
 */
