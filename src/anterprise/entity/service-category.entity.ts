import { UniqueEntityUUID } from '@/shared/enterprise/entities/value-objects/unique-entity-uuid/unique-entity-uuid'
import { Optional } from '@prisma/client/runtime/library'
import { CategoryEntity, CategoryProps } from './category.entity'

export namespace ServiceCategoryProps {
  export interface Props extends CategoryProps.Props {
    serviceId: UniqueEntityUUID
  }
  export interface Id {
    categoryId: string
  }
}

export class ServiceCategoryEntity extends CategoryEntity<ServiceCategoryProps.Props> {

  get serviceId() {
    return this.props.serviceId
  }

  static create(
    props: Optional<
      ServiceCategoryProps.Props,
      'createdAt' | 'isActive' | 'updatedAt'
    >,
    id?: UniqueEntityUUID,
  ) {
    const serviceCategory = new ServiceCategoryEntity(
      {
        ...props,
        isActive: props.isActive ?? true,
        createdAt: props.createdAt ?? new Date(),
      },
      id,
    )

    return serviceCategory
  }
}
