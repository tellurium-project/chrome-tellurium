import Locator from '../lib/Locator'
import * as util from '../lib/util'

export default class LinkTextLocator extends Locator {
  buildLocator () {
    if (this.element.tagName.toLowerCase() !== 'a') return null
    return util.normalizeWhitespace(this.element.textContent)
  }

  findElements (locator: string) {
    const anchors = Array.from(this.document.getElementsByTagName('a'))

    return anchors.filter((a) => {
      return util.normalizeWhitespace(a.textContent.toLowerCase()) === locator.toLowerCase()
    })
  }
}

Locator.register('linkText', LinkTextLocator)
