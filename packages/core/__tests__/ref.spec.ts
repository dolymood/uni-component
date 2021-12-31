import { ref } from '@uni-store/core'
import { useRef } from '../src'

describe('Test ref', () => {
  it('useRef should work correctly', () => {
    const ele = ref<HTMLDivElement>()
    const setEleRef = useRef(ele)

    const div = document.createElement('div')
    div.id = 'useRefTestId'
    setEleRef(div)

    expect(ele.value).toEqual(div)
    expect(ele.value!.id).toEqual(div.id)
  })
})
