import { Swiper } from './swiper'
import { SwiperItem } from './swiper-item'
import './style'

(Swiper as any).Item = SwiperItem

export {
  Swiper,
  SwiperItem
}

export default Swiper
