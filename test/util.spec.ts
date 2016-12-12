import * as assert from 'power-assert'
import { getNth, getNthSelector } from '../src/lib/util'

describe('util', function () {
  before(function () {
    fixture.setBase('test/fixtures/util')
  })

  afterEach(function () {
    fixture.cleanup()
  })

  describe('.getNth', function () {
    beforeEach(function () {
      fixture.load('getNth.html', true)
    })

    it('returns index of given element from the parent', function () {
      const first = document.getElementById('first')
      const second = document.getElementById('second')
      const third = document.getElementById('third')

      assert(getNth(first) === 0)
      assert(getNth(second) === 1)
      assert(getNth(third) === 2)
    })

    it('returns 0 when given element is root element', function () {
      const ele = document.getElementsByTagName('html')[0]

      assert(getNth(ele) === 0)
    })
  })

  describe('.getNthSelector', function () {
    beforeEach(function () {
      fixture.load('getNth.html', true)
    })

    it('returns nth-of-type selector with index of given element', function () {
      const ele = document.getElementById('second')

      assert(getNthSelector(ele) === ':nth-of-type(1)')
    })
  })
})
