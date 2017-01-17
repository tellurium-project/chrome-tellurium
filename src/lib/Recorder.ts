import * as event from 'eventemitter2'
import ListenerGroup from './ListenerGroup'
import Locator from './Locator'
import Frame from './Frame'
import Step from './Step'
import Script from './Script'

export default class Recorder extends event.EventEmitter2 {
  _frame: Frame
  _recording: boolean
  _script: Script

  constructor (frame: Frame, script: Script) {
    super()
    this._frame = frame
    this._script = script
  }

  get frame () {
    return this._frame
  }

  get document () {
    return this.frame.document
  }

  get recording () {
    return this._recording
  }

  get script () {
    return this._script
  }

  bind () {
    this.document.addEventListener('click', this.handleClicksEvent.bind(this))
    // this.document.addEventListener('dblclick', this.handleClicksEvent.bind(this))
    this.document.addEventListener('input', this.handleInputEvent.bind(this))
  }

  start () {
    this._recording = true
  }

  stop () {
    this._recording = false
  }

  protected isLastStepWithin (milliSec: number): boolean {
    const lastStep = this.script.lastStep
    if (!lastStep) return false

    const lastStepDate = lastStep.timestamp
    return Date.now() - lastStepDate < milliSec
  }

  protected handleClicksEvent (e: Event) {
    if (!this.recording) return
    const locator = Locator.fromElement(e.srcElement, this.frame)

    if (this.isLastStepWithin(500) && this.script.lastStep.type === 'clickElement') {
      this.script.replaceLastStep(new Step('doubleClickElement', { locator: locator }))
    } else {
      this.script.insertStep(new Step(`clickElement`, { locator: locator }))
    }
  }
  //
  // protected handleDoubleClickEvent (e: Event) {
  //   if (!this.recording) return
  //   const locator = Locator.fromElement(e.srcElement, this.frame)
  //
  //   // if (this.isDuplicateEvent()) return
  //
  //   this.insertStep(new Step('doubleClickElement', { locator: locator }))
  // }

  protected handleInputEvent (e: Event) {
    if (!this.recording) return
    const locator = Locator.fromElement(e.srcElement, this.frame)
    this.script.insertStep(new Step('inputText', { locator: locator, text: e['data'] }))
  }
}
