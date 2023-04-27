import { Controller, HttpRequest } from '../../presentation/protocols'

export class LogControllerDecorator implements Controller {
  private readonly Controller: Controller
  constructor (controller: Controller) {
    this.Controller = controller
  }

  async handle (httpRequest: HttpRequest): Promise<any> {
    await this.Controller.handle(httpRequest)
    return null
  }
}
