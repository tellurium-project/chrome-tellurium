import Locator from '../lib/Locator'

export default class IDAttrLocator extends Locator {
  buildLocator () {
    return this.element.id
  }

  findElements (locator: string) {
    return [this.document.getElementById(locator)]
  }
}

Locator.register('id', IDAttrLocator)
