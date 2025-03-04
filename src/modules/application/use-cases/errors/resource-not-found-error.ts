import { UseCaseError } from "@/shared/application/usecase-erros/usecase-erro.interface";

export class ResourceNotFoundError extends Error implements UseCaseError {
  constructor() {
     super('Resource not found')
  }
}
