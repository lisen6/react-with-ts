import React, {
  AnimationEventHandler,
  HTMLAttributes,
  useEffect,
  useState
} from 'react'

import styled from 'styled-components'
import { keyframes, css } from 'styled-components'

import * as KEYFRAMES from './keyframe'

type TransitionTimingFunction =
  | 'ease'
  | 'ease-in'
  | 'ease-out'
  | 'ease-in-out'
  | 'linear'
  | 'step-start'
  | 'step-end'
  | 'infinite'

interface AnimationProps extends HTMLAttributes<HTMLElement> {
  auto?: boolean
  play?: boolean
  duration?: number
  pause?: boolean
  // 动画开始前延时
  delay?: number
  // 动画播放次数
  count?: number | 'infinite'
  // 动画是否反向播放
  direction?: 'normal' | 'reverse' | 'alternate' | 'alternate-reverse' | string
  // TODO: clear keyframes object & as
  keyframes?:
    | string
    | object
    | TemplateStringsArray
    | Array<string | object | TemplateStringsArray>
  // 动画在执行之前和之后如何将样式应用于其目标
  fill?: 'none' | 'forwards' | 'backwards' | 'both'
  as?: any
  timing?: CSSStyleDeclaration['transitionTimingFunction'] &
    TransitionTimingFunction
  onStart?: AnimationEventHandler<HTMLDivElement>
  onEnd?: AnimationEventHandler<HTMLDivElement>
}

interface AnimationInnerProps extends AnimationProps {}

const StyledAnimation = styled.div`
  ${({
    timing,
    duration,
    pause,
    play,
    delay,
    count,
    direction,
    fill,
    ...props
  }: AnimationInnerProps) =>
    props.keyframes &&
    css`
      > * {
        animation: ${play
            ? keyframes(props.keyframes as TemplateStringsArray)
            : ''}
          ${duration}s ${timing} ${delay}s ${count} ${direction} ${fill};
        animation-play-state: ${pause || !play ? 'paused' : 'running'};
      }
    `}
`

const Animation = ({
  children,
  onStart = () => {},
  onEnd = () => {},
  auto,
  play,
  keyframes,
  ...props
}: AnimationProps) => {
  const [on, setOn] = useState(auto)

  useEffect(() => {
    play && setOn(play)
  }, [play])

  if (keyframes && typeof keyframes === 'string' && keyframes in KEYFRAMES) {
    // @ts-ignore
    keyframes = KEYFRAMES[keyframes]
  }

  return (
    <StyledAnimation
      className="viking-animation-wrapper"
      onAnimationStart={onStart}
      onAnimationEnd={(e: any) => {
        if (props.fill !== 'forwards') {
          setOn(false)
        }
        onEnd(e)
      }}
      {...props}
      play={on}
      keyframes={keyframes}
    >
      {children}
    </StyledAnimation>
  )
}

Animation.defaultProps = {
  as: 'div',
  play: false,
  auto: false,
  pause: false,
  timing: 'linear',
  delay: 0,
  count: 1,
  duration: 0.6,
  fill: 'forwards',
  direction: 'normal'
}

export default Animation
