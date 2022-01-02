import { h, uniComponent, uni2Platform } from '@uni-component/core'
import { ref } from '@uni-store/core'
import { PickerView, PickerViewColumn, View, Text } from '@uni-component/components'
import './index.scss'

const date = new Date()
const years: number[] = []
const months: number[] = []
const days: number[] = []

for (let i = 1990; i <= date.getFullYear(); i++) {
  years.push(i)
}

for (let i = 1; i <= 12; i++) {
  months.push(i)
}

for (let i = 1; i <= 31; i++) {
  days.push(i)
}

const value = [9999, 1, 1]

const UniPickerViewDemo = uniComponent('uni-picker-view-demo', () => {
  const year = ref(date.getFullYear())
  const month = ref(2)
  const day = ref(2)
  const isDaytime = ref(true)

  const bindChange = (e: {value?: number[]}) => {
    const val = e.value!
    year.value = years[val[0]]
    month.value = months[val[1]]
    day.value = days[val[2]]
    isDaytime.value = !val[3]
  }

  return {
    year,
    month,
    day,
    isDaytime,
    bindChange
  }
})

UniPickerViewDemo.render = function (_, {
  year,
  month,
  day,
  isDaytime,
  bindChange
}) {
  return (
    <View>
      <View class='selected-date'>{year}年{month}月{day}日{isDaytime ? '白天' : '夜晚'}</View>
      <PickerView class='picker-view-demo' indicatorStyle='height: 50px;' value={value} onChange={bindChange}>
        <PickerViewColumn>
          {
            years.map((year) => {
              return (
                <View key={String(year)}>{year}年</View>
              )
            })
          }
        </PickerViewColumn>
        <PickerViewColumn>
          {
            months.map((month) => {
              return (
                <View key={String(month)}>{month}月</View>
              )
            })
          }
        </PickerViewColumn>
        <PickerViewColumn>
          {
            days.map((da) => {
              return (
                <View key={String(da)}>{da}日</View>
              )
            })
          }
        </PickerViewColumn>
        <PickerViewColumn>
          <View>
            <Text>☀</Text>
          </View>
          <View>
            <Text>🌑</Text>
          </View>
        </PickerViewColumn>
      </PickerView>
    </View>
  )
}

export default uni2Platform(UniPickerViewDemo)
