import LocatorBuilder from './LocatorBuilder'
import Frame from '../Frame'

export default class LinkTextLocatorBuilder implements LocatorBuilder {
  build (element: Element, frame: Frame): string {
    if (element.tagName.toLowerCase() !== 'a') return null
    return element.textContent
  }

  toLocatorType (): string {
    return 'linkText'
  }
}
