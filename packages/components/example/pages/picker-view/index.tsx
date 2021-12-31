import { h } from '@uni-component/core'
import { PickerView, PickerViewColumn, View, Text } from '@uni-component/components'
import { useState, useCallback } from 'react'
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

export default function PickerViewDemo () {
  const [year, setYear] = useState(date.getFullYear())
  const [month, setMonth] = useState(2)
  const [day, setDay] = useState(2)
  const [isDaytime, setIsDaytime] = useState(true)

  const bindChange = useCallback((e) => {
    const val = e.value
    setYear(years[val[0]])
    setMonth(months[val[1]])
    setDay(days[val[2]])
    setIsDaytime(!val[3])
  }, [])

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
            <Text>🌑</Text>
          </View>
        </PickerViewColumn>
      </PickerView>
    </View>
  )
}
