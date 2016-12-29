// import * as assert from 'power-assert'
// import * as util from '../src/lib/util'
//
// describe('util', function () {
//   before(function () {
//     fixture.setBase('test/fixtures/util')
//   })
//
//   afterEach(function () {
//     fixture.cleanup()
//   })
//
//   describe('selectors', function () {
//     beforeEach(function () {
//       fixture.load('selectors.html', true)
//     })
//
//     describe('.getNthChild', function () {
//       it('returns index of given element from the parent', function () {
//         const first = document.getElementById('first')
//         const second = document.getElementById('second')
//         const third = document.getElementById('third')
//
//         assert(util.getNthChild(first) === 1)
//         assert(util.getNthChild(second) === 2)
//         assert(util.getNthChild(third) === 3)
//       })
//
//       it('returns 0 when given element is root element', function () {
//         const ele = document.getElementsByTagName('html')[0]
//
//         assert(util.getNthChild(ele) === 1)
//       })
//     })
//
//     describe('.getNthChildSelector', function () {
//       it('returns nth-of-type selector with index of given element', function () {
//         const ele = document.getElementById('second')
//
//         assert(util.getNthChildSelector(ele) === ':nth-child(2)')
//       })
//     })
//
//     describe('.getAttrSelector', function () {
//       it('returns attribute selector', function () {
//         const ele = document.getElementById('dashboard-link')
//
//         assert(util.getAttrSelector(ele, 'id', 'href') === '[id="dashboard-link" href="/dashboard"]')
//       })
//
//       it('filters non given attributes to the element', function () {
//         const ele = document.getElementById('dashboard-link')
//
//         assert(util.getAttrSelector(ele, 'id', 'css') === '[id="dashboard-link"]')
//       })
//
//       it("returns an empty string when all given attributes wasn't specify on the element", function () {
//         const ele = document.getElementById('dashboard-link')
//
//         assert(util.getAttrSelector(ele, 'class', 'css') === '')
//       })
//     })
//
//     describe('.getElementSelector', function () {
//       it('returns element selector', function () {
//         const div = document.getElementById('parent')
//         const p = document.getElementById('first')
//
//         assert(util.getElementSelector(div) === 'div')
//         assert(util.getElementSelector(p) === 'p')
//       })
//     })
//
//     describe('.getIDSelector', function () {
//       it('returns ID selector', function () {
//         const ele = document.getElementById('parent')
//
//         assert(util.getIDSelector(ele) === '#parent')
//       })
//
//       it('returns empty string when given element has no ID attribute', function () {
//         const ele = document.querySelector('#parent > a')
//
//         assert(util.getIDSelector(ele) === '')
//       })
//     })
//
//     describe('.getClassSelector', function () {
//       it('returns class selector', function () {
//         const ele = document.getElementById('container')
//
//         assert(util.getClassSelector(ele) === '.container')
//       })
//
//       it('returns empty string when given element has no class attribute', function () {
//         const ele = document.getElementById('parent')
//
//         assert(util.getClassSelector(ele) === '')
//       })
//     })
//
//     describe('.toCSSLocator', function () {
//       it('returns location written CSS selector for the element', function () {
//         const ele1 = document.querySelector('#parent')
//         const ele2 = document.querySelector('#parent > a:nth-child(4)')
//
//         assert(util.toCSSLocator(ele1) === '#parent')
//         assert.throws(
//           () => {
//             util.toCSSLocator(ele2)
//           },
//           (err) => {
//             assert(err.message === 'Support only ID selector')
//             return true
//           }
//         )
//       })
//     })
//   })
// })
