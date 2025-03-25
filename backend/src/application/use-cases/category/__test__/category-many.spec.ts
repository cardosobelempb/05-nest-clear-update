import { CategoryInMemoryRepository } from '@/application/repositories/in-memory/category-in-memory.repository'
import { categoryFactory } from '@/application/repositories/in-memory/factories/category.factory'

import { CategoryManyService } from '../category-many.service'

let categoryInMemoryRepository: CategoryInMemoryRepository
let sut: CategoryManyService

describe('CategoryManyService', () => {
  beforeEach(() => {
    categoryInMemoryRepository = new CategoryInMemoryRepository()
    sut = new CategoryManyService(categoryInMemoryRepository)
  })

  it('shold ble  to many categories', async () => {
    await categoryInMemoryRepository.create(
      categoryFactory({ createdAt: new Date(2022, 0, 20) }),
    )
    await categoryInMemoryRepository.create(
      categoryFactory({ createdAt: new Date(2022, 0, 18) }),
    )
    await categoryInMemoryRepository.create(
      categoryFactory({ createdAt: new Date(2022, 0, 23) }),
    )

    const result = await sut.execute({ page: 1 })
    expect(result.value?.categories).toEqual([
      expect.objectContaining({ createdAt: new Date(2022, 0, 23) }),
      expect.objectContaining({ createdAt: new Date(2022, 0, 20) }),
      expect.objectContaining({ createdAt: new Date(2022, 0, 18) }),
    ])
  })

  it('should be ble to paginated services', async () => {
    for (let i = 1; i <= 22; i++) {
      await categoryInMemoryRepository.create(categoryFactory())
    }

    const result = await sut.execute({ page: 2 })

    expect(result.value?.categories).toHaveLength(2)
  })
})
