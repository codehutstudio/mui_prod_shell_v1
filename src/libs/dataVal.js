const {toString} = Object.prototype

export const isObject = val => toString.call(val) === '[object Object]'
export const isString = val => toString.call(val) === '[object String]'
export const isFunction = val => toString.call(val) === '[object Function]'
export const isArray = val => Array.isArray(val)
export const isBoolean = val => typeof val === 'boolean'
export const isUndefined = val => val === undefined
export const isNull = val => val === null
export const isEmpty = val => {
    if (isObject(val) && Object.keys(val).length === 0) return true
    if (isString(val) && val.length === 0) return true
    if (isArray(val) && val.length === 0) return true
    return false
}
export const first = val => {
    if(isArray(val)) return val[0]
    if(isObject(val)) return val[Object.keys(val)[0]]
} 

export const range = count => Array.from(Array(count).keys())
export const last = array => array.pop()