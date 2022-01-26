import { computed } from '@uni-store/core'
import { isArray, isFunction } from '@vue/shared'
import { h, uniComponent, provide, inject, invokeMounted, invokeUnmounted, UniNode, capture } from '../src'

describe('Test Core', () => {
  it('should work correctly - without props', () => {
    const C = uniComponent('a', (name) => {
      const clickAction = () => {
        console.log('xx')
      }
      return {
        name,
        clickAction
      }
    })
    expect(typeof C).toBe('function')
    expect(C.name).toEqual('A')
    expect(typeof C.render).toBe('function')
    C.render = (_, state) => {
      expect(state.rootClass).toEqual('a')
      expect(state.name).toEqual('a')
      return {
        type: 'vnode'
      }
    }
    const r = C({})
    const s = r.state
    expect(s.name).toEqual('a')
    expect(typeof s.clickAction).toBe('function')
    expect(typeof r.render).toBe('function')
    expect(r.render).not.toEqual(C.render)
    expect(s.rootClass).toEqual('a')
    expect((r.render() as any).type).toEqual('vnode')
    invokeUnmounted(r)
  })
  it('should work correctly - with array props', () => {
    const C = uniComponent('a-b', ['a', 'b'], (name, props) => {
      const clickAction = () => {
        console.log('xx')
      }
      return {
        props,
        name,
        clickAction
      }
    })
    expect(typeof C).toBe('function')
    expect(C.name).toEqual('AB')
    expect(typeof C.render).toBe('function')
    C.render = (props, state) => {
      expect(props.a).toEqual('a')
      expect(props.b).toEqual(1)
      expect(state.rootClass).toEqual('a-b')
      expect(state.name).toEqual('a-b')
      return {
        type: 'vnode'
      }
    }
    const r = C({
      a: 'a',
      b: 1
    })
    const s = r.state
    expect(s.name).toEqual('a-b')
    expect(typeof s.clickAction).toBe('function')
    expect(typeof r.render).toBe('function')
    expect(r.render).not.toEqual(C.render)
    expect(s.rootClass).toEqual('a-b')
    expect(r.props.a).toEqual('a')
    expect(r.props.b).toEqual(1)
    expect((r.render() as any).type).toEqual('vnode')
    invokeUnmounted(r)
  })
  it('should work correctly - with object props', () => {
    const C = uniComponent('a-b', {
      a: Boolean,
      b: Number,
      c: {
        type: String,
        default: 'c'
      },
      d: {
        type: String,
        required: true
      }
    }, (name, props) => {
      const clickAction = () => {
        console.log('xx')
      }
      const rootClass = computed(() => {
        return {
          'a-b_c': !props.a
        }
      })
      const rootStyle = computed(() => {
        return {
          width: '100px',
          height: '100px'
        }
      })
      return {
        rootClass,
        rootStyle,
        props,
        name,
        clickAction
      }
    })
    expect(typeof C).toBe('function')
    expect(C.name).toEqual('AB')
    expect(typeof C.render).toBe('function')
    C.render = (props, state) => {
      expect(props.a).toEqual(false)
      expect(props.b).toEqual(1)
      expect(props.c).toEqual('cc')
      expect(props.d).toEqual('d')
      expect(state.rootClass).toEqual('a-b a-b_c')
      expect(state.rootStyle.width).toEqual('100px')
      expect(state.rootStyle.height).toEqual('200px')
      expect(state.rootStyle.color).toBeUndefined()
      expect(state.rootId).toEqual('id')
      expect(state.name).toEqual('a-b')
      return {
        type: 'vnode'
      }
    }
    const r = C({
      b: 1,
      c: 'cc',
      d: 'd',
      id: 'id',
      style: 'height: 200px ; '
    })
    const s = r.state
    expect(s.name).toEqual('a-b')
    expect(typeof s.clickAction).toBe('function')
    expect(typeof r.render).toBe('function')
    expect(r.render).not.toEqual(C.render)
    expect(s.rootClass).toEqual('a-b a-b_c')
    // todo
    expect(r.props.a).toEqual(false)
    expect(r.props.b).toEqual(1)
    expect(r.props.c).toEqual('cc')
    expect(r.props.d).toEqual('d')
    expect((r.render() as any).type).toEqual('vnode')
    invokeUnmounted(r)
  })
})

