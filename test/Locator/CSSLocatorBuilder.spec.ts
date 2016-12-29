import * as assert from 'power-assert'
import Frame from '../../src/lib/Frame'
import CSSLocatorBuilder from '../../src/lib/Locator/CSSLocatorBuilder'

describe('CSSLocatorBuilder', function () {
  before(function () {
    fixture.setBase('test/fixtures')
    fixture.load('locator.html', true)
  })

  describe('#build', function () {
    before(function () {
      this.builder = new CSSLocatorBuilder()
      this.frame = new Frame(window)
      this.container = document.getElementById('css-locator')
    })

    it('returns a css locator of given element', function () {
      const selector = '#css-locator > input[name="foo"]'
      const input = this.container.querySelector(selector)

      const inputLocator = this.builder.build(input, this.frame)
      const containerLocator = this.builder.build(this.container, this.frame)

      assert(inputLocator === selector)
      assert(containerLocator === '#css-locator')
    })
  })
})
