import React, { Children } from 'react'
import classNames from 'classnames'
import { CSSTransition } from 'react-transition-group'
import { CSSTransitionProps } from 'react-transition-group/CSSTransition'

export type AnimationName = 'zoom-in-top' | 'zoom-in-bottom' | 'zoom-in-left' | 'zoom-in-right'

export interface TransitionProps {
  animation?: AnimationName;
  className?: string;
}

type ITransitionProps = TransitionProps & CSSTransitionProps

const Transition: React.FC<ITransitionProps> = (props) => {
  const { children, className, animation, ...restProps } = props;
  return (
    <CSSTransition {...restProps} className={className ? className : animation}>
      {children}
    </CSSTransition>
  )
}

Transition.defaultProps = {
  appear: true,
  unmountOnExit: true
}

export default Transition