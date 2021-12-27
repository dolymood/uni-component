import React, { useState } from 'react'
import { h, mount, actAsync } from './test-tools'
import { nextTick } from '@uni-store/core'
import { Audio } from '../src'

describe('Audio', () => {
  it('props', async () => {
    const src = 'http://storage.jd.com/cjj-pub-images/horse.ogv'
    const controls = true
    const loop = true

    let _setState: React.Dispatch<React.SetStateAction<{
      controls: boolean,
      loop: boolean
    }>>

    const App = () => {
      const [state, setState] = useState({
        controls,
        loop
      })
      _setState = setState
      return <Audio src={src} controls={state.controls} loop={state.loop} />
    }

    const rendered = await mount(<App />)

    await nextTick()

    const audios = rendered.container.getElementsByClassName('uni-audio')
    expect(audios.length).toEqual(1)
    const audio = audios[0] as HTMLAudioElement

    expect(audio.src).toEqual(src)
    expect(audio.controls).toEqual(controls)
    expect(audio.loop).toEqual(loop)

    await actAsync(() => {
      _setState({
        controls: false,
        loop: false
      })
    })

    expect(audio.controls).toEqual(false)
    expect(audio.loop).toEqual(false)
  })
})