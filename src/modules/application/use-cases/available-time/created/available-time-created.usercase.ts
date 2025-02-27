import { AvailableTimeEntity } from '@/modules/anterprise/entity/available-time.entity'
import { AvailablePrismaTimeRepository } from '@/modules/application/repositories/prisma/available-time-prisma.repository'
import { ConflictException } from '@nestjs/common'

export class AvailableTimeCreatedUseCase {
  constructor(
    private readonly availablePrismaTimeRespository: AvailablePrismaTimeRepository,
  ) {}

  async execute(entity: AvailableTimeEntity): Promise<void> {
    const availableTimeName =
      await this.availablePrismaTimeRespository.findByName(entity.name)

    if (availableTimeName) {
      throw new ConflictException('Time with name already exists.')
    }

    this.availablePrismaTimeRespository.create(entity)
  }
}
