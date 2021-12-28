import {
  h,
  uniComponent,
  uni2Platform
} from '@uni-component/core'
import { computed } from '@uni-store/core'

const UniProgress = uniComponent('uni-progress', {
  percent: {
    type: Number,
    default: 0
  },
  showInfo: Boolean,
  borderRadius: {
    type: [Number, String],
    default: 0
  },
  fontSize: {
    type: [Number, String],
    default: 16
  },
  strokeWidth: {
    type: [Number, String],
    default: 6
  },
  activeColor: {
    type: String,
    default: '#09BB07'
  },
  backgroundColor: {
    type: String,
    default: '#EBEBEB'
  },
  active: Boolean
}, (_, props) => {
  const rootClass = 'weui-progress'

  const percent = computed(() => {
    const percent = props.percent
    return percent > 100 ? 100 : percent < 0 ? 0 : percent
  })
  const height = computed(() => {
    return {
      height: props.strokeWidth + 'px',
      backgroundColor: props.backgroundColor
    }
  })
  const width = computed(() => {
    const transition = props.active ? 'width 1s ease-in-out' : 'none'
    const borderRadius = props.borderRadius
    return {
      width: `${percent.value}%`,
      transition,
      WebkitTransition: transition,
      backgroundColor: props.activeColor,
      borderRadius: borderRadius ? `${borderRadius}px` : '0'
    }
  })
  return {
    rootClass,
    percent,
    width,
    height
  }
})

UniProgress.render = function (props, state) {
  const {
    showInfo,
    fontSize
  } = props
  const { rootClass, percent, height, width } = state
  return (
    <div class={rootClass}>
      <div class='weui-progress__bar' style={height}>
        <div class='weui-progress__inner-bar' style={width} />
      </div>
      {showInfo && (
        <div class='weui-progress__opr' style={{ 'font-size': `${fontSize}px` }}>
          <span>{percent}%</span>
        </div>
      )}
    </div>
  )
}

export const Progress = uni2Platform(UniProgress)
