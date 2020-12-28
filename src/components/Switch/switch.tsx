import React, { FC, useState, useEffect, MouseEvent, ChangeEvent, useCallback } from 'react'
import classnames from 'classnames'

type SwitchSize = 'default' | 'small';

export interface SwitchProps {
  /** 是否禁用 */
  disabled?: boolean;
  /** switch尺寸 */
  size?: SwitchSize;
  /** 是否默认选中 */
  defaultChecked?: boolean;
  /** switch 打开时的背景色 */
  activeColor?: string;
  /** switch 关闭时的背景色 */
  inactiveColor?: string;
  /** 是否选中 */
  checked?: boolean;
  /** switch 状态发生变化时的回调函数 */
  onChange?: (isTrue: boolean) => void;
}

export const Switch: FC<SwitchProps> = (props) => {
  const { disabled, size, activeColor, inactiveColor, defaultChecked, checked, onChange } = props;

  const propsValue = defaultChecked ? !!defaultChecked : !!checked

  const [isCheck, setIsCheck] = useState(propsValue)

  const classes = classnames('viking-switch', {
    'is-checked': isCheck,
    'is-disabled': disabled,
    [`viking-switch-${size}`]: size === 'small'
  })

  const handleChange = useCallback((e: ChangeEvent<HTMLElement>) => {
    if (!disabled) {
      setIsCheck(!isCheck)
    }
  }, [isCheck, disabled])

  const handleClick = useCallback((e: MouseEvent<HTMLElement>) => {
    if (!disabled) {
      setIsCheck(!isCheck)
    }
  }, [isCheck, disabled])

  const styleComputed = () => {
    return !!isCheck ? (activeColor || '') : (inactiveColor || '')
  }

  useEffect(() => {
    !disabled && onChange?.(isCheck)
  }, [isCheck, disabled])

  return (
    <div className={classes} >
      <input type="checkbox" checked={!!isCheck} onChange={handleChange} className="viking-switch__input" />
      <span style={{ backgroundColor: styleComputed() }} className="viking-switch__core" onClick={handleClick}></span>
    </div>
  )
}


export default Switch;