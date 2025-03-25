export namespace Attachment {
  export interface Props {
    name: string
    link: string
    isActive: boolean
    createdAt: Date
    updatedAt?: Date | null
  }
}