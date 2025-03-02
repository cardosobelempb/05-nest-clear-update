import { AvailableTimeEntity } from '@/modules/anterprise/entity/available-time.entity'

export class AvailableTimePresenter {
  static toHTTP(availableTime: AvailableTimeEntity) {
    return {
      id: availableTime.id.toString(),
      userId: availableTime.userId.toString(),
      name: availableTime.name,
      createdAt: availableTime.createdAt,
      updatedAt: availableTime.updatedAt,
    }
  }
}