describe('Test instance', () => {
  it('should work correctly - instance', () => {
    const render = (props: any, state: any) => {
      return h('div', props)
    }
    const A = uniComponent('a', { context: String }, (name) => {
      return {
        name
      }
    })
    A.render = render
    const B = uniComponent('b', { context: String }, (name) => {
      return {
        name
      }
    })
    B.render = render
    const C = uniComponent('c', { context: String }, (name) => {
      return {
        name
      }
    })
    C.render = render
    const D = uniComponent('d', { context: String }, (name) => {
      return {
        name
      }
    })
    D.render = () => {
      return h(C, {
        context: 'd-c',
        children: [
          h(B, {
            context: 'd-c-b1',
          }),
          h(A, {
            context: 'd-c-a1',
          }),
          h(B, {
            context: 'd-c-b2',
            children: [h(A, {
              context: 'd-c-b2-a1',
            }), h(A, {
              context: 'd-c-b2-a2',
            })]
          }),
          h(A, {
            context: 'd-c-a2',
            children: h(B, {
              context: 'd-c-a2-b',
            })
          })
        ]
      })
    }
  
    const Container = uniComponent('container', (name) => {
      return {
        name
      }
    })
    Container.render = () => {
      return h(A, {
        context: 'container-a',
        children: [
          h(B, {
            context: 'container-a-b',
            children: h(C, {
              context: 'container-a-b-c',
            })
          }),
          h(C, {
            context: 'container-a-c',
          }),
          h(D, {
            context: 'container-a-d',
          })
        ]
      })
    }

    const vnode = h(Container, {})
    renderNode(vnode)
    const dom = vnode.__dom__
    const container = dom.instance
    expect(container.state.name).toEqual('container')
    expect(container.children.length).toEqual(1)

    const containerA = container.children[0]
    expect(containerA.state.name).toEqual('a')
    expect(containerA.props.context).toEqual('container-a')
    expect(containerA.children.length).toEqual(3)

    const containerAB = containerA.children[0]
    expect(containerAB.state.name).toEqual('b')
    expect(containerAB.props.context).toEqual('container-a-b')
    expect(containerAB.children.length).toEqual(1)

    const containerABC = containerAB.children[0]
    expect(containerABC.state.name).toEqual('c')
    expect(containerABC.props.context).toEqual('container-a-b-c')
    expect(containerABC.children.length).toEqual(0)

    const containerAC = containerA.children[1]
    expect(containerAC.state.name).toEqual('c')
    expect(containerAC.props.context).toEqual('container-a-c')
    expect(containerAC.children.length).toEqual(0)

    const containerAD = containerA.children[2]
    expect(containerAD.state.name).toEqual('d')
    expect(containerAD.props.context).toEqual('container-a-d')
    expect(containerAD.children.length).toEqual(1)

    const dC = containerAD.children[0]
    expect(dC.state.name).toEqual('c')
    expect(dC.props.context).toEqual('d-c')
    expect(dC.children.length).toEqual(4)

    const dCB1 = dC.children[0]
    expect(dCB1.state.name).toEqual('b')
    expect(dCB1.props.context).toEqual('d-c-b1')
    expect(dCB1.children.length).toEqual(0)

    const dCA1 = dC.children[1]
    expect(dCA1.state.name).toEqual('a')
    expect(dCA1.props.context).toEqual('d-c-a1')
    expect(dCA1.children.length).toEqual(0)

    const dCB2 = dC.children[2]
    expect(dCB2.state.name).toEqual('b')
    expect(dCB2.props.context).toEqual('d-c-b2')
    expect(dCB2.children.length).toEqual(2)

    const dCB2A1 = dCB2.children[0]
    expect(dCB2A1.state.name).toEqual('a')
    expect(dCB2A1.props.context).toEqual('d-c-b2-a1')
    expect(dCB2A1.children.length).toEqual(0)

    const dCB2A2 = dCB2.children[1]
    expect(dCB2A2.state.name).toEqual('a')
    expect(dCB2A2.props.context).toEqual('d-c-b2-a2')
    expect(dCB2A2.children.length).toEqual(0)

    const dCA2 = dC.children[3]
    expect(dCA2.state.name).toEqual('a')
    expect(dCA2.props.context).toEqual('d-c-a2')
    expect(dCA2.children.length).toEqual(1)

    const dCA2B = dCA2.children[0]
    expect(dCA2B.state.name).toEqual('b')
    expect(dCA2B.props.context).toEqual('d-c-a2-b')
    expect(dCA2B.children.length).toEqual(0)

    invokeUnmounted(container)
  })
})

