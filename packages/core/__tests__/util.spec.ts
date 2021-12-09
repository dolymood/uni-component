import { normalized } from '../src'

describe('Test util', () => {
  it('normalized should work correctly', () => {
    expect(normalized('cube')).toEqual('Cube')
    expect(normalized('cube-button')).toEqual('CubeButton')
    expect(normalized('cube-button-group')).toEqual('CubeButtonGroup')
  })
})
