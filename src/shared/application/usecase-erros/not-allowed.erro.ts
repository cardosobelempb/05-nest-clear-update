import { UseCaseError } from './usecase-erro.interface'

export class NotAllowedErro extends Error implements UseCaseError {
  constructor() {
    super('Not allowed')
  }
}
