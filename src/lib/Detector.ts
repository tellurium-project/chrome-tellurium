import * as event from 'eventemitter2'
import * as Rx from 'rxjs/Rx'
import Locator from './Locator'
import Frame from './Frame'
import VirtualEvent from './VirtualEvent'

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
  _eventHandlers: Map<Element, { [eventType: string]: boolean }>

  constructor (frame: Frame) {
    super()
    this._frame = frame
    this._enabled = false
    this._eventHandlers = new Map()
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
    this.bindTree(this.document.documentElement)

    const target = document.querySelector('body')
    const observer = new MutationObserver((mutations) => {
      mutations.forEach((mutation) => {
        for (var i = 0; i < mutation.addedNodes.length; i++) {
          const node = mutation.addedNodes.item(i)

          if (node.nodeType === node.ELEMENT_NODE) {
            // console.log(node)
            this.bindTree(<Element>node)
          }
        }
      })
    })

    observer.observe(target, { subtree: true, childList: true })
  }

  enable () {
    this._enabled = true
  }

  disable () {
    this._enabled = false
  }

  protected markEvent (element: Element, eventType: string) {
    var eventMarks = this._eventHandlers.get(element)

    if (!eventMarks) {
      eventMarks = {}
      this._eventHandlers.set(element, eventMarks)
    }

    eventMarks[eventType] = true
  }

  protected isMarked (element: Element, eventType: string) {
    const eventMarks = this._eventHandlers.get(element)

    return eventMarks && eventMarks[eventType]
  }

  protected isClickable (target: Element) {
    if (target instanceof HTMLInputElement) {
      return ['submit', 'reset', 'button', 'image'].indexOf(target.type) !== -1
    } else if (target instanceof HTMLAnchorElement && target.attributes.getNamedItem('href')) {
      return true
    } else {
      return ['button', 'link', 'option', 'checkbox', 'treeitem'].indexOf(target.getAttribute('role')) !== -1
    }
  }

  protected isChangable (target: Element) {
    return ['INPUT', 'TEXTAREA'].indexOf(target.tagName) !== -1
  }

  protected bindTree(root: Element) {
    this.bindEvents(root)

    for (var i = 0; i < root.children.length; i++) {
      const ele = root.children.item(i)
      this.bindEvents(ele)
      this.bindTree(ele)
    }
  }

  protected bindEvents(target: Element) {
    if (this.isClickable(target)) this.bindClickEvent(target)
    if (this.isChangable(target)) this.bindChangeEvent(target)
  }

  protected bindClickEvent (target: Element) {
    if (this.isMarked(target, 'click')) return

    target.addEventListener('click', (e) => {
      this.handleEvent(VirtualEvent.fromDOMEvent(e, this.frame, { eventProps: ['x', 'y'] }))
    })

    this.markEvent(target, 'click')
  }

  protected bindChangeEvent (target: Element) {
    if (this.isMarked(target, 'change')) return

    target.addEventListener('change', (e) => {
      this.handleEvent(VirtualEvent.fromDOMEvent(e, this.frame, { elementProps: ['value'] }))
    })

    this.markEvent(target, 'change')
  }

  protected handleEvent (ve: VirtualEvent) {
    if (!this.enabled) return
    this.emit('detect', ve)
  }
}
