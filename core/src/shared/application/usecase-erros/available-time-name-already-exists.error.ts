import { UseCaseError } from '@/shared/application/usecase-erros/usecase-erro.interface'

export class AvailableTimeNameAlreadyExistsError extends Error implements UseCaseError {
  constructor(identifier: string) {
    super(`Available Time Name "${identifier}" already exists.`)
  }
}
