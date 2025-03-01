import { UseCaseError } from './usecase-erro.interface'

export class ResourceNotFoundErro extends Error implements UseCaseError {
  constructor() {
    super('Resouce not found')
  }
}
