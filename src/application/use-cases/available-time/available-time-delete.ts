import { NotAllowedErro } from '@/shared/application/usecase-erros/not-allowed.erro'
import { ResourceNotFoundErro } from '@/shared/application/usecase-erros/resource-not-found.error'

import { AvailableTimeRepository } from '../../repositories/available-time.repository'

export namespace AvailableTimeDeleteProps {
  export interface Request {
    userId: string
    availabletimeId: string
  }

  export type Response = {}
}

export class AvailableTimeDelete {
  constructor(
    private readonly appointimentRespository: AvailableTimeRepository,
  ) {}

  async execute({ userId, availabletimeId }: AvailableTimeDeleteProps.Request) {
    const availabletime =
      await this.appointimentRespository.findById(availabletimeId)

    if (!availabletime) {
      throw new ResourceNotFoundErro()
    }

    if (userId !== availabletime.userId.toString()) {
      throw new NotAllowedErro()
    }

    await this.appointimentRespository.delete(availabletime)

    return {}
  }
}
