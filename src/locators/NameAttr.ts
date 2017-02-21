import Locator from '../lib/Locator'

export default class NameAttr extends Locator {
  buildLocator () {
    return this.element.getAttribute('name')
  }

  findElements (locator: string) {
    return this.document.querySelectorAll(`[name="${locator}"]`)
  }
}

Locator.register('name', NameAttr)
