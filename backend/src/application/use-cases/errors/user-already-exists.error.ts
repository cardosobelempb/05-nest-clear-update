import { UseCaseError } from '@/shared/application/usecase-erros/usecase-erro.interface'

export class UserAlreadyExistsError extends Error implements UseCaseError {
  constructor(identifier: string) {
    super(`User "${identifier}" already exists.`)
  }
}
