import { Entity } from "../../shared/enterprise/entities/entity"
import { Attachment } from "../../shared/types/attachment"

export class AttachmentEntity extends Entity<Attachment.Props> {
  get name() {
    return this.props.name
  }

  set name(name: string) {
    this.props.name = name
  }

  get url() {
    return this.props.url
  }

  set url(url: string) {
    this.props.url = url
  }

  // static create(props: Attachment.Props, id?: UniqueEntityUUID) {
  //   const attachment = new AttachmentEntity(props, id)

  //   return attachment
  // }

}
