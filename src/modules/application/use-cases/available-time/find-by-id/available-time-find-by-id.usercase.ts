import { AvailableTimeEntity } from '@/modules/anterprise/entity/available-time.entity'
import { AvailablePrismaTimeRepository } from '@/modules/application/repositories/prisma/available-time-prisma.repository'
import {
  Either,
  left,
  right,
} from '@/shared/infrastructure/handle-erros/either'
import { NotFoundError } from '../../errors/not-found.erro'

export namespace AvailableTimeFindByIdProps {
  export interface Request {
    availableTimeId: string
  }

  export type Response = Either<
    NotFoundError,
    { availableTime: AvailableTimeEntity }
  >
}

export class AvailableTimeFindByIdUseCase {
  constructor(
    private readonly availablePrismaTimeRespository: AvailablePrismaTimeRepository,
  ) {}

  async execute({
    availableTimeId,
  }: AvailableTimeFindByIdProps.Request): Promise<AvailableTimeFindByIdProps.Response> {
    const availableTime =
      await this.availablePrismaTimeRespository.findById(availableTimeId)

    if (!availableTime) {
      return left(new NotFoundError())
    }
    return right({ availableTime })
  }
}
