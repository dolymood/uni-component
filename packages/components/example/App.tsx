import { h } from '@uni-component/core'
import AdDemo from './pages/ad'
import AdCustomDemo from './pages/ad-custom'
import AudioDemo from './pages/audio'
import BlockDemo from './pages/block'
import ButtonDemo from './pages/button'
import CameraDemo from './pages/camera'
import CanvasDemo from './pages/canvas'
import CheckboxDemo from './pages/checkbox'
import CoverImageDemo from './pages/cover-image'
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
import MatchDediaDemo from './pages/match-media'
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
// import PullToRefreshDemo from './pages/pull-to-refresh'
import RadioDemo from './pages/radio'
import RichTextDemo from './pages/rich-text'
// import ScrollViewDemo from './pages/scroll-view'
import ShareElementDemo from './pages/share-element'
import SliderDemo from './pages/slider'
// import SwiperDemo from './pages/swiper'
import SwitchDemo from './pages/switch'
// import TabbarDemo from './pages/tabbar'
import TextDemo from './pages/text'
import TextareaDemo from './pages/textarea'
// import VideoDemo from './pages/video'
import ViewDemo from './pages/view'
import VoipRoomDemo from './pages/voip-room'
import WebViewDemo from './pages/web-view'

function App () {
  const list = [
    {
      name: 'Ad',
      Demo: AdDemo
    },
    {
      name: 'AdCustom',
      Demo: AdCustomDemo
    },
    {
      name: 'Audio',
      Demo: AudioDemo
    },
    {
      name: 'Block',
      Demo: BlockDemo
    },
    {
      name: 'Button',
      Demo: ButtonDemo
    },
    {
      name: 'Camera',
      Demo: CameraDemo
    },
    {
      name: 'Canvas',
      Demo: CanvasDemo
    },
    {
      name: 'Checkbox',
      Demo: CheckboxDemo
    },
    {
      name: 'CoverImage',
      Demo: CoverImageDemo
    },
    {
      name: 'Editor',
      Demo: EditorDemo
    },
    {
      name: 'Form',
      Demo: FormDemo
    },
    {
      name: 'FunctionalPageNavigator',
      Demo: FunctionalPageNavigatorDemo
    },
    {
      name: 'Icon',
      Demo: IconDemo
    },
    {
      name: 'Image',
      Demo: ImageDemo
    },
    {
      name: 'Input',
      Demo: InputDemo
    },
    {
      name: 'KeyboardAccessory',
      Demo: KeyboardAccessoryDemo
    },
    {
      name: 'Label',
      Demo: LabelDemo
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
      name: 'MatchDedia',
      Demo: MatchDediaDemo
    },
    {
      name: 'MovableArea',
      Demo: MovableAreaDemo
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
      name: 'Picker',
      Demo: PickerDemo
    },
    {
      name: 'PickerView',
      Demo: PickerViewDemo
    },
    {
      name: 'Progress',
      Demo: ProgressDemo
    },
    {
      name: 'Radio',
      Demo: RadioDemo
    },
    {
      name: 'RichText',
      Demo: RichTextDemo
    },
    {
      name: 'ShareElement',
      Demo: ShareElementDemo
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
      name: 'Text',
      Demo: TextDemo
    },
    {
      name: 'Textarea',
      Demo: TextareaDemo
    },
    {
      name: 'View',
      Demo: ViewDemo
    },
    {
      name: 'VoipRoom',
      Demo: VoipRoomDemo
    },
    // {
    //   name: 'WebView',
    //   Demo: WebViewDemo
    // }
  ]
  return (
    <div class='weui-cells'>
      {list.map(item => {
        return (
          <div class='weui-cell weui-cell_access' key={item.name}>
            <div class='weui-cell__bd'>
              <item.Demo />
            </div>
            <div class='weui-cell__ft'>{item.name}</div>
          </div>
        )
      })}
    </div>
  )
}

export default App
