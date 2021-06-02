import React, {
  MouseEventHandler,
  FC,
  useEffect,
  useRef,
  ReactNode,
  HTMLAttributes,
  useState
} from 'react'
import Animation from '../Animation/Animation'

import Icon from '../Icon/Icon'

export const KINDS = {
  success: {
    icon: 'check-circle',
    background: '#F0FBEF',
    borderColor: '#34C724',
    boxShadowColor: '#646a731f'
  },
  info: {
    icon: 'info-circle',
    background: '#f0f4ff',
    borderColor: '#3370ff',
    boxShadowColor: '#646a731f'
  },
  warning: {
    icon: 'exclamation-circle',
    borderColor: '#FF8800',
    background: '#FFF5EB',
    boxShadowColor: '#646a731f'
  },
  error: {
    icon: 'times-circle',
    borderColor: '#F54A45',
    background: '#FEF1F1',
    boxShadowColor: '#646a731f'
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

const KEYFRAME_MAP = {
  SlideIn: {
    from: {
      marginTop: '-48px',
      transform: 'scale(.5,.5)',
      opacity: 0
    },
    to: {
      marginTop: '0',
      transform: 'scale(1,1)',
      opacity: 1
    }
  },
  SlideOut: {
    from: {
      marginTop: '0',
      transform: 'scale(1,1)',
      opacity: 1
    },
    to: {
      marginTop: '-48px',
      transform: 'scale(.5,.5)',
      opacity: 0
    }
  }
} as const

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
  const [destroy, setDestroy] = useState(false)

  const timer = useRef<number>(null!)

  const { icon, boxShadowColor, borderColor, background } = KINDS[kind]

  useEffect(() => {
    if (propsVisible && Number.isFinite(duration)) {
      clearTimeout(timer.current)
      timer.current = setTimeout(() => {
        setVisible(false)
      }, duration)
    }
    return () => clearTimeout(timer.current)
  }, [propsVisible, duration])

  useEffect(() => {
    setVisible(propsVisible)
  }, [propsVisible])

  return destroy ? null : (
    <Animation
      style={{ overflow: 'visible' }}
      auto
      duration={0.2}
      keyframes={KEYFRAME_MAP[visible ? 'SlideIn' : 'SlideOut']}
      onEnd={() => visible || setDestroy(true)}
    >
      <div
        className="viking-message"
        style={{
          background: background,
          border: `solid 1px ${borderColor}`,
          boxShadow: `0 2px 16px 0 ${boxShadowColor}`
        }}
        {...restProps}
      >
        <Icon icon={icon} color={borderColor} />
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
    </Animation>
  )
}

export default StaticAlert
