import assert from 'power-assert'

describe('Array', () => {
  describe('#indexOf()', () => {
    it('should return -1 when the value is not present', () => {
      assert([1, 2, 3].indexOf(5) === -1)
      assert([1, 2, 3].indexOf(1) === -1) // ここが失敗する
    })
  })
})
