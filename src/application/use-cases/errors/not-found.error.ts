import { UseCaseError } from "@/shared/application/usecase-erros/usecase-erro.interface";

export class NotFoundError extends Error  implements UseCaseError{
  constructor() {
     super('Not allowed')
  }
}
