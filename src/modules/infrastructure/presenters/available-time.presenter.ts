import { AvailableTimeEntity } from '@/modules/anterprise/entity/available-time.entity'
import { AvailableTime } from '@prisma/client'

export class AvailableTimePresenter {
  static toHTTP(availableTime: AvailableTimeEntity) {
    return {
      id: availableTime.id.toString(),
      name: availableTime.name,
      userId: availableTime.userId.toString(),
      createdAt: availableTime.createdAt,
      updatedAt: availableTime.updatedAt,
    }
  }
}
