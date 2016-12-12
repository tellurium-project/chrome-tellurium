export const isPrimitive = (value: any): boolean => {
  const type = typeof value
  return (
    type === 'string' ||
    type === 'number' ||
    type === 'boolean' ||
    value === null ||
    value === undefined
  )
}

export const toCSSSelector = (element: Element): string => {
  // セレクタを生成
  // 生成したセレクタが一意に特定できるかを調べる
  // 特定できるならそのセレクタを使用する
  // 出来ないなら、親要素もセレクタに含める
  const path = []
  var current = element
  var currentSelector : string

  while (true) {
    // id はどの要素も優先
    // name 属性
    const selectors = [
      getIDSelector(current),
      getClassSelector(current),
      getElementSelector(current) + getClassSelector(current),
      getAttrSelector(current, 'name'),
      getElementSelector(current) + getAttrSelector(current, 'name'),
      getElementSelector(current) + getNthSelector(current)
    ]

    const foundSelector = selectors.find((selector) => selector !== '')

    path.unshift(foundSelector)
    currentSelector = path.join(' > ')

    if (document.querySelectorAll(currentSelector).length === 1) break

    current = current.parentElement
    if (!current) break
  }

  return currentSelector
}

export const getIDSelector = (element: Element): string => {
  return element.id ? '#' + element.id : ''
}

export const getClassSelector = (element: Element): string => {
  return (
    element.classList.length > 0 ?
     '.' + Array.prototype.join.call(element.classList, '.') :
     ''
  )
}

export const getElementSelector = (element: Element): string => {
  return element.tagName.toLowerCase()
}

export const getAttrSelector = (element: Element, ...attributes: string[]): string => {
  const inner =
    attributes
      .map((attr) => {
        const value = element.getAttribute(attr)
        return value ? `${attr}="${value}"` : null
      })
      .filter((attrExpr) => {
        return attrExpr !== null
      })
      .join(' ')

  return inner ? '[' + inner + ']' : ''
}

export const getNth = (element: Element): number => {
  return (
    element.parentElement ?
    Array.prototype.indexOf.call(element.parentElement.children, element) :
    0
  )
}

export const getNthSelector = (element: Element): string => {
  const nth = getNth(element)

  return nth === -1 ? '' : `:nth-of-type(${nth})`
}
