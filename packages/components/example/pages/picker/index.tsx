import { h, uniComponent, uni2Platform, ref } from '@uni-component/core'
import { Picker, View, Text } from '@uni-component/components'

const array = ['美国', '中国', '巴西', '日本']

const UniPickerDemo = uniComponent('uni-picker-demo', () => {
  const index = ref(0)
  const bindPickerChange = (e: {value: any}) => {
    index.value = e.value
  }
  const date = ref('2016-09-01')
  const bindDateChange = (e: {value: any}) => {
    date.value = e.value
  }
  return {
    index,
    date,
    bindPickerChange,
    bindDateChange
  }
})

UniPickerDemo.render = function (_, {
  index,
  date,
  bindPickerChange,
  bindDateChange
}) {
  return (
    <View>
      <Picker onChange={bindPickerChange} value={index} range={array}>
        <View>当前选择 {array[index]}</View>
      </Picker>
      <Picker
        mode='date'
        value={date}
        start='2015-09-01'
        end='2022-09-01'
        onChange={bindDateChange}
      >
        <View>
          <Text>当前选择 {date}</Text>
        </View>
      </Picker>
    </View>
  )
}

export default uni2Platform(UniPickerDemo)
