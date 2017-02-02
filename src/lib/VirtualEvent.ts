import VirtualElement from './VirtualElement'
import Locator from './Locator'
import Frame from './Frame'

export default class VirtualEvent {
  type: string
  target: VirtualElement
  path: VirtualElement[]
  locator: Locator

  constructor () {
    this.path = []
  }

  static fromDOMEvent (e: Event, frame: Frame, { eventProps = [], elementProps = [] }: { eventProps?: string[], elementProps?: string[] }): VirtualEvent {
    const virtualEvent = new VirtualEvent()

    virtualEvent.type = e.type
    virtualEvent.path = this.getVirtualPath(e['path'])
    virtualEvent.target = VirtualElement.fromDOMElement(<Element>e.target, elementProps)
    virtualEvent.locator = Locator.fromElement(<Element>e.target, frame)

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
