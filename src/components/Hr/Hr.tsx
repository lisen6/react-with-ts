import React, { forwardRef, HTMLAttributes } from 'react'
import classNames from 'classnames'

interface HrProps extends HTMLAttributes<HTMLElement> {
  padding?: CSSStyleDeclaration['padding']
  margin?: CSSStyleDeclaration['margin']
  textLeft?: CSSStyleDeclaration['width']
  textRight?: CSSStyleDeclaration['width']
}

const Hr = forwardRef<HTMLDivElement, HrProps>((props, ref) => {
  const { padding, margin, textLeft, textRight, children, ...restProps } = props

  const hrClasses = classNames('viking-hr', {
    hrLeft: textLeft,
    hrRight: textRight
  })

  return (
    <div
      className={hrClasses}
      ref={ref}
      style={{ padding: padding, margin: margin }}
      {...restProps}
    >
      <hr style={{ width: textLeft }} />
      <span className="hr-content">{children}</span>
      <hr style={{ width: textRight }} />
    </div>
  )
})

export default Hr
