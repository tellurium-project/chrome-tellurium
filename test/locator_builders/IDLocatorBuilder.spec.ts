import * as assert from 'power-assert'
import Frame from '../../src/lib/Frame'
import IDLocatorBuilder from '../../src/lib/locator_builders/IDLocatorBuilder'

describe('IDLocatorBuilder', function () {
  before(function () {
    fixture.setBase('test/fixtures')
    fixture.load('locator.html', true)
  })

  describe('#build', function () {
    it('returns an ID of given element', function () {
      const builder = new IDLocatorBuilder()
      const frame = new Frame(window)
      const id = 'input-with-id'
      const element = document.getElementById(id)
      const locator = builder.build(element, frame)

      assert(locator === id)
    })
  })
})
