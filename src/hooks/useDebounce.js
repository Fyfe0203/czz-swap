import { useRef } from 'react'

function debounce(wait, func, immediate) {
  var timeout
  return function() {
    var context = this
    var args = arguments
    var later = function() {
      timeout = null
      if (!immediate) func.apply(context, args)
    }
    var callNow = immediate && !timeout
    clearTimeout(timeout)
    timeout = setTimeout(later, wait)
    if (callNow) func.apply(context, args)
  }
}

function useDebounce({ fn, wait = 1000 }) {
  return useRef(debounce(wait, fn)).current
}
export default useDebounce