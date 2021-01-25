import React, { forwardRef, HTMLAttributes, useEffect, useState } from 'react'

import TreeNode from './treeNode'

export interface treeDataProps {
  id: number
  label: string
  children?: treeDataProps[]
  expend?: boolean
  [key: string]: any
}
export interface TreeProps
  extends Omit<HTMLAttributes<Element>, 'onSelect' | 'onClick' | 'onChange'> {
  treeData?: treeDataProps[]
}

const Tree = forwardRef<HTMLDivElement, TreeProps>((props, ref) => {
  const { treeData } = props

  const [nodeKeyMap, setNodeKeyMap] = useState<any>({})

  const buildKeyMap = (treeData: treeDataProps[], parent: treeDataProps, keyMap: any = {}) => {
    treeData.forEach((item: treeDataProps) => {
      item.parent = parent
      keyMap[`${item.id}`] = item;
      if (item?.children?.length! > 0) {
        buildKeyMap(item.children!, item, keyMap)
      }
    })
    return keyMap
  }

  const handleItemExpend = (id: number) => {
    let index = id.toString()
    nodeKeyMap[index].expend = !nodeKeyMap[index].expend
    setNodeKeyMap({ ...nodeKeyMap })
  }

  const handleItemChecked = (key: number) => {

  }

  useEffect(() => {
    setNodeKeyMap(buildKeyMap(treeData!, null as any, {}))
  }, [treeData])

  return (
    <div ref={ref} className="viking-tree-list">
      {
        treeData?.map(item => {
          let props = { ...item, onItemExpend: handleItemExpend }
          return <TreeNode {...props} />
        })
      }
    </div>
  )
})

export default Tree
