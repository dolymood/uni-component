import {
  h,
  uniComponent,
  uni2Platform,
  inject
} from '@uni-component/core'
import { SwiperProvide, swiperProvide } from './swiper'

const UniSwiperItem = uniComponent('uni-swiper-item', {
  itemId: String
}, (_, props) => {
  const swiper = inject<SwiperProvide>(swiperProvide)
  const itemIds = swiper?.itemIds.value!

  itemIds.push(props.itemId || String(itemIds.length))
})

UniSwiperItem.render = function (_, state, { renders }) {
  const { rootClass } = state
  return (
    <div class={rootClass}>
      {renders.defaultRender && renders.defaultRender()}
    </div>
  )
}

export const SwiperItem = uni2Platform(UniSwiperItem)
