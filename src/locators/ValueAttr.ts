import Locator from '../lib/Locator'

export default class ValueAttrLocator extends Locator {
  buildLocator () {
    return this.element.getAttribute('value')
  }

  findElements (locator: string) {
    return this.document.querySelectorAll(`[value="${locator}"]`)
  }
}

Locator.register('value', ValueAttrLocator)
