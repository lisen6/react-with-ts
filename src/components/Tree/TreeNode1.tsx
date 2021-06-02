import React, { FC, useEffect, useState } from 'react'
import classNames from 'classnames'

import Icon from '../Icon/Icon'
import Checkbox from '../Checkbox/Checkbox1'

import { TreeDataProps } from './Tree1'

const TreeNode: FC<TreeDataProps> = (props) => {
  const {
    label,
    id,
    isExpend,
    indeterminate: halfChecked,
    isChecked: defaultChecked,
    children,
    onItemExpend,
    onItemCheck
  } = props

  const [isChecked, setIsChecked] = useState<boolean>(defaultChecked)

  const [indeterminate, setIndeterminate] = useState<boolean>(halfChecked)

  const switchClass = classNames('viking-tree-switch', {
    'is-expend': !!isExpend
  })

  const checkboxClass = classNames('viking-tree-checkbox', {})

  useEffect(() => {
    setIsChecked(defaultChecked)
  }, [defaultChecked])

  // useEffect(() => {
  //   setIndeterminate(halfChecked)
  // }, [halfChecked])

  return (
    <>
      <div className="viking-tree-content">
        <span className={switchClass} onClick={() => onItemExpend(id)}>
          {children && children.length > 0 ? (
            <Icon icon="caret-down" />
          ) : (
            <div style={{ width: '10px' }} />
          )}
        </span>

        <span className={checkboxClass}>
          <Checkbox
            value={isChecked}
            onChange={() => {
              onItemCheck(id)
            }}
          />
        </span>
        <span className="viking-tree-node-content-wrapper">
          <span className="viking-tree-title">{label}</span>
        </span>
      </div>
      {children && children.length > 0 && isExpend ? (
        <div className="viking-tree-node-children">
          {children.map((item) => {
            let props = { ...item, onItemExpend, onItemCheck }
            return <TreeNode key={item.id} {...props} />
          })}
        </div>
      ) : null}
    </>
  )
}

export default TreeNode
