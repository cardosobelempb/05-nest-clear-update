import { AvailableTimeEntity, AvailableTimeProps } from '@/anterprise/entity/available-time.entity'
import { UniqueEntityUUID } from '@/shared/enterprise/entities/value-objects/unique-entity-uuid/unique-entity-uuid'
import { PrismaService } from '@/shared/infrastructure/database/prisma/prisma.service'
import { faker } from '@faker-js/faker'
import { Injectable } from '@nestjs/common'

import { AvailableTimePrismaMapper } from '../../prisma/mappers/available-time-prisma.mapper'

export function availabletimeFactory(
  override: Partial<AvailableTimeProps.Props> = {},
  id?: UniqueEntityUUID,
) {
  const hours = faker.date.anytime().getHours().toLocaleString()
  const minutes = faker.date.anytime().getMinutes().toLocaleString()
  const availabletime = AvailableTimeEntity.create(
    {
      time: `${hours}:${minutes}`,
      userId: new UniqueEntityUUID(),
      ...override,
    },
    id,
  )

  return availabletime
}

@Injectable()
export class AvailableTimeFactory {
  constructor(private readonly ptisma: PrismaService) { }

  async create(data: Partial<AvailableTimeProps.Props> = {}): Promise<AvailableTimeEntity> {
    const availableTime = availabletimeFactory(data)

    await this.ptisma.availableTime.create({
      data: AvailableTimePrismaMapper.toPrisma(availableTime)
    })

    return availableTime
  }
}
