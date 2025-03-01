import { UseCaseError } from './usecase-erro.interface'

export class WrongCreadentialsErro extends Error implements UseCaseError {
  constructor() {
    super(`Credentials are not valid.`)
  }
}
