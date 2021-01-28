import React, {
  MouseEventHandler,
  FC,
  useEffect,
  useRef,
  ReactNode,
  HTMLAttributes,
  useState
} from 'react'

import Icon from '../Icon/Icon'

export const KINDS = {
  success: {
    icon: 'check-circle',
    theme: '#67c23a',
    background: '#F0FBEF',
    borderColor: '#e1f3d80'
  },
  info: {
    icon: 'info-circle',
    theme: '#3370ff',
    background: '#f0f4ff',
    borderColor: '#f0f4ff'
  },
  warning: {
    icon: 'exclamation-circle',
    theme: '#e6a23c',
    background: '#FFF5EB',
    borderColor: '#faecd8'
  },
  error: {
    icon: 'times-circle',
    theme: '#f56c6c',
    background: '#FEF1F1',
    borderColor: '#fde2e2'
  }
} as const

export interface StaticAlertProps extends HTMLAttributes<Element> {
  kind: 'success' | 'error' | 'info' | 'warning'
  loading?: boolean
  closable?: boolean
  visible?: boolean
  duration?: number
  onClose?: MouseEventHandler
  action?: ReactNode
  onAction?: MouseEventHandler
}

const StaticAlert: FC<StaticAlertProps> = (props) => {
  const {
    kind,
    loading,
    closable,
    visible: propsVisible,
    duration,
    onClose,
    action,
    onAction,
    children,
    ...restProps
  } = props

  const [visible, setVisible] = useState(propsVisible)

  const timer = useRef<number>(null!)

  const { icon, theme, borderColor, background } = KINDS[kind]

  useEffect(() => {
    // if (propsVisible && Number.isFinite(duration)) {
    //   clearTimeout(timer.current)
    //   timer.current = setTimeout(() => {
    //     setVisible(false)
    //   }, duration)
    // }
    // return () => clearTimeout(timer.current)
  }, [propsVisible])

  useEffect(() => {
    setVisible(propsVisible)
  }, [propsVisible])

  return visible ? (
    <div
      className="viking-message"
      style={{
        background: background,
        color: theme,
        border: `solid 1px ${borderColor}`
      }}
    >
      <Icon icon={icon} />
      <span style={{ marginLeft: 10 }}>{children}</span>
      {closable && (
        <span
          className="viking-icon-close"
          onClick={(e) => {
            onClose?.(e)
            setVisible(false)
          }}
        >
          <Icon icon="times" color="gray" />
        </span>
      )}
    </div>
  ) : null
}

export default StaticAlert