describe('Test provide & inject', () => {
  it('should work correctly - provide inject', () => {
    const render = (props: any, state: any) => {
      return h('div', props)
    }
    const key1 = 'p1'
    const key2 = 'p2'
    const A = uniComponent('a', (name) => {
      provide(key1, name)
      provide(key2, `${name}${name}`)
      const captureKey1 = capture(key1, 'def key1')
      const captureKey2 = capture(key2, 'def key2')
      return {
        name,
        captureKey1,
        captureKey2
      }
    })
    A.render = render
    const B = uniComponent('b', (name) => {
      provide(key1, name)
      return {
        name
      }
    })
    B.render = render
  
    const C = uniComponent('c', (name) => {
      const key1Value = inject(key1)
      const key2Value = inject(key2)
      return {
        name,
        key1Value,
        key2Value
      }
    })
    C.render = render
  
    const Container = uniComponent('container', (name) => {
      return {
        name
      }
    })
    Container.render = () => {
      return h(A, {
        children: [
          h(B, {
            children: h(C, {})
          }),
          h(C, {})
        ]
      })
    }

    const vnode = h(Container, {})
    renderNode(vnode)
    const dom = vnode.__dom__
    const instance = dom.instance
    const aInstance = instance.children[0]
    invokeMounted(aInstance)
    expect(aInstance.state.captureKey1).toEqual('b')
    expect(aInstance.state.captureKey2).toEqual('def key2')
    const abcInstance = aInstance.children[0].children[0]
    
    expect(abcInstance.state.key1Value).toEqual('b')
    expect(abcInstance.state.key2Value).toEqual('aa')

    const acInstance = aInstance.children[1]
    expect(acInstance.state.key1Value).toEqual('a')
    expect(acInstance.state.key2Value).toEqual('aa')
    invokeUnmounted(instance)
  })
})


function renderNodeChildren (vnode: UniNode) {
  if (vnode.children) {
    let children = vnode.children
    if (!isArray(children)) {
      children = [children]
    }
    children.forEach((child: UniNode) => renderNode(child, vnode))
  }
}
function renderNode (vnode: UniNode, parentVNode?: UniNode) {
  const type = vnode.type
  const t = type as any
  const dom = {
    type: type,
    nodeType: t.displayName || t.name || t,
    children: [],
    instance: {}
  }
  vnode.__dom__ = dom
  if (parentVNode) {
    parentVNode.__dom__.children.push(dom)
  }
  if (isFunction(type)) {
    const instance = type(vnode.props || {}, {
      uniParent: parentVNode && parentVNode.__dom__.instance
    })
    const childvnode = instance.render()
    dom.type = childvnode.type
    dom.instance = instance
    const childdom = renderNode(childvnode, vnode).__dom__
    dom.type = childdom.type
    dom.children = childdom.children
  } else {
    dom.instance = parentVNode && parentVNode.__dom__.instance
    renderNodeChildren(vnode)
  }
  return vnode
}
