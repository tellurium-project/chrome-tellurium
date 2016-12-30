import LocatorBuilder from './LocatorBuilder'
import Frame from '../frame'

export default class IDLocatorBuilder implements LocatorBuilder {
  build (element: Element, frame: Frame): string {
    return element.id
  }

  toLocatorType (): string {
    return 'id'
  }
}
