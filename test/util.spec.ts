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

    afterEach(function () {
      fixture.cleanup()
    })

    it('returns index of given element from the parent', function () {
      const first = document.getElementById('first')
      const second = document.getElementById('second')
      const third = document.getElementById('third')

      assert(getNth(first) === 0)
      assert(getNth(second) === 1)
      assert(getNth(third) === 2)
    })

    it('returns 0 when the element has no parent', function () {
      const ele = document.getElementsByTagName('html')[0]

      assert(getNth(ele) === 0)
    })
  })
})
