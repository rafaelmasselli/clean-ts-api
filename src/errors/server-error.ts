export class ServerError extends Error {
  constructor (stack: string) {
    super(stack)
    this.stack = stack
  }
}
