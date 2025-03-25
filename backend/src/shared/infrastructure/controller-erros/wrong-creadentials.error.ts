import { ControllerError } from './controller-erro.interface'

export class WrongCreadentialsErro extends Error implements ControllerError {
  constructor() {
    super(`Credentials are not valid.`)
  }
}
