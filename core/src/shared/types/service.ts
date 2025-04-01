import { ServiceAttachmentListEntity } from '../../anterprise/entity';
import { UniqueEntityUUID } from '../enterprise';
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

  export interface Attachment {
    serviceId: UniqueEntityUUID
    attachmentId: UniqueEntityUUID
  }

}
