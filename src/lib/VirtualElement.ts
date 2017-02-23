export default class VirtualElement {
  tagName: string
  classList: string[]
  attributes: {}

  constructor (obj = {}) {
    for (var key in obj) {
      this[key] = obj[key]
    }

    this.attributes = obj['attributes'] || {}
    this.classList = obj['classList'] || []
  }

  equals (other: VirtualElement) {
    var attrEqual = true

    for (var attrName in this.attributes) {
      if (this.attributes[attrName] !== other.attributes[attrName]) {
        attrEqual = false
        break
      }
    }

    return this.tagName === other.tagName && attrEqual
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
