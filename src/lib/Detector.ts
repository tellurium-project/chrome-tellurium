import * as event from 'eventemitter2'
import * as Rx from 'rxjs/Rx'
import Locator from './Locator'
import VirtualEvent from './VirtualEvent'

export default class Detector extends event.EventEmitter2 {
  static inputFieldTypes = [
    'text', 'password', 'file', 'datetime', 'datetime-local',
    'date', 'month', 'time', 'week', 'number',
    'range', 'email', 'url', 'search', 'tel',
    'color'
  ]
  static doubleClickInterval = 300

  window: Window
  enabled: boolean
  eventHandlers: Map<Element, { [eventType: string]: boolean }>

  constructor (win: Window) {
    super()
    this.window = win
    this.enabled = false
    this.eventHandlers = new Map()
  }

  get document () {
    return this.window.document
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
    this.enabled = true
  }

  disable () {
    this.enabled = false
  }

  protected markEvent (element: Element, eventType: string) {
    var eventMarks = this.eventHandlers.get(element)

    if (!eventMarks) {
      eventMarks = {}
      this.eventHandlers.set(element, eventMarks)
    }

    eventMarks[eventType] = true
  }

  protected isMarked (element: Element, eventType: string) {
    const eventMarks = this.eventHandlers.get(element)

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
    return ['input', 'textarea', 'select'].indexOf(target.tagName.toLowerCase()) !== -1
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
      this.handleEvent(VirtualEvent.fromDOMEvent(e, { eventProps: ['x', 'y'] }))
    })

    this.markEvent(target, 'click')
  }

  protected bindChangeEvent (target: Element) {
    if (this.isMarked(target, 'change')) return

    target.addEventListener('change', (e) => {
      var selectedOpts = []
      if (e.target instanceof HTMLSelectElement) {
        selectedOpts = Array.from(e.target.selectedOptions).map((opt) => opt.textContent)
      }

      const veve = VirtualEvent.fromDOMEvent(e, { elementProps: ['value', 'checked', 'files'] })
      veve['selectedOptions'] = selectedOpts
      this.handleEvent(veve)
    })

    this.markEvent(target, 'change')
  }

  protected handleEvent (ve: VirtualEvent) {
    if (!this.enabled) return
    this.emit('detect', ve)
  }
}
