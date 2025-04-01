import { UniqueEntityUUID } from "../enterprise"
export namespace Comment {
  export interface Props {
      userId: UniqueEntityUUID
      content: string
      isActive: boolean
      createdAt: Date
      updatedAt?: Date | null
    }
}