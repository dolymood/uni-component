import {
  ExtractPropTypes,
  PropType,
  useRef,
  onMounted,
  onUnmounted
} from '@uni-component/core'
import { ref } from '@uni-store/core'

type TouchEventHandler = PropType<(e: TouchEvent) => void>

const touchEventProps = {
  onTouchStart: Function as TouchEventHandler,
  onTouchMove: Function as TouchEventHandler,
  onTouchCancel: Function as TouchEventHandler,
  onTouchEnd: Function as TouchEventHandler,
  onLongPress: Function as PropType<() => void>,
  // onLongTap: Function, // do not support
  // ontouchforcechange: Function
}
const eventProps = {
  onClick: Function as PropType<(e: MouseEvent) => void>,
  // onTap: Function, // use click
  onTransitionEnd: Function as PropType<(e: TransitionEvent) => void>,
  onAnimationStart: Function as PropType<(e: AnimationEvent) => void>,
  onAnimationIteration: Function as PropType<(e: AnimationEvent) => void>,
  onAnimationEnd: Function as PropType<(e: AnimationEvent) => void>
}

export const props = {
  ...touchEventProps,
  ...eventProps
}

const eventsMap = Object.keys(props).reduce((map, evt) => {
  map[evt]= evt.slice(2).toLowerCase()
  return map
}, {} as Record<string, string>)

const touchEventsKeys = Object.keys(touchEventProps)
const eventsKeys = Object.keys(eventsMap)

export type Props = ExtractPropTypes<typeof props>

export const useContainer = <EleType extends HTMLElement>(realProps: Props, defaultActions: Props = {}) => {
  const ele = ref<EleType>()
  const setEleRef = useRef(ele)

  let timeoutEvent: NodeJS.Timeout
  let startTime = 0

  const listeners: Record<string, Function> & EventListenerObject = {
    handleEvent(e: Event) {
      listeners[e.type] && listeners[e.type](e)
    },
    touchstart: (e: TouchEvent) => {
      timeoutEvent = setTimeout(() => {
        realProps.onLongPress && realProps.onLongPress()
      }, 350)
      startTime = Date.now()
      defaultActions.onTouchStart && defaultActions.onTouchStart(e)
      realProps.onTouchStart && realProps.onTouchStart(e)
    },
    // todo 10px?
    touchmove: (e: TouchEvent) => {
      clearTimeout(timeoutEvent)
      defaultActions.onTouchMove && defaultActions.onTouchMove(e)
      realProps.onTouchMove && realProps.onTouchMove(e)
    },
    touchend: (e: TouchEvent) => {
      const spanTime = Date.now() - startTime
      if (spanTime < 350) {
        clearTimeout(timeoutEvent)
      }
      defaultActions.onTouchMove && defaultActions.onTouchMove(e)
      realProps.onTouchEnd && realProps.onTouchEnd(e)
    },
    touchcancel: (e: TouchEvent) => {
      clearTimeout(timeoutEvent)
      defaultActions.onTouchCancel && defaultActions.onTouchCancel(e)
      realProps.onTouchCancel && realProps.onTouchCancel(e)
    },
    click: (e: MouseEvent) => {
      defaultActions.onClick && defaultActions.onClick(e)
      realProps.onClick && realProps.onClick(e)
    },
    transitionend: (e: TransitionEvent) => {
      defaultActions.onTransitionEnd && defaultActions.onTransitionEnd(e)
      realProps.onTransitionEnd && realProps.onTransitionEnd(e)
    },
    AnimationStart: (e: AnimationEvent) => {
      defaultActions.onAnimationStart && defaultActions.onAnimationStart(e)
      realProps.onAnimationStart && realProps.onAnimationStart(e)
    },
    AnimationIteration: (e: AnimationEvent) => {
      defaultActions.onAnimationIteration && defaultActions.onAnimationIteration(e)
      realProps.onAnimationIteration && realProps.onAnimationIteration(e)
    },
    AnimationEnd: (e: AnimationEvent) => {
      defaultActions.onAnimationEnd && defaultActions.onAnimationEnd(e)
      realProps.onAnimationEnd && realProps.onAnimationEnd(e)
    }
  }

  const events: string[] = []
  const hasLongPress = realProps.onLongPress !== undefined
  if (hasLongPress) {
    touchEventsKeys.forEach((evt) => {
      if (evt !== 'onLongPress') {
        events.push(eventsMap[evt])
      }
    })
  }
  eventsKeys.forEach((evt) => {
    if (hasLongPress && (touchEventProps as any)[evt] !== undefined) {
      // in touch ignore
    } else {
      if ((realProps as any)[evt] !== undefined || (defaultActions as any)[evt] !== undefined) {
        events.push(eventsMap[evt])
      }
    }
  })

  let dom: EleType
  // bind events
  onMounted(() => {
    dom = ele.value!
    events.forEach((name: any) => {
      dom.addEventListener(name, listeners)
    })
  })
  // unbind events
  onUnmounted(() => {
    events.forEach((name: any) => {
      dom.removeEventListener(name, listeners)
    })
  })

  return {
    ele,
    setEleRef
  }
}
