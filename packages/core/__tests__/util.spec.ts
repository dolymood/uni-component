import { normalized, inlineStyle2Obj } from '../src'

describe('Test util', () => {
  it('normalized should work correctly', () => {
    expect(normalized('cube')).toEqual('Cube')
    expect(normalized('cube-button')).toEqual('CubeButton')
    expect(normalized('cube-button-group')).toEqual('CubeButtonGroup')
  })
  it('inlineStyle2Obj should work correctly', () => {
    const objStyle = inlineStyle2Obj('height: 100px;width:20px;line-height:1%')
    expect(objStyle.height).toEqual('100px')
    expect(objStyle.width).toEqual('20px')
    expect(objStyle['line-height']).toEqual('1%')
  })
})
