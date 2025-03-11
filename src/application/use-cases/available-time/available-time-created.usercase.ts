import { AvailableTimeEntity } from '@/anterprise/entity/available-time.entity'
import { UniqueEntityUUID } from '@/shared/enterprise/entities/value-objects/unique-entity-uuid/unique-entity-uuid'
import {
  Either,
  left,
  right,
} from '@/shared/infrastructure/handle-erros/either'

import { AvailableTimeRepository } from '../../repositories/available-time.repository'
import { AvailableTimeNameAlreadyExistsError } from '../errors/available-time-name-already-exists.error'
import { NotAllowedError } from '@/shared/application/usecase-erros/not-allowed.erro'

export namespace AvailableTimeCreatedProps {
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

    if (availableTimeName?.name === name) {
      return left(new AvailableTimeNameAlreadyExistsError(name))
    }

    if (userId !== availableTimeName?.userId.toString()) {
      return left(new NotAllowedError())
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
