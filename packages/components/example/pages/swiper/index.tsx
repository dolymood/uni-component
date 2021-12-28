import { h } from '@uni-component/core'
import { Swiper, SwiperItem } from '@uni-component/components'
import './index.scss'

export default function SwiperDemo () {
  const indicatorDots = true
  const autoplay = true
  const interval = 2000
  const duration = 500
  const background = ['demo-text-1', 'demo-text-2', 'demo-text-3']
  return (
    <Swiper
      class='swiper-demo'
      indicatorDots={indicatorDots}
      autoplay={autoplay}
      interval={interval}
      duration={duration}
    >
      {
        background.map((item) => {
          const cls = `swiper-demo-item ${item}`
          return (
            <SwiperItem key={item}>
              <div class={cls}></div>
            </SwiperItem>
          )
        })
      }
    </Swiper>
  )
}
