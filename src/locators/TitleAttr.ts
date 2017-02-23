import Locator from '../lib/Locator'

export default class TitleAttr extends Locator {
  buildLocator () {
    return this.element.getAttribute('title')
  }

  findElements (locator: string) {
    return this.document.querySelectorAll(`[title="${locator}"]`)
  }
}

Locator.register('title', TitleAttr)
