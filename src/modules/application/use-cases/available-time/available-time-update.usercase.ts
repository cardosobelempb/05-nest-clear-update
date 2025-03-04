import { AvailableTimeEntity } from '@/modules/anterprise/entity/available-time.entity'
import { AvailablePrismaTimeRepository } from '@/modules/application/repositories/prisma/available-time-prisma.repository'
import { UniqueEntityUUID } from '@/shared/enterprise/entities/value-objects/unique-entity-uuid/unique-entity-uuid'
import { Either, left, right } from '@/shared/infrastructure/handle-erros/either'

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
    ResourceNotFoundError | NotAllowedError | AvailableTimeNameAlreadyExistsError,
    {
      availableTime: AvailableTimeEntity
    }
  >
}

export class AvailableTimeUpdateUseCase {
  constructor(
    private readonly availablePrismaTimeRespository: AvailablePrismaTimeRepository,
  ) {}

  async execute({
    name,
    availableTimeId,
    userId,
  }: AvailableTimeUpdateProps.Request): Promise<AvailableTimeUpdateProps.Response> {
    const availableTime =
      await this.availablePrismaTimeRespository.findById(availableTimeId.toString())

    if (
      availableTime?.name === name) {
      return left(new AvailableTimeNameAlreadyExistsError(name))
    }

    if (!availableTime) {
       return left(new ResourceNotFoundError())
    }

    if (userId !== availableTime.userId.toString()) {
      return left(new NotAllowedError())
    }

    const result = AvailableTimeEntity.create({
      name,
      userId: new UniqueEntityUUID(userId),

    })

    await this.availablePrismaTimeRespository.update(result)

    return right({
      availableTime,
    })
  }
}
