import { UseCaseError } from "@/shared/application/usecase-erros/usecase-erro.interface";

export class WrongCredentialsError extends Error implements UseCaseError {
  constructor() {
    super(`Credentials are not valid.`)
  }
}
