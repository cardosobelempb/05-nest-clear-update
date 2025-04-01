import { ServiceCommnetEntity, UniqueEntityUUID } from '@core'
import { Comment as CommentMapper, Prisma } from '@prisma/client'

export class ServiceCommentPrismaMapper {
  static toDomain(raw: CommentMapper): ServiceCommnetEntity {

    if (!raw.serviceId) {
      throw new Error('Invalid comment type')
    }

    return ServiceCommnetEntity.create(
      {
        content: raw.content,
        commentId: new UniqueEntityUUID(raw.serviceId),
        userId: new UniqueEntityUUID(raw.userId),
        serviceId: new UniqueEntityUUID(raw.serviceId),
        createdAt: raw.createdAt,
        updatedAt: raw.updatedAt,
      },
      new UniqueEntityUUID(raw.id),
    )
  }

  static toPrisma(entity: ServiceCommnetEntity): Prisma.CommentUncheckedCreateInput {
    return {
      id: entity.id.toString(),
      content: entity.content,
      userId: entity.userId.toString(),
      serviceId: entity.serviceId.toString(),
      createdAt: entity.createdAt,
      updatedAt: entity.updatedAt,
    }
  }
}
