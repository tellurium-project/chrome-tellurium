import * as assert from 'power-assert'
import Frame from '../../src/lib/Frame'
import LinkTextLocatorBuilder from '../../src/lib/Locator/LinkTextLocatorBuilder'

describe('LinkTextLocatorBuilder', function () {
  before(function () {
    fixture.setBase('test/fixtures')
    fixture.load('locator.html', true)
  })

  describe('#build', function () {
    before(function () {
      this.builder = new LinkTextLocatorBuilder()
      this.frame = new Frame(window)
    })

    it('returns a link locator of given element', function () {
      const googleLink = document.getElementById('google-link')
      const yahooLink = document.getElementById('yahoo-link')
      const googleLocator = this.builder.build(googleLink, this.frame)
      const yahooLocator = this.builder.build(yahooLink, this.frame)

      assert(googleLocator === 'Google')
      assert(yahooLocator === 'Yahoo')
    })

    context('give an element except anchor tag', function () {
      it('returns null', function () {
        const elementExceptAnchorTag = document.getElementById('except-anchor-tag')
        const locator = this.builder.build(elementExceptAnchorTag, this.frame)

        assert(locator === null)
      })
    })
  })
})
