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

UniSwiperItem.render = function (_, state, { slots }) {
  const { rootClass } = state
  return (
    <div class={rootClass}>
      {slots.default && slots.default()}
    </div>
  )
}

export const SwiperItem = uni2Platform(UniSwiperItem)
