import { WatchedList } from '../../shared/enterprise/entities/watched-list/watched-list'
import { ServiceAttachmentEntity } from './service-attachment.entity'

export class ServiceAttachmentListEntity extends WatchedList<ServiceAttachmentEntity> {
  compareItems(
    a: ServiceAttachmentEntity,
    b: ServiceAttachmentEntity,
  ): boolean {
    return a.attachmentId.equals(b.attachmentId)
  }
}
