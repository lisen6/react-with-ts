import React, { forwardRef, HTMLAttributes } from 'react'

interface TagProps extends HTMLAttributes<HTMLElement> {}

const Tag = forwardRef<HTMLDivElement, TagProps>((props, ref) => {
  return <div ref={ref}>Tag</div>
})

export default Tag
