import LocatorBuilder from './LocatorBuilder'
import Frame from '../Frame'

export default class NameLocatorBuilder implements LocatorBuilder {
  build (element: Element, frame: Frame): string {
    return element.getAttribute('name')
  }

  toLocatorType (): string {
    return 'name'
  }
}
