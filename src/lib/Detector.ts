import * as event from 'eventemitter2'
import * as Rx from 'rxjs/Rx'
import ListenerGroup from './ListenerGroup'
import Locator from './Locator'
import Frame from './Frame'
import Step from './Step'
import Script from './Script'

export default class Detector extends event.EventEmitter2 {
  static inputFieldTypes = [
    'text', 'password', 'file', 'datetime', 'datetime-local',
    'date', 'month', 'time', 'week', 'number',
    'range', 'email', 'url', 'search', 'tel',
    'color'
  ]
  static doubleClickInterval = 300

  _frame: Frame
  _enabled: boolean

  constructor (frame: Frame) {
    super()
    this._frame = frame
    this._enabled = false
  }

  get frame () {
    return this._frame
  }

  get document () {
    return this.frame.document
  }

  get enabled () {
    return this._enabled
  }

  bind () {
    this.buildClickSubscription()
    this.buildChangeSubscription()
  }

  enable () {
    this._enabled = true
  }

  disable () {
    this._enabled = false
  }

  protected buildClickSubscription () {
    const clickableSelector = [
      'a[href]',
      'input[type="submit"]',
      'input[type="reset"]',
      'input[type="button"]',
      'input[type="image"]'
    ].join(', ')
    const clickableElements = this.document.querySelectorAll(clickableSelector)
    const clicks = Rx.Observable.fromEvent(clickableElements, 'click')

    return clicks.subscribe(
      this.handleEvent.bind(this, (e: MouseEvent) => {
        return { x: e.x, y: e.y, altKey: e.altKey }
      })
    )
  }

  protected buildChangeSubscription() {
    const textFields = this.document.querySelectorAll('input, textarea')
    const fieldChanges = Rx.Observable.fromEvent(textFields, 'change')

    return fieldChanges.subscribe(
        this.handleEvent.bind(this, (e: Event) => {
          return { value: e.srcElement['value'] }
        })
    )
  }

  protected handleEvent (dataBuilder: (e: Event) => {}, e: Event) {
    if (!this.enabled) return
    const locator = Locator.fromElement(e.srcElement, this.frame)
    const event = dataBuilder(e) || {}
    event['type'] = e.type
    event['locator'] = locator

    this.emit('detect', event)
  }
}
