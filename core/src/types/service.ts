import { ServiceAttachmentListEntity } from '../anterprise/entity/service-attachment-list.entity';
import { UniqueEntityUUID } from '../shared/enterprise/entities/value-objects/unique-entity-uuid/unique-entity-uuid';
import { Appointment } from '../types/appointment';
import { Comment } from '../types/comment';

export namespace Service {
  export interface Props {
    id: string;
    name: string;
    price: number;
    duration: string;
    isActive: boolean;
    createdAt: Date;
    updatedAt?: Date | null;
    userId: UniqueEntityUUID;
    categoryId?: UniqueEntityUUID | null;
    attachments: ServiceAttachmentListEntity;
  };
  
  export interface Comment extends Comment.Props {
      serviceId: UniqueEntityUUID
      commentId: UniqueEntityUUID
  }

  export interface Attachment extends Appointment.Props {
    serviceId: UniqueEntityUUID
    attachmentId: UniqueEntityUUID
  }

}
