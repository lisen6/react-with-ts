import React, { forwardRef, HTMLAttributes } from 'react'

import classNames from 'classnames'

type AvatarSize = 'large' | 'normal' | 'small'
type AvatarKind = 'square' | 'circle'

interface AvatarProps extends HTMLAttributes<HTMLElement> {
  size?: AvatarSize
  kind?: AvatarKind
  image: string
}

const Avatar = forwardRef<HTMLDivElement, AvatarProps>((props, ref) => {
  const { size, kind, image, children, ...restProps } = props

  const avatarClass = classNames('viking-avatar', {
    'is-square': kind === 'square',
    [`avatar-size_${size}`]: size
  })

  return (
    <div className={avatarClass} ref={ref} {...restProps}>
      <div
        className="viking-avatar-container"
        style={{
          backgroundImage: `url(${image})`,
          backgroundPosition: 'center center',
          backgroundSize: 'cover',
          backgroundRepeat: 'no-repeat'
        }}
      ></div>
    </div>
  )
})

export default Avatar
