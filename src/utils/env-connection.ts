import { DotenvConfigOutput, config } from 'dotenv'
export function env (): DotenvConfigOutput {
  return config()
}
