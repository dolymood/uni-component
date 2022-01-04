import { h, uniComponent, uni2Platform } from '@uni-component/core'
import { ref, watch, markRaw } from '@uni-store/core'
import { View } from '@uni-component/components'
import { Item } from './components/Item'
import { Page } from './components/Page'
import AdDemo from './pages/ad'
import AdCustomDemo from './pages/ad-custom'
import AudioDemo from './pages/audio'
import BlockDemo from './pages/block'
import ButtonDemo from './pages/button'
import CameraDemo from './pages/camera'
import CanvasDemo from './pages/canvas'
import CheckboxDemo from './pages/checkbox'
import CoverImageDemo from './pages/cover-image'
import CoverViewDemo from './pages/cover-view'
import EditorDemo from './pages/editor'
import FormDemo from './pages/form'
import FunctionalPageNavigatorDemo from './pages/functional-page-navigator'
import IconDemo from './pages/icon'
import ImageDemo from './pages/image'
import InputDemo from './pages/input'
import KeyboardAccessoryDemo from './pages/keyboard-accessory'
import LabelDemo from './pages/label'
import LivePlayerDemo from './pages/live-player'
import LivePusherDemo from './pages/live-pusher'
import MapDemo from './pages/map'
import MatchMediaDemo from './pages/match-media'
import MovableAreaDemo from './pages/movable-area'
import NavigationBarDemo from './pages/navigation-bar'
import NavigatorDemo from './pages/navigator'
import OfficialAccountDemo from './pages/official-account'
import OpenDataDemo from './pages/open-data'
import PageContainerDemo from './pages/page-container'
import PageMetaDemo from './pages/page-meta'
import PickerDemo from './pages/picker'
import PickerViewDemo from './pages/picker-view'
import ProgressDemo from './pages/progress'
import RadioDemo from './pages/radio'
import RichTextDemo from './pages/rich-text'
import ScrollViewDemo from './pages/scroll-view'
import ShareElementDemo from './pages/share-element'
import SliderDemo from './pages/slider'
import SwiperDemo from './pages/swiper'
import SwitchDemo from './pages/switch'
import TextDemo from './pages/text'
import TextareaDemo from './pages/textarea'
import VideoDemo from './pages/video'
import ViewDemo from './pages/view'
import VoipRoomDemo from './pages/voip-room'
import WebViewDemo from './pages/web-view'
import './App.scss'

const list: Item[] = [
  {
    name: '视图容器：'
  },
  {
    name: 'CoverImage',
    Demo: CoverImageDemo
  },
  {
    name: 'CoverView',
    Demo: CoverViewDemo
  },
  {
    name: 'MovableArea',
    Demo: MovableAreaDemo
  },
  {
    name: 'ScrollView',
    Demo: ScrollViewDemo
  },
  {
    name: 'Swiper',
    Demo: SwiperDemo
  },
  {
    name: 'View',
    Demo: ViewDemo
  },
  {
    name: '基础内容：'
  },
  {
    name: 'Block',
    Demo: BlockDemo
  },
  {
    name: 'Icon',
    Demo: IconDemo
  },
  {
    name: 'Progress',
    Demo: ProgressDemo
  },
  {
    name: 'RichText',
    Demo: RichTextDemo
  },
  {
    name: 'Text',
    Demo: TextDemo
  },
  {
    name: '表单内容：'
  },
  {
    name: 'Button',
    Demo: ButtonDemo
  },
  {
    name: 'Checkbox',
    Demo: CheckboxDemo
  },
  {
    name: 'Form',
    Demo: FormDemo
  },
  {
    name: 'Input',
    Demo: InputDemo
  },
  {
    name: 'Label',
    Demo: LabelDemo
  },
  {
    name: 'Picker',
    Demo: PickerDemo
  },
  {
    name: 'PickerView',
    Demo: PickerViewDemo
  },
  {
    name: 'Radio',
    Demo: RadioDemo
  },
  {
    name: 'Slider',
    Demo: SliderDemo
  },
  {
    name: 'Switch',
    Demo: SwitchDemo
  },
  {
    name: 'Textarea',
    Demo: TextareaDemo
  },
  {
    name: '媒体组件：'
  },
  {
    name: 'Audio',
    Demo: AudioDemo
  },
  {
    name: 'Image',
    Demo: ImageDemo
  },
  {
    name: '画布：',
  },
  {
    name: 'Canvas',
    Demo: CanvasDemo
  },
  {
    name: '开放能力：'
  },
  {
    name: 'WebView',
    Demo: WebViewDemo
  },
  {
    name: '不支持的：'
  },
  {
    name: 'Ad',
    Demo: AdDemo
  },
  {
    name: 'AdCustom',
    Demo: AdCustomDemo
  },
  {
    name: 'Camera',
    Demo: CameraDemo
  },
  {
    name: 'Editor',
    Demo: EditorDemo
  },
  {
    name: 'FunctionalPageNavigator',
    Demo: FunctionalPageNavigatorDemo
  },
  {
    name: 'KeyboardAccessory',
    Demo: KeyboardAccessoryDemo
  },
  {
    name: 'LivePlayer',
    Demo: LivePlayerDemo
  },
  {
    name: 'LivePusher',
    Demo: LivePusherDemo
  },
  {
    name: 'Map',
    Demo: MapDemo
  },
  {
    name: 'MatchMedia',
    Demo: MatchMediaDemo
  },
  {
    name: 'NavigationBar',
    Demo: NavigationBarDemo
  },
  {
    name: 'Navigator',
    Demo: NavigatorDemo
  },
  {
    name: 'OfficialAccount',
    Demo: OfficialAccountDemo
  },
  {
    name: 'OpenData',
    Demo: OpenDataDemo
  },
  {
    name: 'PageContainer',
    Demo: PageContainerDemo
  },
  {
    name: 'PageMeta',
    Demo: PageMetaDemo
  },
  {
    name: 'ShareElement',
    Demo: ShareElementDemo
  },
  {
    name: 'Video',
    Demo: VideoDemo
  },
  {
    name: 'VoipRoom',
    Demo: VoipRoomDemo
  }
]

type FItem = Item & {Demo: Function}

const UniApp = uniComponent('uni-app', () => {
  const target = ref<FItem>()
  const gotoTarget = (item?: Item) => {
    if (item && item.Demo) {
      target.value = markRaw(item) as FItem
    } else {
      target.value = undefined
    }
  }

  watch(() => target.value, (val) => {
    document.documentElement.style.overflow = val ? 'hidden' : ''
  })

  return {
    target,
    gotoTarget
  }
})

UniApp.render = function (_, state) {
  const { target, gotoTarget } = state
  return (
    <View class='app'>
      <View class='weui-cells'>
        {list.map(item => {
          return <Item item={item} key={item.name} onClick={gotoTarget}></Item>
        })}
      </View>
      { target ? <Page target={target} onClose={gotoTarget}></Page> : undefined}
    </View>
  )
}

const App = uni2Platform(UniApp)

export default App
