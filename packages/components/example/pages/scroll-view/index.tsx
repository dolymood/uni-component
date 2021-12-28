import { h } from '@uni-component/core'
import { ScrollView } from '@uni-component/components'
import { useState, useCallback, useEffect } from 'react'
import './index.scss'

const order = ['demo1', 'demo2', 'demo3']

const arr: number[] = []
for (let i = 0; i < 20; i++) arr.push(i)

const PullRefreshDemo = () => {
  const [triggered, setTriggered] = useState(false)
  useEffect(() => {
    setTimeout(() => {
      setTriggered(true)
    }, 1000)
  }, [arr])
  const onPulling = useCallback((e) => {
    console.log('onPulling:', e)
  }, [])

  const onRefresh = useCallback(() => {
    console.log('onRefresh:')
    if (triggered) return
    // set triggered true
    setTriggered(true)
    setTimeout(() => {
      setTriggered(false)
    }, 3000)
  }, [])

  const onRestore = useCallback((e) => {
    console.log('onRestore:', e)
  }, [])

  const onAbort = useCallback((e) => {
    console.log('onAbort', e)
  }, [])

  return (
    <div class='page-section'>
      <h4 class='page-section-title'>
        <p>下拉刷新</p>
      </h4>
      <div class='page-section-spacing'>
        <ScrollView
          class='scroll-view_refresh'
          scrollY
          refresherEnabled
          refresherThreshold={20}
          refresherDefaultStyle='white'
          refresherBackground='lightgreen'
          refresherTriggered={triggered}
          onRefresherPulling={onPulling}
          onRefresherRefresh={onRefresh}
          onRefresherRestore={onRestore}
          onRefresherAbort={onAbort}
        >
          {
            arr.map((i) => {
              return (
                <div style={{display: 'flex', height: '100px'}} key={i}>
                  <img src='https://images.unsplash.com/photo-1565699894576-1710004524ba?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1832&q=80' />
                  <img src='https://images.unsplash.com/photo-1566402441483-c959946717ed?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1600&q=80' />
                  <img src='https://images.unsplash.com/photo-1566378955258-7633cb5c823e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=634&q=80' />
                  <img src='https://images.unsplash.com/photo-1566404394190-cda8c6209208?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=630&q=80' />
                  <img src='https://images.unsplash.com/photo-1566490595448-be523b4d2914?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=958&q=80' />
                </div>
              )
            })
          }
        </ScrollView>
      </div>
    </div>
  )
}

export default function ScrollViewDemo () {
  const [toView, setToView] = useState('demo2')
  const [scrollTop, setScrollTop] = useState(0)
  const upper = useCallback((e) => {
    // console.log(e)
  }, [])
  const lower = useCallback((e) => {
    // console.log(e)
  }, [])
  const scroll = useCallback((e) => {
    // console.log(e)
  }, [])
  const scrollToTop = useCallback(() => {
    setScrollTop(0)
  }, [])

  const tap = useCallback(() => {
    for (let i = 0; i < order.length; ++i) {
      if (order[i] === toView) {
        setToView(order[i + 1])
        setScrollTop((i + 1) * 200)
        break
      }
    }
  }, [])
  const tapMove = useCallback(() => {
    setScrollTop(scrollTop + 10)
  }, [])

  return (
    <div class='scroll-view-demo'>
      <div class='page-section'>
        <h4 class='page-section-title'>
          <p>Vertical Scroll 纵向滚动</p>
        </h4>
        <div class='page-section-spacing'>
          <ScrollView
            class='scroll-view_V'
            scrollY
            onScrollToUpper={upper}
            onScrollToLower={lower}
            onScroll={scroll}
            scrollIntoView={toView}
            scrollTop={scrollTop}
          >
            <div>
              <div id='demo1' class='scroll-view-item demo-text-1'></div>
              <div id='demo2' class='scroll-view-item demo-text-2'></div>
              <div id='demo3' class='scroll-view-item demo-text-3'></div>
            </div>
          </ScrollView>
        </div>
      </div>
      <div class='page-section'>
        <h4 class='page-section-title'>
          <p>Horizontal Scroll 横向滚动</p>
        </h4>
        <div class='page-section-spacing'>
          <ScrollView class='scroll-view_H' scrollX onScroll={scroll}>
            <div id='demo1' class='scroll-view-item_H demo-text-1'></div>
            <div id='demo2' class='scroll-view-item_H demo-text-2'></div>
            <div id='demo3' class='scroll-view-item_H demo-text-3'></div>
          </ScrollView>
        </div>
      </div>
      <PullRefreshDemo></PullRefreshDemo>
    </div>
  )
}
