import { AvailableTimeEntity } from '@/anterprise/entity/available-time.entity'

export class AvailableTimePresenter {
  static toHTTP(availableTime: AvailableTimeEntity) {
    return {
      id: availableTime.id.toString(),
      userId: availableTime.userId.toString(),
      time: availableTime.time,
      createdAt: availableTime.createdAt,
      updatedAt: availableTime.updatedAt,
    }
  }
}
