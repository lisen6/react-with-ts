import React, { MouseEventHandler, FC, useEffect, useRef, ReactNode, HTMLAttributes, useState } from 'react'

export const KINDS = {
  success: {
    icon: "check-circle",
    theme: 'green'
  },
  info: {
    icon: "info-circle",
    theme: 'blue'
  },
  warning: {
    icon: "exclamation-circle",
    theme: 'orange'
  },
  error: {
    icon: "times-circle",
    theme: 'red'
  }
} as const

export interface StaticAlertProps extends HTMLAttributes<Element> {
  kind?: 'success' | 'error' | 'info' | 'warning'
  loading?: boolean
  closable?: boolean
  visible?: boolean
  duration?: number
  onClose?: MouseEventHandler
  action?: ReactNode
  onAction?: MouseEventHandler
}

const StaticAlert: FC<StaticAlertProps> = (props) => {
  const { kind, loading, closable, visible: propsVisible, duration, onClose, action, onAction, children, ...restProps } = props;

  const [visible, setVisible] = useState(propsVisible)

  const timer = useRef<number>(null!)

  useEffect(() => {
    if (propsVisible && Number.isFinite(duration)) {
      clearTimeout(timer.current)
      timer.current = setTimeout(() => {
        setVisible(false)
      }, duration)
    }
    return () => clearTimeout(timer.current)
  }, [propsVisible])

  useEffect(() => {
    setVisible(propsVisible)
  }, [propsVisible])

  return visible ? <div className="viking-message">{children}</div> : null
}

export default StaticAlert

