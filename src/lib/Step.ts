import Locator from './Locator'

export default class Step {
  type: string
  data: any
  timestamp: number
  locator: Locator

  constructor (type: string, locator?: Locator, data?: any) {
    this.type = type
    this.data = data || {}
    this.timestamp = Date.now()
    this.locator = locator
  }

  within (milliSec: number): boolean {
    return Date.now() - this.timestamp < milliSec
  }
}
