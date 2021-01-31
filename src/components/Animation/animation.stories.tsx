import React, { useState, useRef } from 'react'
import { storiesOf } from '@storybook/react'

import Animation from './animation'
import Button from '../Button/Button'

const BasicAnimation = () => {
  const [play, setPlay] = useState(false)
  const [pause, setPause] = useState(false)
  const count = useRef(0)

  const keyframes = [
    {
      from: {
        background: '#3370ff',
        transform: 'translateX(0%)',
        transformOrigin: '0% 0%'
      },

      to: {
        background: '#f00',
        transform: 'translateX(calc(100vw - 120px))',
        transformOrigin: '0% 0%'
      }
    },
    {
      from: {
        background: '#f00',
        transform: 'translateX(calc(100vw - 120px))'
      },
      to: {
        transform: 'translateX(0%)',
        background: '#3370ff',
        opacity: 1
      }
    }
  ]
  return (
    <>
      <Animation
        as="div"
        onEnd={() => setPlay(false)}
        keyframes={keyframes[count.current % 2 ? 0 : 1]}
        duration={2}
        timing="ease-in"
        play={play}
        pause={pause}
      >
        <div
          style={{
            display: 'inline-block',
            position: 'relative',
            background: '#3370ff',
            width: '100px',
            height: '100px'
          }}
        ></div>
      </Animation>
      <Button
        onClick={() => {
          if (play) {
            setPause(!pause)
          } else {
            setPlay(!play)
            count.current++
          }
        }}
        kind="outline"
      >
        {play && !pause ? '暂停' : '启动'}
      </Button>
    </>
  )
}

storiesOf('Animation', module).add('Basic', BasicAnimation)
