import { CategoryInMemoryRepository } from '@/application/repositories/in-memory/category-in-memory.repository'
import { categoryFactory } from '@/application/repositories/in-memory/factories/category.factory'
import { userFactory } from '@/application/repositories/in-memory/factories/user.factory'
import { UserInMemoryRepository } from '@/application/repositories/in-memory/user-in-memory.repository'
import { NotAllowedErro } from '@/shared/application/usecase-erros/not-allowed.erro'
import { UniqueEntityUUID } from '@/shared/enterprise/entities/value-objects/unique-entity-uuid/unique-entity-uuid'
import { CategoryUpdate } from '../category-update'

let categoryInMemoryRepository: CategoryInMemoryRepository
let sut: CategoryUpdate

describe('CategoryUpdate', () => {
  beforeAll(() => {
    categoryInMemoryRepository = new CategoryInMemoryRepository()
    sut = new CategoryUpdate(categoryInMemoryRepository)
  })

  it('should ble to update a category from user', async () => {
    const newCategory = categoryFactory(
      {
        userId: new UniqueEntityUUID('userId-01'),
      },
      new UniqueEntityUUID('categoryId-01'),
    )
    await categoryInMemoryRepository.create(newCategory)

    await sut.execute({
      userId: 'userId-01',
      name: 'category name',
      categoryId: newCategory.id.toString(),
    })

    expect(categoryInMemoryRepository.items[0]).toMatchObject({
      name: 'category name',
    })
  })

  it('should not ble to update a category another user', async () => {
    const newCategory01 = categoryFactory(
      {
        userId: new UniqueEntityUUID('userId-01'),
      },
      new UniqueEntityUUID('categoryId-01'),
    )
    await categoryInMemoryRepository.create(newCategory01)

    expect(() => {
      return sut.execute({
        userId: 'userId-02',
        categoryId: 'categoryId-01',
        name: 'category name',
      })
    }).rejects.toBeInstanceOf(NotAllowedErro)
  })
})
