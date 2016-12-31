import Frame from '../Frame'

interface LocatorBuilder {
  build (element: Element, frame: Frame): string
  toLocatorType (): string
}

export default LocatorBuilder
