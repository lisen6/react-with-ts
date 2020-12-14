import React, { FC, ReactElement, InputHTMLAttributes } from 'react'
import { IconProp } from '@fortawesome/fontawesome-svg-core'
import classNames from 'classnames'
import Icon from '../Icon/Icon'

type InputSize = 'lg' | 'sm'

export interface InputProps extends Omit<InputHTMLAttributes<HTMLElement>, 'size'> {
  // 是否可禁用
  disabled?: boolean
  // 输入框大小
  size?: InputSize
  icon: IconProp
  prepend?: string | ReactElement
  append?: string | ReactElement
}

export const Input: FC<InputProps> = (props) => {
  const { disabled, size, icon, prepend, append, style, ...restProps } = props;

  const names = classNames('viking-input-wrapper', {
    [`input-size-${size}`]: size,
    'is-disabled': disabled,
    'input-group': prepend || append,
    'input-group-append': !!prepend,
    'input-group-prepend': !!prepend
  })

  return <div className={names} style={style}>
    {prepend && <div className="viking-input-group-prepend">{prepend}</div>}
    {icon && <div className="icon-wrapper"><Icon icon={icon} title={`title`} /></div>}
    <input className="viking-input-inner"
      disabled={disabled}
      {...restProps}
    />
    {append && <div className="viking-input-group-append">{append}</div>}
  </div>
}

export default Input