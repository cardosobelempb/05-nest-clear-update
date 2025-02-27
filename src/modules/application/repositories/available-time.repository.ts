import { AvailableTimeEntity } from '@/modules/anterprise/entity/available-time.entity'
import { RepositoryAbstract } from '@/shared/enterprise/repository/repository.abstract'

export abstract class AvailableTimeRepository extends RepositoryAbstract<AvailableTimeEntity> {
  abstract findByName(name: string): Promise<AvailableTimeEntity | null>
}
