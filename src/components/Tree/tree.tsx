import React, { forwardRef, HTMLAttributes, useEffect, useState } from 'react'

import TreeNode from './treeNode'

export interface TreeDataProps {
  id: string
  label: string
  children?: TreeDataProps[]
  expend?: boolean
  [key: string]: any
}
export interface TreeProps
  extends Omit<HTMLAttributes<Element>, 'onSelect' | 'onClick' | 'onChange'> {
  treeData?: TreeDataProps[]
  defaultExpandedKeys?: string[]
  defaultCheckedKeys?: string[]
}

const Tree = forwardRef<HTMLDivElement, TreeProps>((props, ref) => {
  const { treeData, defaultExpandedKeys, defaultCheckedKeys } = props

  const [nodeKeyMap, setNodeKeyMap] = useState<any>({})

  const buildKeyMap = (
    treeData: TreeDataProps[],
    parent: TreeDataProps,
    keyMap: any = {}
  ) => {
    treeData?.forEach((item: TreeDataProps) => {
      item.parent = parent
      if (defaultExpandedKeys?.includes(item.id)) {
        item.expend = true
      }
      if (defaultCheckedKeys?.includes(item.id)) {
        item.checked = true
      }
      keyMap[`${item.id}`] = item
      if (item?.children?.length! > 0) {
        buildKeyMap(item.children!, item, keyMap)
      }
    })
    return keyMap
  }

  const handleItemExpend = (key: string) => {
    nodeKeyMap[key].expend = !nodeKeyMap[key].expend
    setNodeKeyMap({ ...nodeKeyMap })
  }

  const handleItemChecked = (key: string) => {
    let data = nodeKeyMap[key]
    if (data) {
      data.checked = !data.checked
      if (data.checked) { // 如果父节点勾选
        checkAllChild(data.children, true) // 全选子节点
        checkParent(data.parent)  // 判断父节点是否勾选
      } else {
        checkAllChild(data.children, false) // 取消子节点勾选
        checkParent(data.parent) // 判断子节点是否勾选
      }
    }
    setNodeKeyMap({ ...nodeKeyMap })
  }

  // 父节点如果勾选  优先深度遍历子节点勾选
  const checkAllChild = (children: TreeDataProps[], checked: boolean) => {
    children?.forEach((item: TreeDataProps) => {
      item.checked = item.disabled ? false : checked;
      if (item.children) {
        checkAllChild(item.children, checked)
      }
    })
  }

  // 判断父节点是否应该勾选
  const checkParent = (parent: TreeDataProps) => {
    while (parent && parent.children) {
      parent.checked = parent.children.every(item => item.checked)
      parent = parent.parent
    }
  }


  useEffect(() => {
    setNodeKeyMap(buildKeyMap(treeData!, null as any, {}))
  }, [treeData, defaultExpandedKeys])

  return (
    <div ref={ref} className="viking-tree-list">
      {treeData?.map((item) => {
        let props = { ...item, onItemExpend: handleItemExpend, onItemCheck: handleItemChecked }
        return <TreeNode {...props} />
      })}
    </div>
  )
})

export default Tree
