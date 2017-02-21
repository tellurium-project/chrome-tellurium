import VirtualElement from './VirtualElement'
import Locator from './Locator'
import Frame from './Frame'

export default class VirtualEvent {
  type: string
  target: VirtualElement
  path: VirtualElement[]
  locators: { [name: string]: Locator }

  constructor () {
    this.path = []
  }

  static fromDOMEvent (e: Event, { eventProps = [], elementProps = [] }: { eventProps?: string[], elementProps?: string[] }): VirtualEvent {
    const virtualEvent = new VirtualEvent()

    virtualEvent.type = e.type
    virtualEvent.path = this.getVirtualPath(e['path'])
    virtualEvent.target = VirtualElement.fromDOMElement(<Element>e.currentTarget, elementProps)
    virtualEvent.locators = Locator.fromElement(<Element>e.target)

    for (var attr of eventProps) {
      virtualEvent[attr] = e[attr]
    }

    return virtualEvent
  }

  private static getVirtualPath (path: EventTarget[]): VirtualElement[] {
    const virtualPath: VirtualElement[] = []

    for (var target of path) {
      if (target instanceof Element && target.tagName !== 'SHADOW') {
        const virtualElement = VirtualElement.fromDOMElement(target, [])
        virtualPath.push(virtualElement)

        if (target.tagName === 'HTML') break
      }
    }

    return virtualPath
  }
}
