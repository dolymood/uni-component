import { computed } from '@uni-store/core'
import { uniComponent } from '../src'

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
    expect(C.defaultProps).toBeUndefined
    expect(typeof C.render).toBe('function')
    C.render = (_, state) => {
      expect(state.rootClass).toEqual('a')
      expect(state.name).toEqual('a')
      return {
        type: 'vnode'
      }
    }
    const r = C({})
    expect(r.name).toEqual('a')
    expect(typeof r.clickAction).toBe('function')
    expect(typeof r.render).toBe('function')
    expect(r.render).not.toEqual(C.render)
    expect(r.rootClass).toEqual('a')
    expect((r.render() as any).type).toEqual('vnode')
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
    expect(C.defaultProps).toBeUndefined
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
    expect(r.name).toEqual('a-b')
    expect(typeof r.clickAction).toBe('function')
    expect(typeof r.render).toBe('function')
    expect(r.render).not.toEqual(C.render)
    expect(r.rootClass).toEqual('a-b')
    expect(r.props.a).toEqual('a')
    expect(r.props.b).toEqual(1)
    expect((r.render() as any).type).toEqual('vnode')
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
        // todo vue bug, required
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
      return {
        rootClass,
        props,
        name,
        clickAction
      }
    })
    expect(typeof C).toBe('function')
    expect(C.name).toEqual('AB')
    expect(C.defaultProps).toBeDefined
    expect(C.defaultProps?.a).toEqual(false)
    expect(C.defaultProps?.c).toEqual('c')
    expect(C.defaultProps?.d).toBeUndefined
    expect(typeof C.render).toBe('function')
    C.render = (props, state) => {
      expect(props.a).toEqual(undefined)
      expect(props.b).toEqual(1)
      expect(props.c).toEqual('cc')
      expect(props.d).toEqual('d')
      expect(state.rootClass).toEqual('a-b a-b_c')
      expect(state.name).toEqual('a-b')
      return {
        type: 'vnode'
      }
    }
    const r = C({
      b: 1,
      c: 'cc',
      d: 'd'
    })
    expect(r.name).toEqual('a-b')
    expect(typeof r.clickAction).toBe('function')
    expect(typeof r.render).toBe('function')
    expect(r.render).not.toEqual(C.render)
    expect(r.rootClass).toEqual('a-b a-b_c')
    // todo
    // props defaultProps is implementation by top lib
    expect(r.props.a).toEqual(undefined)
    expect(r.props.b).toEqual(1)
    expect(r.props.c).toEqual('cc')
    expect(r.props.d).toEqual('d')
    expect((r.render() as any).type).toEqual('vnode')
  })
})
