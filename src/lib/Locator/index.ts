import LocatorBuilder from './LocatorBuilder'
import IDLocatorBuilder from './IDLocatorBuilder'
import NameLocatorBuilder from './NameLocatorBuilder'
import LinkTextLocatorBuilder from './LinkTextLocatorBuilder'
import CSSLocatorBuilder from './CSSLocatorBuilder'
import Frame from '../Frame'

type LocatorMatcher =
  (element: Element, frame: Frame, locator: string, locatorType: string, bestMethod?: boolean) => boolean

export default class Locator {
  private _originalElement: Element
  private _frame: Frame
  private _type: string
  private _candidates: {}

  constructor (originalElement: Element, type: string, candidates: {}) {
    this._originalElement = originalElement
    this._type = type
    this._candidates = candidates
  }

  get type () {
    return this._type
  }

  get value () {
    return this.candidates[this.type][0] || ''
  }

  get candidates () {
    return this._candidates
  }

  get originalElement () {
    return this._originalElement
  }

  equals (other: Locator) {
    return this.originalElement === other.originalElement
  }

  static readonly defaultBuilders: LocatorBuilder[] = [
    new IDLocatorBuilder(),
    new NameLocatorBuilder(),
    new LinkTextLocatorBuilder(),
    new CSSLocatorBuilder()
  ]

  static fromElement (element: Element, frame: Frame, builders = this.defaultBuilders): Locator {
    const locatorMatcher: LocatorMatcher = (element: Element, frame: Frame, locator: string, locatorType: string): boolean => {
      if (locator && frame.locateElement(locatorType, locator) === element) return true
      return false
    }

    const values = {}
    var bestMethod = null

    for (const builder of builders) {
      const locator = builder.build(element, frame)
      const locatorType = builder.toLocatorType()
      values[locatorType] = values[locatorType] || []

      if (locator) {
        values[locatorType].push(locator)
      }

      const isMatch = locatorMatcher(element, frame, locator, locatorType)
      if (isMatch && !bestMethod) bestMethod = locatorType
    }

    return new Locator(element, bestMethod, values)
  }
}
