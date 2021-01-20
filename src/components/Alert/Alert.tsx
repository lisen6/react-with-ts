import React, { useState, ReactNode, forwardRef, HTMLAttributes } from 'react';
import classNames from 'classnames';
import Icon from '../Icon/Icon'

import methods from './methods'

type themeType = 'success' | 'info' | 'warning' | 'error'

export interface AlertProps extends HTMLAttributes<HTMLElement> {
  /** 自定义操作项 */
  action?: ReactNode
  /** 默认不显示关闭按钮 */
  closeable?: boolean
  /** 自定义关闭按钮 */
  closeText?: ReactNode
  /** 警告提示的辅助性文字介绍 */
  description?: ReactNode
  /** 警告提示内容 */
  message?: string
  /** 指定警告提示的样式，有四种选择 success、info、warning、error */
  type?: themeType
  /** 是否显示辅助图标 */
  showIcon?: boolean
  /** 关闭时触发的回调函数 */
  onClose?: (val: boolean) => void
  /** 关闭动画结束后触发的回调函数 */
  afterClose?: () => void
}

const theme = {
  success: {
    backgroundColor: '#f6ffed',
    border: '1px solid #b7eb8f',
    icon: 'check-circle'
  },
  info: {
    backgroundColor: '#e6f7ff',
    border: '1px solid #91d5ff',
    icon: 'info-circle'
  },
  warning: {
    backgroundColor: '#fffbe6',
    border: '1px solid #ffe58f',
    icon: 'exclamation-circle'
  },
  error: {
    backgroundColor: '#fff2f0',
    border: '1px solid #ffccc7',
    icon: 'times-circle'
  }
}

export const Alert = forwardRef<HTMLDivElement, AlertProps>(({
  type = 'success', description, closeable, onClose, showIcon, closeText, action, children, ...restProps
}, ref) => {

  const [visible, setVisible] = useState<boolean>(true)

  const kind = theme[type]

  const alertClasses = classNames('viking-alert', {
    [`viking-alert-${type}`]: type,
    [`viking-alert-with-description`]: description
  })

  const handleClose = () => {
    setVisible(!visible)
    onClose?.(!visible)
  }

  return visible ? <div className={alertClasses} style={{ backgroundColor: kind.backgroundColor, border: kind?.border }} ref={ref} {...restProps}>
    {
      showIcon && <span className="viking-alert-icon">
        <Icon icon={kind.icon as any} size={description ? 'lg' : '1x'} />
      </span>
    }
    <div className="viking-alert-content">
      <div className="viking-alert-message">{children}</div>
      <div className='viking-alert-description'>
        {description}
      </div>
    </div>
    {
      action ? <div className="viking-alert-action">{action}</div> : null
    }
    {
      (closeable || closeText) && <span onClick={() => handleClose()} className="viking-alert-close-icon">
        {closeable && !closeText && <Icon icon="times" />}
        {closeText && <span className="viking-alert-close-text">{closeText}</span>}
      </span>
    }
  </div > : null
})

export default Object.assign(Alert, { methods });