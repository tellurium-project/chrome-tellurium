import Locator from '../lib/Locator'

export default class CSSLocator extends Locator {
  static readonly targetAttributes = ['id', 'name', 'class', 'type', 'alt', 'title', 'value']

  buildLocator () {
    var current = this.element
    var selector = this.buildSimpleSelector(this.element)

    while (this.document.querySelector(selector) !== this.element && current.tagName.toLowerCase() !== 'html') {
      // console.log(this.buildAttr(current.parentElement), this.buildNthOfType(current.parentElement), this.buildType(current.parentElement))
      selector = this.buildSimpleSelector(current.parentElement) + ' > ' + selector
      current = current.parentElement
    }

    return selector
  }

  findElements (locator: string) {
    return this.document.querySelectorAll(locator)
  }

  private buildSimpleSelector (element: Element): string {
    return this.buildAttr(element) || this.buildNthOfType(element) || this.buildType(element)
  }

  private buildAttr (element: Element): string {
    const validAttrs =
      CSSLocator.targetAttributes.filter((attr) => {
        return element.hasAttribute(attr)
      }).map((attr) => {
        switch (attr.toLowerCase()) {
          case 'id':
            return `${element.getAttribute('id')}`
          case 'class':
            return `.${Array.from(element.classList).join('.')}`
          default:
            return `${element.tagName.toLowerCase()}[${attr}="${element.getAttribute(attr)}"]`
        }
      })

    return validAttrs[0]
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

    return index >= 0 ? `${this.buildType(element)}:nth-of-type(${index + 1})` : null
  }

  private buildType (element: Element): string {
    return element.tagName.toLowerCase()
  }
}

Locator.register('css', CSSLocator)
