import { AvailableTimeEntity, RepositoryAbstract } from '@core';

export abstract class AvailableTimeRepository extends RepositoryAbstract<AvailableTimeEntity> {
  abstract findByName(name: string): Promise<AvailableTimeEntity | null>
}
