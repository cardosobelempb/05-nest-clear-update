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
      return left(new AvailableTimeNameAlreadyExistsError(time))
    }

    console.log('AvailableTimeCreateService =>', currentTimeName)


    if (currentTimeName.userId.toString() === userId || currentTimeName.time === time) {
      console.log('TRUE')

      const availableTime = AvailableTimeEntity.create({
        userId: new UniqueEntityUUID(userId),
        time,
      })
      await this.availableTimeRespository.create(availableTime)

      return right({
        availableTime,
      })
    } else {
       console.log('ELSE')
      return left(new AvailableTimeNameAlreadyExistsError(time))
    }
  }
}
