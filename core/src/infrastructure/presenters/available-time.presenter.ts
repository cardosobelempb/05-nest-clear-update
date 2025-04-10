import { AvailableTimeEntity } from '@core'

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
