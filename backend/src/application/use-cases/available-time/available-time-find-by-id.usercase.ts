import { AvailableTimeEntity, Either, left, ResourceNotFoundError, right } from '@core'

import { AvailableTimeRepository } from '../../repositories/available-time.repository'

export namespace AvailableTimeFindByIdProps {
  export interface Request {
    availableTimeId: string
  }


  export type Response = Either<ResourceNotFoundError, { availableTime: AvailableTimeEntity }>
}

export class AvailableTimeFindByIdUseCase {
  constructor(
    private readonly availableTimeRespository: AvailableTimeRepository,
  ) {}

  async execute({
    availableTimeId,
  }: AvailableTimeFindByIdProps.Request): Promise<AvailableTimeFindByIdProps.Response> {
    const availableTime =
      await this.availableTimeRespository.findById(availableTimeId)

    if (!availableTime) {
      return left(new ResourceNotFoundError())
    }

    return right({ availableTime })
  }
}
