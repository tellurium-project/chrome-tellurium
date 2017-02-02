export default class VirtualElement {
  tagName: string
  classList: string[]
  attributes: {}

  constructor () {
    this.attributes = {}
    this.classList = []
  }

  static fromDOMElement (element: Element, elementProps: string[]): VirtualElement {
    const virtualElement = new VirtualElement()

    virtualElement.tagName = element.nodeName.toLowerCase()

    for (const prop of elementProps) {
      virtualElement[prop] = element[prop]
    }

    for (var i = 0; i < element.classList.length; i++) {
      virtualElement.classList.push(element.classList.item(i))
    }

    for (var i = 0; i < element.attributes.length; i++) {
      const attr = element.attributes.item(i)
      virtualElement.attributes[attr.name] = attr.value
    }

    return virtualElement
  }
}
