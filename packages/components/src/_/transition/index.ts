import { classNames } from '@uni-component/core'
import { Ref, computed, ref, watch, nextTick } from '@uni-store/core'

function nextFrame(cb: FrameRequestCallback) {
  requestAnimationFrame(() => {
    requestAnimationFrame(cb)
  })
}

export const useTransition = (refValue: Ref, name: string) => {
  // enter-from
  // enter-to
  // leave-from
  // leave-to
  // enter-active
  // leave-active
  const transitionEnd = ref(true)
  const framed = ref(refValue.value)
  watch(() => refValue.value, (val) => {
    framed.value = val
    transitionEnd.value = false
    nextFrame(() => {
      framed.value = !framed.value
    })
  }, {
    flush: 'sync'
  })
  const transtionClass = computed(() => {
    if (transitionEnd.value) return ''
    if (refValue.value) {
      const activeClass = `${name}-enter-active`
      const fromClass = `${name}-enter-from`
      const toClass = `${name}-enter-to`
      return classNames([activeClass, framed.value === refValue.value ? fromClass : toClass])
    } else {
      const activeClass = `${name}-leave-active`
      const fromClass = `${name}-leave-from`
      const toClass = `${name}-leave-to`
      return classNames([activeClass, framed.value === refValue.value ? fromClass : toClass])
    }
  })
  const style = computed(() => {
    return {
      display: refValue.value ? 'block' : transitionEnd.value ? 'none' : 'block'
    }
  })
  const onTransitionEnd = () => {
    transitionEnd.value = true
  }
  return {
    transtionClass,
    style,
    onTransitionEnd
  }
}
