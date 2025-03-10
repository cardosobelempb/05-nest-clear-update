import { categoryFactory } from '@/application/repositories/in-memory/factories/category.factory'
import { ServiceCategoryInMemoryRepository } from '@/application/repositories/in-memory/service-category-in-memory.repository'

import { CategoryManyService } from '../category-many.service'

let serviceCategoryInMemoryRepository: ServiceCategoryInMemoryRepository
let sut: CategoryManyService

describe('CategoryManyService', () => {
  beforeEach(() => {
    serviceCategoryInMemoryRepository = new ServiceCategoryInMemoryRepository()
    sut = new CategoryManyService(serviceCategoryInMemoryRepository)
  })

  it('shold ble  to many categories', async () => {
    await serviceCategoryInMemoryRepository.create(
      categoryFactory({ createdAt: new Date(2022, 0, 20) }),
    )
    await serviceCategoryInMemoryRepository.create(
      categoryFactory({ createdAt: new Date(2022, 0, 18) }),
    )
    await serviceCategoryInMemoryRepository.create(
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
      await serviceCategoryInMemoryRepository.create(categoryFactory())
    }

    const result = await sut.execute({ page: 2 })

    expect(result.value?.categories).toHaveLength(2)
  })
})
