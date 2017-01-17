export default class Step {
  type: string
  args: {}
  timestamp: number

  constructor (type: string, args: {}) {
    this.type = type
    this.args = args
    this.timestamp = Date.now()
  }
}
