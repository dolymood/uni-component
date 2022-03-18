import { h, uniComponent, uni2Platform, onMounted, ref } from '@uni-component/core'
import { ScrollView } from '@uni-component/components'
import './index.scss'

// todo use View replace div

const order = ['demo1', 'demo2', 'demo3']

const arr: number[] = []
for (let i = 0; i < 20; i++) arr.push(i)

const UniPullRefreshDemo = uniComponent('uni-pull-refresh-demo', () => {
  const triggered = ref(false)
  onMounted(() => {
    setTimeout(() => {
      triggered.value = true
    }, 1000)
  })
  const onPulling = () => {
    console.log('onPulling:')
  }

  const onRefresh = () => {
    console.log('onRefresh:')
    // set triggered true
    triggered.value = true
    setTimeout(() => {
      triggered.value = false
    }, 3000)
  }

  const onRestore = () => {
    console.log('onRestore:')
  }

  const onAbort = () => {
    console.log('onAbort')
  }

  return {
    triggered,
    onPulling,
    onRefresh,
    onRestore,
    onAbort
  }
})

const PullRefreshDemo = uni2Platform(UniPullRefreshDemo, (_, {
  triggered,
  onPulling,
  onRefresh,
  onRestore,
  onAbort
}) => {
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
})

const UniScrollViewDemo = uniComponent('uni-scroll-view-demo', () => {
  const toView = ref('demo2')
  const scrollTop = ref(0)
  const upper = () => {
    // console.log(e)
  }
  const lower = () => {
    // console.log(e)
  }
  const scroll = () => {
    // console.log(e)
  }
  const scrollToTop = () => {
    scrollTop.value = 0
  }
  const tap = () => {
    for (let i = 0; i < order.length; ++i) {
      if (order[i] === toView.value) {
        toView.value = order[i + 1]
        scrollTop.value = (i + 1) * 200
        break
      }
    }
  }
  const tapMove = () => {
    scrollTop.value = scrollTop.value + 10
  }

  return {
    toView,
    scrollTop,
    upper,
    lower,
    scroll,
    scrollToTop,
    tap,
    tapMove
  }
})

export default uni2Platform(UniScrollViewDemo, (_, {
  toView,
  scrollTop,
  upper,
  lower,
  scroll
}) => {
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
})
