import React, {
  forwardRef,
  HTMLAttributes,
  useCallback,
  useEffect,
  useState
} from 'react'

import TreeNode from './TreeNode1'

export interface TreeDataProps {
  id: string
  label: string
  children?: TreeDataProps[]
  isExpend?: boolean
  [key: string]: any
}
export interface TreeProps
  extends Omit<HTMLAttributes<Element>, 'onSelect' | 'onClick' | 'onChange'> {
  treeData?: TreeDataProps[]
  defaultExpendedKeys?: string[]
  defaultCheckedKeys?: string[]
  onExpend?: (
    v: string,
    { expend, node }: { expend: boolean; node: TreeDataProps[] }
  ) => void
  onChange: (
    v: string,
    { checked, node }: { checked: boolean; node: TreeDataProps[] }
  ) => void
}

const Tree = forwardRef<HTMLDivElement, TreeProps>((props, ref) => {
  const {
    treeData,
    onExpend,
    onChange,
    defaultExpendedKeys,
    defaultCheckedKeys
  } = props

  const [nodeKeyMap, setNodeKeyMap] = useState<any>({})
  const [checkedKeys, setCheckedKeys] = useState<string[]>([])
  const [expendedKeys, setExpendedKeys] = useState<string[]>([])
  const [halfCheckedKeys, setHalfCheckedKeys] = useState<string[]>([])

  const buildKeyMap = useCallback(
    (treeData: TreeDataProps[], parent: TreeDataProps, keyMap: any = {}) => {
      treeData?.forEach((item: TreeDataProps) => {
        item.parent = parent
        item.isExpend = defaultExpendedKeys?.includes(item.id)

        if (item.isExpend) setCheckedKeys([...checkedKeys, item.key])

        item.isChecked =
          defaultCheckedKeys?.includes(item.id) ||
          defaultCheckedKeys?.includes(item.parent?.id)

        // 当自己默认选中的时候。子级也要遍历选中
        if (item.children && item.children.length > 0) {
          item.children = item.children.map((v) => {
            return {
              ...v,
              isChecked: item.isChecked
            }
          })
        }

        // 当自己默认选中的时候。父级也要判断是否选中
        if (item.parent) {
          item.parent.isChecked = item.parent.children.every(
            (v: any) => v?.isChecked !== undefined && v?.isChecked
          )
        }
        keyMap[item.id] = item

        if (item?.children?.length! > 0) {
          buildKeyMap(item.children!, item, keyMap)
        }
      })
      return keyMap
    },
    [treeData]
  )
  console.log(nodeKeyMap)

  const handleItemExpend = (key: string) => {
    nodeKeyMap[key].isExpend = !nodeKeyMap[key].isExpend
    setNodeKeyMap({ ...nodeKeyMap })
    console.log(key)
    onExpend?.(key, { expend: nodeKeyMap[key].isExpend, node: nodeKeyMap[key] })
  }

  const handleItemChecked = (key: string) => {
    let data = nodeKeyMap[key]
    if (data) {
      data.isChecked = !data.isChecked
      if (data.isChecked) {
        // 如果当前节点勾选
        checkAllChild(data.children, true) // 子节点全部勾选
        checkParent(data.parent) // 判断父节点是否勾选
      } else {
        checkAllChild(data.children, false) // 取消子节点勾选
        checkParent(data.parent) // 判断子节点是否勾选
      }
    }
    onChange?.(key, {
      checked: nodeKeyMap[key].isChecked,
      node: nodeKeyMap[key]
    })
    setNodeKeyMap({ ...nodeKeyMap })
  }

  // 父节点如果勾选  优先深度遍历子节点勾选
  const checkAllChild = (children: TreeDataProps[], isChecked: boolean) => {
    children?.forEach((item: TreeDataProps) => {
      item.isChecked = isChecked
      if (item.children) {
        checkAllChild(item.children, isChecked)
      }
    })
  }

  // 判断父节点是否应该勾选
  const checkParent = (parent: TreeDataProps) => {
    while (parent && parent.children) {
      parent.isChecked = parent.children.every((item) => item.isChecked)
      parent = parent.parent
    }
  }

  useEffect(() => {
    setNodeKeyMap(buildKeyMap(treeData!, null as any, {}))
  }, [treeData])

  return (
    <div ref={ref} className="viking-tree-list">
      {treeData?.map((item) => {
        let props = {
          ...item,
          onItemExpend: handleItemExpend,
          onItemCheck: handleItemChecked
        }
        return <TreeNode key={item.id} {...props} />
      })}
    </div>
  )
})

export default Tree
