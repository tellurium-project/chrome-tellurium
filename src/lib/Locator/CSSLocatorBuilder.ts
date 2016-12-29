import LocatorBuilder from './LocatorBuilder'
import Frame from '../Frame'

export default class CSSLocatorBuilder implements LocatorBuilder {
  readonly targetAttributes = ['id', 'name', 'class', 'type', 'alt', 'title', 'value']
  readonly specialAttributeBuilders = {
    id: this.buildIDAttr,
    class: this.buildClassAttr
  }

  build (element: Element, frame: Frame): string {
    var current = element
    var selector = this.buildSimpleSelector(element)

    while (frame.locateElementByCSS(selector) !== element && current.tagName.toLowerCase() !== 'html') {
      selector = this.buildSimpleSelector(current.parentElement) + ' > ' + selector
      current = current.parentElement
    }

    return selector
  }

  toLocatorType (): string {
    return 'css'
  }

  private buildSimpleSelector (element: Element): string {
    return this.buildAttr(element) || this.buildNthOfType(element) || this.buildType(element)
  }

  private buildAttr (element: Element): string {
    const validAttrs =
      this.targetAttributes.filter((attr) => {
        return element.hasAttribute(attr)
      }).map((attr) => {
        const buildFunc = this.specialAttributeBuilders[attr.toLowerCase()] || this.buildNormalAttr
        return buildFunc(element, attr)
      })

    return validAttrs[0]
  }

  private buildNormalAttr (element: Element, attr: string): string {
    return `${element.tagName.toLowerCase()}[${attr}="${element.getAttribute(attr)}"]`
  }

  private buildIDAttr (element: Element): string {
    return `#${element.id}`
  }

  private buildClassAttr (element: Element): string {
    return `.${Array.from(element.classList).join('.')}`
  }

  private buildNthOfType (element: Element): string {
    if (!element.parentElement) return null

    const children = element.parentElement.children
    var total = 0
    var index = -1

    for (var i = 0; i < children.length; i++) {
      const child = children[i]

      if (child === element) {
        index = total
        break
      }

      if (child.tagName === element.tagName) total++
    }

    return index >= 0 ? `${this.buildType(element)}:nth-of-type(${index})` : null
  }

  private buildType (element: Element): string {
    return element.tagName
  }
}
