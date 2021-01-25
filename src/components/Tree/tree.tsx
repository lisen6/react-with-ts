import React, { forwardRef, HTMLAttributes } from 'react'

import TreeNode from './treeNode'

interface TreeProps
  extends Omit<HTMLAttributes<Element>, 'onSelect' | 'onClick' | 'onChange'> {}

const Tree = forwardRef<HTMLDivElement, TreeProps>((props, ref) => {
  return (
    <div ref={ref} className="viking-tree-list">
      123
      <TreeNode />
    </div>
  )
})

export default Tree
