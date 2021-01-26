import React, { FC, useEffect, useState } from 'react'
import classNames from 'classnames'

import Icon from '../Icon/Icon'
import Checkbox from '../Checkbox/checkbox'

import { TreeDataProps } from './tree'

const TreeNode: FC<TreeDataProps> = (props) => {
  const { label, id, expend, disabled, indeterminate: halfChecked, checked: defaultChecked, children, onItemExpend, onItemCheck } = props

  const [checked, setChecked] = useState<boolean>(defaultChecked)

  const [indeterminate, setIndeterminate] = useState<boolean>(halfChecked)

  const switchClass = classNames('viking-tree-switch', {
    'is-expend': !!expend
  })

  const checkboxClass = classNames('viking-tree-checkbox', {})

  useEffect(() => {
    setChecked(defaultChecked)
  }, [defaultChecked])

  useEffect(() => {
    setIndeterminate(halfChecked)
  }, [halfChecked])

  return (
    <>
      <div className="viking-tree-content" onClick={() => onItemExpend(id)}>
        <span className={switchClass} >
          {children && children.length > 0 ? (
            <Icon icon={expend ? `caret-down` : `caret-right`} />
          ) : (
              <div style={{ width: '10px' }} />
            )}
        </span>

        <span className={checkboxClass}>
          <Checkbox disabled={disabled} value={checked} onChange={() => {
            onItemCheck(id)
          }} />
        </span>
        <span className="viking-tree-node-content-wrapper">
          <span className="viking-tree-title">{label}</span>
        </span>
      </div>
      {children && children.length > 0 && expend ? (
        <div className="viking-tree-node-children">
          {children.map((item) => {
            let props = { ...item, onItemExpend, onItemCheck }
            return <TreeNode {...props} />
          })}
        </div>
      ) : null}
    </>
  )
}

export default TreeNode
