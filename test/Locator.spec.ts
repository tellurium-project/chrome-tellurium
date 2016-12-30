import * as assert from 'power-assert'
import Locator from '../src/lib/Locator'
import Frame from '../src/lib/Frame'

describe('Locator', function () {
  before(function () {
    fixture.setBase('test/fixtures')
    fixture.load('locator.html', true)
  })

  describe('.fromElement', function () {
    before(function () {
      this.frame = new Frame(window)
      this.container = document.querySelector('#locators')
    })

    it('returns a best locator from given element', function () {
      const container: Element = this.container

      const locators =
        Array.from(container.children)
          .map((child) => Locator.fromElement(child, this.frame))

      assert(locators[0].type === 'id')
      assert(locators[0].value === 'locators-foo')
      assert(locators[1].type === 'name')
      assert(locators[1].value === 'locators-foo')
      assert(locators[2].type === 'css')
      assert(locators[2].value === '#locators > a:nth-of-type(1)')
      assert(locators[3].type === 'linkText')
      assert(locators[3].value === 'locators-link')
    })
  })
})
