import * as assert from 'power-assert'
import Frame from '../../src/lib/Frame'
import NameLocatorBuilder from '../../src/lib/locator_builders/NameLocatorBuilder'

describe('NameLocatorBuilder', function () {
  before(function () {
    fixture.setBase('test/fixtures')
    fixture.load('locator.html', true)
  })

  describe('#build', function () {
    it('returns a name locator of given element', function () {
      const builder = new NameLocatorBuilder()
      const frame = new Frame(window)
      const element = document.getElementById('input-with-name')
      const locator = builder.build(element, frame)

      assert(locator === 'foo')
    })
  })
})
