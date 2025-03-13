import { CategoryInMemoryRepository } from '@/application/repositories/in-memory/category-in-memory.repository'
import { categoryFactory } from '@/application/repositories/in-memory/factories/category.factory'
import { serviceFactory } from '@/application/repositories/in-memory/factories/service.factory'
import { userFactory } from '@/application/repositories/in-memory/factories/user.factory'
import { ServiceInMemoryRepository } from '@/application/repositories/in-memory/service-in-memory.repository'
import { UserInMemoryRepository } from '@/application/repositories/in-memory/user-in-memory.repository'
import { UniqueEntityUUID } from '@/shared/enterprise/entities/value-objects/unique-entity-uuid/unique-entity-uuid'

import { ServiceUpdate } from '../service-update.service'

let userInMemoryRepository: UserInMemoryRepository
let serviceInMemoryRepository: ServiceInMemoryRepository
let categoryInMemoryRepository: CategoryInMemoryRepository
let sut: ServiceUpdate

describe('ServiceUpdate', () => {
  beforeEach(() => {
    userInMemoryRepository = new UserInMemoryRepository()
    serviceInMemoryRepository = new ServiceInMemoryRepository()
    categoryInMemoryRepository = new CategoryInMemoryRepository()
    sut = new ServiceUpdate(
      userInMemoryRepository,
      serviceInMemoryRepository,
      categoryInMemoryRepository,
    )
  })

  it('should ble to update a service from user', async () => {
    const newUser = userFactory({}, new UniqueEntityUUID('userId-01'))
    await userInMemoryRepository.create(newUser)

    const newCategory = categoryFactory(
      {
        userId: newUser.id,
      },
      new UniqueEntityUUID('categoryId-01'),
    )
    await categoryInMemoryRepository.create(newCategory)

    const newService = serviceFactory(
      {
        userId: newUser.id,
        categoryId: newCategory.id,
      },
      new UniqueEntityUUID('serviceId-01'),
    )
    await serviceInMemoryRepository.create(newService)

    await sut.execute({
      userId: newUser.id.toString(),
      name: newCategory.name,
      serviceId: newService.id.toString(),
      categoryId: newCategory.id.toString(),
    })

    expect(serviceInMemoryRepository.items[0]).toMatchObject({
      userId: new UniqueEntityUUID('userId-01'),
      categoryId: new UniqueEntityUUID('categoryId-01'),
    })
  })

  // it('should not ble to update a service another user', async () => {

  //   await userInMemoryRepository.create(userFactory(
  //     {},
  //     new UniqueEntityUUID('userId-01'),
  //   ))

  //   await userInMemoryRepository.create(userFactory(
  //     {},
  //     new UniqueEntityUUID('userId-02'),
  //   ))

  //   await categoryInMemoryRepository.create(categoryFactory(
  //     {},
  //     new UniqueEntityUUID('categoryId-01'),
  //   ))

  //   await serviceInMemoryRepository.create(serviceFactory(
  //     {
  //       userId: new UniqueEntityUUID('userId-01'),
  //       categoryId: new UniqueEntityUUID('categoryId-01'),
  //       name: 'Service name'
  //     },
  //     new UniqueEntityUUID('serviceId-01'),
  //   ))

  //   console.log("ServiceUpdate =>", serviceInMemoryRepository.items)

  //   expect(() => {
  //     return sut.execute({
  //       serviceId: 'serviceId-01',
  //       categoryId: 'categoryId-01',
  //       name: 'Service name',
  //       userId: 'userId-02',
  //     })
  //   }).rejects.toBeInstanceOf(NotAllowedErro)
  // })
})
