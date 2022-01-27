import React, { useState } from 'react'
import { nextTick } from '@uni-store/core'
import { getRootInstance } from '@uni-component/core'
import {
  act,
  cleanup,
  fireEvent,
  render
} from '@testing-library/react'
import { CubeButton } from '../example/button/button'
import { CubeButtons } from '../example/buttons/buttons'
import { CubeTip } from '../example/tip/tip'

afterEach(cleanup)

describe('Test React', () => {
  const actAsync = async (handler: Function) => {
    await act(async () => {
      await handler()
      await nextTick()
    })
  }

  const actClickEvent = async (ele: Element) => {
    await actAsync(async () => {
      fireEvent.click(ele)
    })
  }

  it('should work correctly - with button', async () => {
    const App = () => {
      return (
        <>
          <CubeButton text="btn1" />
          <CubeButton>btn2</CubeButton>
          <CubeButton primary type="submit" text="btn3 text">btn3 inner text</CubeButton>
        </>
      )
    }

    const rendered = render(<App />)

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
    const App = () => {
      return (
        <>
          <CubeButtons>btns1</CubeButtons>
          <CubeButtons>btns2</CubeButtons>
        </>
      )
    }

    const rendered = render(<App />)

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
    const App = () => {
      const [n, setN] = useState(0)
      const inc = () => {
        setN(n + 1)
      }
      return (
        <div>
          <CubeButtons>
            <CubeButton text={`btn1 in btns - ${n}`} onClick={fn1}></CubeButton>
            <CubeButton primary type="submit" onClick={fn2}>{`btn2 in btns - ${n}`}</CubeButton>
            <button data-testid="incEle" onClick={inc}>inc</button>
          </CubeButtons>
        </div>
      )
    }

    const rendered = render(<App />)

    await nextTick()

    expect(rendered.getAllByText('btn1 in btns - 0 0')).toHaveLength(1)
    expect(rendered.getAllByText('btn2 in btns - 0 0')).toHaveLength(1)

    const btns = rendered.container.querySelectorAll('.cube-buttons')
    expect(btns.length).toEqual(1)
    const allBtns = btns[0].children
    expect(allBtns.length).toEqual(4)

    expect(allBtns[0].className).toEqual('cube-button')
    expect(allBtns[1].className).toEqual('cube-button')
    expect(allBtns[2].className).toEqual('cube-button cube-button-primary')
    expect(allBtns[3].className).toEqual('')
    await actClickEvent(allBtns[1])
    expect(fn1).toBeCalledTimes(1)
    expect(fn2).toBeCalledTimes(0)
    expect(rendered.getAllByText('btn1 in btns - 0 1')).toHaveLength(1)
    expect(rendered.getAllByText('btn2 in btns - 0 0')).toHaveLength(1)
    await actClickEvent(allBtns[2])
    expect(fn1).toBeCalledTimes(1)
    expect(fn2).toBeCalledTimes(1)
    expect(rendered.getAllByText('btn1 in btns - 0 1')).toHaveLength(1)
    expect(rendered.getAllByText('btn2 in btns - 0 1')).toHaveLength(1)

    // props changed
    await actClickEvent(rendered.getByTestId('incEle'))
    expect(rendered.getAllByText('btn1 in btns - 1 1')).toHaveLength(1)
    expect(rendered.getAllByText('btn2 in btns - 1 1')).toHaveLength(1)
  })
  it('should work correctly(instance) - with xxRender props', async () => {
    const App = () => {
      return (
        <div>
          <CubeButtons>
            <CubeButton>btn1</CubeButton>
            <CubeButton
              appendRender={() => (
                <CubeTip defaultRender={() => <i>tip2</i>} />)
              }
            >btn2</CubeButton>
            <CubeButton
              appendRender={() => (
                <CubeTip defaultRender={() => <i>tip3</i>} />)
              }
            ><CubeTip>btn3 - tip</CubeTip></CubeButton>
          </CubeButtons>
        </div>
      )
    }

    const rendered = render(<App />)

    await nextTick()

    expect(rendered.getAllByText('default btns btn 0')).toHaveLength(1)
    expect(rendered.getAllByText('btn1 0')).toHaveLength(1)
    expect(rendered.getAllByText('btn2 0')).toHaveLength(1)
    expect(rendered.getAllByText('tip2')).toHaveLength(1)
    expect(rendered.getAllByText('btn3 - tip')).toHaveLength(1)
    expect(rendered.getAllByText('tip3')).toHaveLength(1)

    const rootInstance = getRootInstance()
    expect(rootInstance.children.length).toBe(1)
    const btns = rootInstance.children[0]
    expect(btns.children.length).toBe(4)
    const allBtns = btns.children
    expect(allBtns[0].children.length).toBe(0)
    expect(allBtns[1].children.length).toBe(0)
    expect(allBtns[2].children.length).toBe(1)
    expect(allBtns[2].children[0].type.name).toBe('CubeTip')
    expect(allBtns[3].children.length).toBe(2)
    expect(allBtns[3].children[0].type.name).toBe('CubeTip')
    expect(allBtns[3].children[1].type.name).toBe('CubeTip')
  })
})
