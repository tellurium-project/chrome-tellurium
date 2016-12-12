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
  const candidates = []
  _toCSSLocator(element, element, [], candidates)
  candidates.sort((a, b) => a.length - b.length)

  return candidates[0]
}

export const _toCSSLocator = (origin: Element, element: Element, path: string[], candidates: string[]) => {
  if (!element) return

  const selectors = [
    getIDSelector(element),
    getClassSelector(element),
    getElementSelector(element) + getClassSelector(element),
    getAttrSelector(element, 'name'),
    getElementSelector(element) + getAttrSelector(element, 'name'),
    getElementSelector(element) + getNthChildSelector(element)
  ].filter((selector) => selector !== '')

  selectors.forEach((s) => {
    const newPath = [s].concat(path)
    const newSelector = newPath.join(' > ')
    const foundElements = document.querySelectorAll(newSelector)

    if (foundElements.length === 1 && foundElements.item(0) === origin) {
      candidates.push(newSelector)
      return
    } else {
      _toCSSLocator(element, element.parentElement, newPath, candidates)
    }
  })
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
