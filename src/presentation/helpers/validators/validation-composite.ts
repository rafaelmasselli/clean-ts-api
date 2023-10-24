import { Validation } from './validation'

export class ValidationComposite implements Validation {
  private readonly validations: Validation[]
  constructor (validations: Validation[]) {
    this.validations = validations
  }

  validate (input: any): Error | any {
    for (const validation of this.validations) {
      const error = validation.validate(input)
      // eslint-disable-next-line @typescript-eslint/no-misused-promises
      if (error) {
        return error
      }
    }
  }
}
