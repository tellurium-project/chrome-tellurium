type LocatorConstructor = new(element: Element) => Locator

abstract class Locator {
  element: Element
  value: string
  isAvailable: boolean
  isUnique: boolean

  constructor (element: Element) {
    this.element = element
    this.build()
  }

  abstract buildLocator (): string
  abstract findElements (locator: string): Node[] | NodeList

  build (): void {
    const locator = this.buildLocator()
    if (locator === undefined || locator === null) return

    const elements = this.findElements(locator)

    if (elements.length > 0 && elements[0] == this.element) {
      this.isAvailable = true
      this.value = locator

      if (elements.length === 1) this.isUnique = true
    }
  }

  get document (): Document {
    return this.element.ownerDocument
  }

  static locators: { [name: string]: LocatorConstructor }

  static initialize () {
    this.locators = {}
  }

  static register (name: string, ctor: LocatorConstructor): void {
    this.locators[name] = ctor
  }

  static fromElement (element: Element): { [name: string]: Locator } {
    const availableLocators = {}

    for (var name in this.locators) {
      const ctor = this.get(name)
      const locator = new ctor(element)
      if (locator.isAvailable) availableLocators[name] = locator
    }

    return availableLocators
  }

  static get (name: string): LocatorConstructor {
    return this.locators[name]
  }
}

Locator.initialize()
export default Locator
