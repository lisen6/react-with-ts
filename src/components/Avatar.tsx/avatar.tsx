import React, { forwardRef, HTMLAttributes } from 'react'

interface AvatarProps extends HTMLAttributes<HTMLElement> {}

const Avatar = forwardRef<HTMLDivElement, AvatarProps>((props, ref) => {
  return <div ref={ref}>Avatar</div>
})

export default Avatar
