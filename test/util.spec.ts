import * as assert from 'power-assert'
import { getNth } from '../src/lib/util'

describe('util', function () {
  before(function () {
    fixture.setBase('test/fixtures/util')
  })

  describe('.getNth', function () {
    beforeEach(function () {
      this.html = fixture.load('getNth.html')[0]
    })

    it('returns index of given element from the parent', function () {
      // console.log(this.html.getElementById('second'))
    })
  })
})
