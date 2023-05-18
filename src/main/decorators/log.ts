import { Controller, HttpRequest } from '../../presentation/protocols'
import { LogErrorRepository } from '../../data/protocols/log-error-repository'

export class LogControllerDecorator implements Controller {
  private readonly Controller: Controller
  private readonly logErrorRepository: LogErrorRepository

  constructor (controller: Controller, logErrorRepository: LogErrorRepository) {
    this.Controller = controller
    this.logErrorRepository = logErrorRepository
  }

  async handle (httpRequest: HttpRequest): Promise<any> {
    const httpResponse = await this.Controller.handle(httpRequest)
    if (httpResponse.statusCode === 500) await this.logErrorRepository.logError(httpResponse.body.stack)
    return httpResponse
  }
}
