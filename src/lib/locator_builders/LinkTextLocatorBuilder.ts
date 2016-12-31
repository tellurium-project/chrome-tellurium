import LocatorBuilder from './LocatorBuilder'
import Frame from '../Frame'
import * as util from '../util'

export default class LinkTextLocatorBuilder implements LocatorBuilder {
  build (element: Element, frame: Frame): string {
    if (element.tagName.toLowerCase() !== 'a') return null
    return util.normalizeWhitespace(element.textContent)
  }

  toLocatorType (): string {
    return 'linkText'
  }
}
