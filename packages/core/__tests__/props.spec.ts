import { getDefaultProps } from '../src'

describe('Test props', () => {
  it('getDefaultProps should work correctly', () => {
    expect(getDefaultProps(undefined)).toBe(null)
    expect(getDefaultProps(['a', 'b'])).toBe(null)
    const dp1 = getDefaultProps({
      a: String,
      b: {
        type: Boolean,
        required: true
      },
      c: {
        type: Array
      }
    })
    expect(dp1).toBe(null)
    const gDefault = {}
    const dp2 = getDefaultProps({
      a: String,
      b: Boolean,
      c: {
        type: Number,
        default: 1
      },
      d: {
        type: Boolean,
        required: true
      },
      e: {
        type: Boolean,
        default: true
      },
      f: {
        type: Array
      },
      g: {
        type: Object,
        default: gDefault
      }
    })
    expect(dp2?.a).toBeUndefined
    expect(dp2?.b).toEqual(false)
    expect(dp2?.c).toEqual(1)
    expect(dp2?.e).toEqual(true)
    expect(dp2?.f).toBeUndefined
    expect(dp2?.g).toEqual(gDefault)
  })
})
