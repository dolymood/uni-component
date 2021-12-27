import { h } from '@uni-component/core'
import { Picker } from '@uni-component/components'
import { useState, useCallback } from 'react'

export default function PickerDemo () {
  const array = ['美国', '中国', '巴西', '日本']
  const [index, setIndex] = useState(0)
  const bindPickerChange = useCallback((e) => {
    setIndex(e.value)
  }, [])

  const [date, setDate] = useState('2016-09-01')
  const bindDateChange = useCallback((e) => {
    setDate(e.value)
  }, [])
  return (
    <div>
      <Picker onChange={bindPickerChange} value={index} range={array}>
        <p>当前选择 {array[index]}</p>
      </Picker>
      <Picker
        mode='date'
        value={date}
        start='2015-09-01'
        end='2017-09-01'
        onChange={bindDateChange}
      >
        <p>当前选择 {date}</p>
      </Picker>
    </div>
  )
}
