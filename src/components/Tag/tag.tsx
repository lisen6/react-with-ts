import React, {
  forwardRef,
  HTMLAttributes,
  ReactNode,
  MouseEvent,
  CSSProperties,
  useState
} from 'react'
import classNames from 'classnames'
import styled from 'styled-components'
import { css } from 'styled-components'

import Icon from '../Icon/Icon'
import Avatar from '../Avatar/Avatar'

interface TagProps extends HTMLAttributes<HTMLElement> {
  kind?: 'default' | 'round'
  weak?: boolean
  theme?: keyof typeof THEME_MAP
  size?: 'large' | 'small'
  closable?: boolean | 'always'
  disabled?: boolean
  avatar?: string
  icon?: 'string' | ReactNode
  onClick?: (e: MouseEvent) => void
  onClose?: (val: boolean) => void
}

const THEME_MAP = {
  blue: {
    backgroundColor: '#e1eaff',
    color: '#0c296e',
    hoverColor: '#bdcef9'
  },
  gray: {
    backgroundColor: '#eff0f1',
    color: '#1f2329',
    hoverColor: '#dee0e3'
  },
  wathet: {
    backgroundColor: '#D9F3FD',
    color: '#004761',
    hoverColor: '#bbe6fa'
  },
  turquoise: {
    backgroundColor: '#D5F6F2',
    color: '#024B41',
    hoverColor: '#b8ede6'
  },
  green: {
    backgroundColor: '#D9F5D6',
    color: '#124B0C',
    hoverColor: '#c2eab6'
  },
  lime: {
    backgroundColor: '#EEF6C6',
    color: '#1f2329',
    hoverColor: '#e2eda0'
  },
  yellow: {
    backgroundColor: '#FAF1D1',
    color: '#5C3A00',
    hoverColor: '#f5e6b2'
  },
  orange: {
    backgroundColor: '#FEEAD2',
    color: '#6B3900',
    hoverColor: '#f5e6b2'
  },
  red: {
    backgroundColor: '#FDE2E2',
    color: '#621C18',
    hoverColor: '#f2c1be'
  },
  carmine: {
    backgroundColor: '#FDDDEF',
    color: '#520A32',
    hoverColor: '#eeb2d7'
  },
  violet: {
    backgroundColor: '#F8DEF8',
    color: '#460B46',
    hoverColor: '#e7bcec'
  },
  purple: {
    backgroundColor: '#ECE2FE',
    color: '#270561',
    hoverColor: '#c9b5f5'
  },
  indigo: {
    backgroundColor: '#E0E2FA',
    color: '#0C1264',
    hoverColor: '#b4baee'
  }
} as const

const StyledSpan = styled.span(({ theme, cursor, isActive }: any) => {
  return css`
    background: ${theme.backgroundColor};
    color: ${theme.color};
    cursor: ${cursor};
    &:hover {
      background: ${isActive ? theme.hoverColor : ''};
    }
  `
})

const Tag = forwardRef<HTMLSpanElement, TagProps>((props, ref) => {
  const {
    kind,
    weak,
    closable,
    disabled,
    theme,
    avatar,
    icon,
    size,
    children,
    onClick,
    onClose,
    ...restProps
  } = props

  const [visible, setVisible] = useState(true)

  const tagClass = classNames('tag-wrapper', {
    [`tag-size_${size}`]: size,
    [`is-weak`]: weak,
    [`is-circle`]: kind === 'round',
    [`is-Active`]: onClick && !theme
  })

  let cursor = 'default'
  if (onClick || onClose || avatar) {
    cursor = 'pointer'
  }

  return visible ? (
    <StyledSpan
      className={tagClass}
      ref={ref}
      onClick={(e) => onClick?.(e)}
      theme={THEME_MAP[theme!]}
      cursor={cursor}
      isActive={!!onClick && theme}
      {...restProps}
    >
      {avatar ? (
        <>
          <Avatar style={{ height: 20, width: 20 }} image={avatar!}></Avatar>
          <span style={{ marginLeft: 3 }}>{children}</span>
        </>
      ) : (
        children
      )}
      {closable ? (
        <span
          className="tag-close-icon"
          onClick={(e) => {
            e.stopPropagation()
            setVisible(!visible)
            onClose?.(!visible)
          }}
        >
          <Icon icon="times-circle" />
        </span>
      ) : null}
    </StyledSpan>
  ) : null
})

export default Tag
