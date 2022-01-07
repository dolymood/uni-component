import { defineComponent, ref } from 'vue'
import { h } from '@uni-component/core'
import { nextTick } from '@uni-store/core'
import {
  fireEvent,
  render
} from '@testing-library/vue'
import { CubeButton } from '../example/button/button'
import { CubeButtons } from '../example/buttons/buttons'

describe('Test Vue', () => {
  const actClickEvent = async (ele: Element) => {
    await fireEvent.click(ele)
    await nextTick()
  }

  it('should work correctly - with button', async () => {
    const App = defineComponent(() => {
      return () => (
        <div>
          <CubeButton text="btn1" />
          <CubeButton>btn2</CubeButton>
          <CubeButton primary type="submit" text="btn3 text">btn3 inner text</CubeButton>
        </div>
      )
    })

    const rendered = render(App)

    await nextTick()

    expect(rendered.getAllByText('btn1 0')).toHaveLength(1)
    expect(rendered.getAllByText('btn2 0')).toHaveLength(1)
    expect(rendered.getAllByText('btn3 text 0')).toHaveLength(1)

    const btns = rendered.container.querySelectorAll('.cube-button')
    expect(btns.length).toEqual(3)
    expect(btns[0].className).toEqual('cube-button')
    expect(btns[0].getAttribute('type')).toEqual('button')
    expect(btns[2].className).toEqual('cube-button cube-button-primary')
    expect(btns[2].getAttribute('type')).toEqual('submit')
  })
  it('should work correctly - with buttons', async () => {
    const App = defineComponent(() => {
      return () => (
        <div>
          <CubeButtons>btns1</CubeButtons>
          <CubeButtons>btns2</CubeButtons>
        </div>
      )
    })

    const rendered = render(App)

    await nextTick()

    expect(rendered.getAllByText('btns1')).toHaveLength(1)
    expect(rendered.getAllByText('btns2')).toHaveLength(1)

    const btns = rendered.container.querySelectorAll('.cube-buttons')
    expect(btns.length).toEqual(2)
    expect(btns[0].className).toEqual('cube-buttons')
    expect(btns[1].className).toEqual('cube-buttons')
  })
  it('should work correctly - with buttons & button', async () => {
    const fn1 = jest.fn()
    const fn2 = jest.fn()
    const App = defineComponent(() => {
      const n = ref(0)
      const inc = () => {
        n.value += 1
      }
      return () => (
        <div>
          <CubeButtons>
            <CubeButton text={`btn1 in btns - ${n.value}`} onClick={fn1}></CubeButton>
            <CubeButton primary type="submit" onClick={fn2}>{ `btn2 in btns - ${n.value}` }</CubeButton>
            <button data-testid="incEle" onClick={inc}>inc</button>
          </CubeButtons>
        </div>
      )
    })

    const rendered = render(App)

    await nextTick()

    expect(rendered.getAllByText('btn1 in btns - 0 0')).toHaveLength(1)
    expect(rendered.getAllByText('btn2 in btns - 0 0')).toHaveLength(1)

    const btns = rendered.container.querySelectorAll('.cube-buttons')
    expect(btns.length).toEqual(1)
    const allBtns = btns[0].children
    expect(allBtns.length).toEqual(3)

    expect(allBtns[0].className).toEqual('cube-button')
    expect(allBtns[1].className).toEqual('cube-button cube-button-primary')
    expect(allBtns[2].className).toEqual('')
    await actClickEvent(allBtns[0])
    expect(fn1).toBeCalledTimes(1)
    expect(fn2).toBeCalledTimes(0)
    expect(rendered.getAllByText('btn1 in btns - 0 1')).toHaveLength(1)
    expect(rendered.getAllByText('btn2 in btns - 0 0')).toHaveLength(1)
    await actClickEvent(allBtns[1])
    expect(fn1).toBeCalledTimes(1)
    expect(fn2).toBeCalledTimes(1)
    expect(rendered.getAllByText('btn1 in btns - 0 1')).toHaveLength(1)
    expect(rendered.getAllByText('btn2 in btns - 0 1')).toHaveLength(1)

    // props changed
    await actClickEvent(rendered.getByTestId('incEle'))
    expect(rendered.getAllByText('btn1 in btns - 1 1')).toHaveLength(1)
    expect(rendered.getAllByText('btn2 in btns - 1 1')).toHaveLength(1)
  })
})
