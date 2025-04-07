import { AvailableTimeEntity } from '@/anterprise/entity/available-time.entity'
import { NotAllowedError } from '@/shared/application/usecase-erros/not-allowed.erro'
import { UniqueEntityUUID } from '@/shared/enterprise/entities/value-objects/unique-entity-uuid/unique-entity-uuid'
import { Either, left, right } from '@/shared/infrastructure/handle-erros/either'
import { AvailableTimeNameAlreadyExistsError } from '@core'

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
    const currentTimeName = await this.availableTimeRespository.findByName(time)

    if (currentTimeName === null) {
      console.log('IF 01')
      return left(new AvailableTimeNameAlreadyExistsError(time))
    }
    console.log('Time Name =>', currentTimeName.time)
    console.log('Param time => ', time)
    console.log('Time userId =>', currentTimeName.userId.toString())
    console.log('Param UserId =>', userId)

    if (currentTimeName.userId.toString() === userId) {
      console.log('IF 02')
      return left(new AvailableTimeNameAlreadyExistsError(time))
    } else if (currentTimeName.time !== time && currentTimeName.userId.toString() !== userId ) {
      console.log('IF 03')
      return left(new AvailableTimeNameAlreadyExistsError(time))
    } else if (currentTimeName.userId.toString() === userId || currentTimeName.time !== time) {
      console.log('IF 04')
      return left(new AvailableTimeNameAlreadyExistsError(time))
    } else {
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
}

/*
  [V] Time Name => 08:00 === Param time =>  08:00
  [F] Time userId => 97685654-50d2-46d7-b398-21920d10d932 === Param UserId => c8d897e2-7ad3-455d-b697-d76bb62142b2
 */
