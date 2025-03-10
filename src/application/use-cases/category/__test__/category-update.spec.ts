import { CategoryInMemoryRepository } from '@/application/repositories/in-memory/category-in-memory.repository'
import { categoryFactory } from '@/application/repositories/in-memory/factories/category.factory'
import { NotAllowedErro } from '@/shared/application/usecase-erros/not-allowed.erro'
import { UniqueEntityUUID } from '@/shared/enterprise/entities/value-objects/unique-entity-uuid/unique-entity-uuid'
import { CategoryUpdateService } from '../category-update.service'

let categoryInMemoryRepository: CategoryInMemoryRepository
let sut: CategoryUpdateService

describe('CategoryUpdateService', () => {
  beforeAll(() => {
    categoryInMemoryRepository = new CategoryInMemoryRepository()
    sut = new CategoryUpdateService(categoryInMemoryRepository)
  })

  it('should ble to update a category from user', async () => {
    await categoryInMemoryRepository.create(
      categoryFactory(
        {
          userId: new UniqueEntityUUID('userId-01'),
        },
        new UniqueEntityUUID('categoryId-01'),
      ),
    )

    await sut.execute({
      userId: 'userId-01',
      name: 'category name',
      categoryId: 'categoryId-01',
    })

    expect(categoryInMemoryRepository.items[0]).toMatchObject({
      name: 'category name',
    })
  })

  it('should not ble to update a category another user', async () => {
    await categoryInMemoryRepository.create(categoryFactory())

    expect(() => {
      return sut.execute({
        userId: 'userId-02',
        categoryId: 'categoryId-01',
        name: 'category name',
      })
    }).rejects.toBeInstanceOf(NotAllowedErro)
  })
})
