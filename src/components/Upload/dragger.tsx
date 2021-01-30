import React, { DragEvent, FC, useState } from 'react'
import classNames from 'classnames'

interface DraggerProps {
  onFile?: (file: FileList) => void
}

export const Dragger: FC<DraggerProps> = (props) => {
  const { onFile, children } = props

  const [dragOver, setDragOver] = useState(false)

  const dragClass = classNames('viking-upload-dragger', {
    'is-dragOver': dragOver
  })

  const handleDrop = (e: DragEvent<HTMLElement>) => {
    e.preventDefault()
    onFile?.(e.dataTransfer.files)
  }

  const handleDrag = (e: DragEvent<HTMLElement>, over: boolean) => {
    e.preventDefault()
    setDragOver(over)
  }

  return (
    <div
      className={dragClass}
      onDrop={(e) => handleDrop(e)}
      onDragOver={(e) => handleDrag(e, true)}
      onDragLeave={(e) => handleDrag(e, false)}
    >
      {children}
    </div>
  )
}

export default Dragger
