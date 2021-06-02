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
import Avatar from '../Avatar/Avatar1'

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
    [`is-Active`]: onClick
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
      isActive={!!onClick}
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
