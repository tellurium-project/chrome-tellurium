import * as util from './util'

export default class Frame {
  private _window: Window

  readonly locatorMethods = {
    id: this.locateElementByID,
    name: this.locateElementByName,
    linkText: this.locateElementByLinkText,
    css: this.locateElementByCSS
  }

  constructor (window: Window) {
    this._window = window
  }

  get window () {
    return this._window
  }

  get document () {
    return this.window.document
  }

  locateElement (locatorType: string, locator: string): Element {
    return this.locatorMethods[locatorType].call(this, locator)
  }

  locateElementByID (id): Element {
    return this.document.getElementById(`${id}`)
  }

  locateElementByName (name): Element {
    return this.document.querySelector(`[name="${name}"]`)
  }

  locateElementByLinkText (linkText): Element {
    const anchors = Array.from(this.document.getElementsByTagName('a'))

    return anchors.find((a) => {
      return util.normalizeWhitespace(a.textContent.toLowerCase()) === linkText.toLowerCase()
    })
  }

  locateElementByCSS (selector): Element {
    return this.document.querySelector(selector)
  }

  locateElementByXPath (xpath): Node {
    // Why 7 as a parameter? No one knows. It's what http://coderepos.org/share/wiki/JavaScript-XPath uses.
    // And there's no docs, only a handful of examples. Sigh. But this *seems* to work. qqDPS
    var el = window.document.evaluate(xpath, window.document, null, 7, null)
    return el.snapshotItem(0) ? el.snapshotItem(0) : null
  }
}
