import { UniqueEntityUUID } from "../shared/enterprise/entities/value-objects/unique-entity-uuid/unique-entity-uuid"

export namespace Comment {
  export interface Props {
      userId: UniqueEntityUUID
      content: string
      isActive: boolean
      createdAt: Date
      updatedAt?: Date | null
    }
}