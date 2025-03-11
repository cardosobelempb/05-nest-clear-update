import { UseCaseError } from './usecase-erro.interface'

export class ResourceNotFoundError extends Error implements UseCaseError {
  constructor() {
    super('Resouce not found.')
  }
}
