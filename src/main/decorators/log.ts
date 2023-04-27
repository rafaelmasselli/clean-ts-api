import { Controller, HttpRequest } from '../../presentation/protocols'

export class LogControllerDecorator implements Controller {
  private readonly Controller: Controller
  constructor (controller: Controller) {
    this.Controller = controller
  }

  async handle (httpRequest: HttpRequest): Promise<any> {
    const httpResponse = await this.Controller.handle(httpRequest)
    return httpResponse
  }
}
