import React, { FC, useState, useEffect, ReactNode, forwardRef } from 'react';
import classNames from 'classnames';
import Icon from '../Icon/Icon'

type themeType = 'success' | 'info' | 'warning' | 'error'

export interface AlertProps {
  action?: ReactNode
  afterClose?: () => void
  closeable?: boolean
  closeText?: ReactNode
  description?: ReactNode
  message?: string
  type?: themeType
  onClose?: (val: boolean) => void
}

const theme = {
  success: {
    backgroundColor: '#f6ffed',
    border: '1px solid #b7eb8f'
  },
  info: {
    backgroundColor: '#e6f7ff',
    border: '1px solid #91d5ff'
  },
  warning: {
    backgroundColor: '#fffbe6',
    border: '1px solid #ffe58f'
  },
  error: {
    backgroundColor: '#fff2f0',
    border: '1px solid #ffccc7'
  }
}

export const Alert = forwardRef<HTMLDivElement, AlertProps>(({
  type = 'success', description, closeable, onClose, children
}, ref) => {

  const [visible, setVisible] = useState<boolean>(true)

  const kind = theme[type]

  const alertClasses = classNames('viking-alert', {
    [`viking-alert-${type}`]: type,
    [`viking-alert-with-description`]: description
  })

  const handleClose = () => {
    onClose?.(!visible)
  }

  return <>{visible && <div className={alertClasses} style={{ backgroundColor: kind.backgroundColor, border: kind?.border }} ref={ref}>
    <div className="viking-alert-content">
      <div className="viking-alert-message">{children}</div>
      <div className='viking-alert-description'>
        {description}
      </div>
    </div>
    {
      closeable && <span onClick={() => handleClose()} className="viking-alert-close-icon">
        <Icon icon="times" />
      </span>
    }
  </div>}</>
})

export default Alert;