export default class ListenerGroup {
  private _target: EventTarget
  private _listeners: Object

  constructor (target: EventTarget) {
    this._target = target
    this._listeners = {}
  }

  private getCallback (eventName: string) {
    return this._listeners[eventName]
  }

  add (type: string, callback, useCapture?): this {
    this._listeners[type] = callback
    this._target.addEventListener(type, callback, useCapture)

    return this
  }

  remove (type: string) {
    this._target.removeEventListener(type, this.getCallback(type))
  }

  removeAll () {
    for (const type in this._listeners) {
      this.remove(type)
    }
  }
}
