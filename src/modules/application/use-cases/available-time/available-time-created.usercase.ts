import { AvailableTimeEntity } from '@/modules/anterprise/entity/available-time.entity'
import { AvailablePrismaTimeRepository } from '@/modules/application/repositories/prisma/available-time-prisma.repository'
import { UniqueEntityUUID } from '@/shared/enterprise/entities/value-objects/unique-entity-uuid/unique-entity-uuid'
import {
  Either,
  left,
  right,
} from '@/shared/infrastructure/handle-erros/either'
import { AvailableTimeNameAlreadyExistsError } from '../errors/available-time-name-already-exists.error'


export namespace AvailableTimeCreatedProps {
  export interface Request {
    name: string
    userId: UniqueEntityUUID
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
    private readonly availablePrismaTimeRespository: AvailablePrismaTimeRepository,
  ) {}

  async execute({
    name,
    userId,
  }: AvailableTimeCreatedProps.Request): Promise<AvailableTimeCreatedProps.Response> {
    const availableTimeName =
      await this.availablePrismaTimeRespository.findByName(name)

    console.log(
      availableTimeName?.name,
      name,
      availableTimeName?.userId.toString(),
      userId.toString(),
    )

    if (
      availableTimeName?.name === name &&
      availableTimeName?.userId.toString() === userId.toString()
    ) {
      console.log('true')
      return left(new AvailableTimeNameAlreadyExistsError(name))
    }

    const availableTime = AvailableTimeEntity.create({
      name,
      userId,
    })

    await this.availablePrismaTimeRespository.create(availableTime)

    return right({
      availableTime,
    })
  }
}
