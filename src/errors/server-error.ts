export class ServerError extends Error {
  constructor (stack: string) {
    super()
    this.stack = stack
  }
}
