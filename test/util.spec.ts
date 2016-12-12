import * as assert from 'power-assert'
import { getNth } from '../src/lib/util'

describe('util', function () {
  before(function () {
    fixture.setBase('test/fixtures/util')
  })

  describe('.getNth', function () {
    beforeEach(function () {
      fixture.load('getNth.html', true)
    })

    it('returns index of given element from the parent', function () {
      console.log(document.getElementById('second'))
    })
  })
})
