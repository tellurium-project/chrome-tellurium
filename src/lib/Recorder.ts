import ListenerGroup from './ListenerGroup'
import Locator from './Locator'
import Frame from './Frame'

export default class Recorder {
  _frame: Frame
  _recording: boolean
  _documentListeners: ListenerGroup

  constructor (frame: Frame) {
    this._frame = frame
    this._documentListeners = new ListenerGroup(document)
  }

  setUp () {
    this._documentListeners
      .add('click', this.onClick.bind(this), true)
      .add('dblclick', this.onDoubleClick.bind(this), true)
      .add('change', this.onChange.bind(this), true)
      .add('keyup', this.onKeyUp.bind(this), true)
      .add('keydown', this.onKeyDown.bind(this), true)
      .add('mouseover', this.onMouseOver.bind(this), true)
  }

  tearDown () {
    this._documentListeners.removeAll()
  }

  start () {
    this._recording = true
  }

  stop () {
    this._recording = false
  }

  get recording () {
    return this._recording
  }

  get frame () {
    return this._frame
  }

  onClick (e: MouseEvent) {
    const l = Locator.fromElement(e.srcElement, this.frame)

    const event = {
      type: e.type,
      locator: l.value,
      locatorType: l.type
    }

    console.log(event)

    chrome.runtime.sendMessage({type: 'userEvent', event: event}, (res) => {
      console.log(res.result)
    })
  }

  onDoubleClick (e: MouseEvent) {}
  onChange (e: MouseEvent) {}
  onKeyUp (e: MouseEvent) {}
  onKeyDown (e: MouseEvent) {}
  onMouseOver (e: MouseEvent) {}
}
