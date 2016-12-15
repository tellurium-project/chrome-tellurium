import ListenerGroup from './ListenerGroup'
import { toCSSLocator } from './util'
// chrome.runtime.sendMessage({type: 'userEvent', event: e}, (res) => {
//   console.log(res.result)
// })
export default class Recorder {
  _recording: boolean
  _documentListeners: ListenerGroup

  constructor () {
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

  get recording (): boolean {
    return this._recording
  }

  set recording (value: boolean) {
    this._recording = value
  }

  onClick (e: MouseEvent) {
    const event = {
      type: e.type,
      selector: toCSSLocator(e.srcElement)
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
