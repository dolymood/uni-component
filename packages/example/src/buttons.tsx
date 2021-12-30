import { h, uniComponent } from '@uni-component/core'
import { CubeButton } from './button'

export const CubeButtons = uniComponent('cube-buttons', (name) => {
  // todo
  return {
  }
})

export const CubeTwoButtons = uniComponent('cube-two-buttons', (name) => {
  return {
  }
})

// just test
// todo children 问题
const App = () => {
  return (
    <div>
      <CubeButtons>
        <CubeButton primary>a</CubeButton>
        <CubeButton primary={false}>b</CubeButton>
      </CubeButtons>
      <CubeTwoButtons />
    </div>
  )
}
