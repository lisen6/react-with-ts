import React from 'react';
import { CSSTransition } from 'react-transition-group';
import { CSSTransitionProps } from 'react-transition-group/CSSTransition';

type AnimationName = 'zoom-in-top' | 'zoom-in-left' | 'zoom-in-bottom' | 'zoom-in-right';


// 额外加属性

// 旧版本这种写法 @types/react-transition-group 4.2.3
// interface TransitionProps extends CSSTransitionProps {
//     animation?: AnimationName,
//     wrapper? : boolean,
// }
// @types/react-transition-group 4.2.4 以后
type TransitionProps = CSSTransitionProps & {
  animation?: AnimationName,
  wrapper?: boolean, // 是否外面加一层嵌套 因为有的组件本身有动画 如果加 Transition 就不起作用
}
const Transition: React.FC<TransitionProps> = (props) => {
  const { children, classNames, animation, wrapper, ...restProps } = props;
  return (
    <CSSTransition classNames={classNames ? classNames : animation} {...restProps}>
      {wrapper ? <div>{children}</div> : children}
    </CSSTransition>
  );
};

Transition.defaultProps = {
  unmountOnExit: true,
  appear: true,
};

export default Transition;