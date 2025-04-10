import { Pagination, ServiceAttachmentEntity } from "@core";

import { ServiceAttachmentRepository } from "../service-attachment.repository";

export class ServicePrismaAttachmentRepository implements ServiceAttachmentRepository {
  deleteManyServiceId(serviceId: string): Promise<void> {
    throw new Error("Method not implemented.");
  }
  findManyByServiceId(serviceId: string): Promise<ServiceAttachmentEntity[]> {
    throw new Error("Method not implemented.");
  }
  findById(id: string): Promise<ServiceAttachmentEntity | null> {
    throw new Error("Method not implemented.");
  }
  findMany(params: Pagination.Params): Promise<ServiceAttachmentEntity[]> {
    throw new Error("Method not implemented.");
  }
  create(entity: ServiceAttachmentEntity): Promise<void> {
    throw new Error("Method not implemented.");
  }
  update(entity: ServiceAttachmentEntity): Promise<void> {
    throw new Error("Method not implemented.");
  }
  delete(entity: ServiceAttachmentEntity): Promise<void> {
    throw new Error("Method not implemented.");
  }

}
