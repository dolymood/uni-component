import { getCurrentInstance, Instance } from './instance'

export enum LIFYCYCLE_HOOKS {
  mounted = 'mounted',
  updated = 'updated',
  unmounted = 'unmounted'
}

const createLifycycle = (name: LIFYCYCLE_HOOKS) => {
  return function (hook: Function) {
    const instance = getCurrentInstance()
    const hooks = instance!.hooks
    let lifyHooks = hooks[name]
    if (!lifyHooks) {
      lifyHooks = hooks[name] = new Set()
    }
    lifyHooks.add(hook)
  }
}

const invokeLifeCycle = (instance: Instance<any, any>, name: LIFYCYCLE_HOOKS) => {
  if (!instance) {
    console.error(`Invoking ${name} lifycycle, can not get current instance!`)
    return
  }
  const invoke = () => {
    const lifyHooks = instance.hooks[name]
    if (lifyHooks) {
      lifyHooks.forEach((lifyHook) => {
        lifyHook()
      })
    }
  }
  const invokingMap = {
    [LIFYCYCLE_HOOKS.mounted]: () => {
      if (!instance.isMounted) {
        invoke()
        instance.isMounted = true
      }
    },
    [LIFYCYCLE_HOOKS.updated]: () => {
      if (instance.isMounted && !instance.isUnmounted) {
        invoke()
      }
    },
    [LIFYCYCLE_HOOKS.unmounted]: () => {
      if (!instance.isUnmounted) {
        invoke()
        instance.isUnmounted = true
      }
    }
  }
  invokingMap[name]()
}

const createInvokeLifycycle = (name: LIFYCYCLE_HOOKS) => {
  return (instance: Instance<any, any>) => invokeLifeCycle(instance, name)
}

export const onMounted = createLifycycle(LIFYCYCLE_HOOKS.mounted)
export const onUpdated = createLifycycle(LIFYCYCLE_HOOKS.updated)
export const onUnmounted = createLifycycle(LIFYCYCLE_HOOKS.unmounted)

export const invokeMounted = createInvokeLifycycle(LIFYCYCLE_HOOKS.mounted)
export const invokeUpdated = createInvokeLifycycle(LIFYCYCLE_HOOKS.updated)
export const invokeUnmounted = createInvokeLifycycle(LIFYCYCLE_HOOKS.unmounted)
