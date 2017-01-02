import * as event from 'eventemitter2'
import ListenerGroup from './ListenerGroup'
import Locator from './Locator'
import Frame from './Frame'

export default class Detector extends event.EventEmitter2 {
  _frame: Frame
  _recording: boolean

  constructor (frame: Frame) {
    super()
    this._frame = frame
  }

  get frame () {
    return this._frame
  }

  get document () {
    return this.frame.document
  }

  bind () {
    this.document.addEventListener('click', this.handleDocumentEvent.bind(this))
  }

  private handleDocumentEvent (event: Event) {
    const className = event.constructor.name
    const props = Detector.eventProperties[className]
    if (!props) throw new Error(`Unsupported event: ${className}`)

    const eventData = {}

    for (var prop of props) {
      eventData[prop] = event[prop]
    }

    const frame = new Frame(event.srcElement.ownerDocument.defaultView)
    const locator = Locator.fromElement(event.srcElement, frame)

    this.emit('documentEvent', { locator: locator.value, locatorType: locator.type, eventData: eventData })
  }

  static readonly eventProperties = {
    MouseEvent: ['altKey', 'button', 'buttons', 'clientX', 'clientY', 'ctrlKey', 'metaKey', 'shiftKey'],
    KeyboardEvent: ['altKey', 'code', 'ctrlKey', 'key', 'locale', 'metaKey', 'shiftKey', 'which']
  }
}
