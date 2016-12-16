import * as Immutable from 'immutable'

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

export const toCSSLocator = (element: Element): string => {
  const locator = getIDSelector(element)

  if (locator) {
    return locator;
  } else {
    throw new Error('ID 以外セレクタ以外のロケータには未対応です')
  }
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

export const getNthChild = (element: Element): number => {
  return (
    element.parentElement ?
    Array.prototype.indexOf.call(element.parentElement.children, element) + 1 :
    1
  )
}

export const getNthChildSelector = (element: Element): string => {
  const nth = getNthChild(element)

  return `:nth-child(${nth})`
}
