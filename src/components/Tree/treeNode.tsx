import React, { FC } from 'react'
import classNames from 'classnames'

import Icon from '../Icon/Icon'
import Checkbox from '../Checkbox/checkbox'

import { treeDataProps } from './tree'

const TreeNode: FC<treeDataProps> = (props) => {
  const { label, id, expend, children, onItemExpend } = props
  console.log(props, 1111)
  const switchClass = classNames('viking-tree-switch', {
    'is-expend': !!expend
  })

  const checkboxClass = classNames('viking-tree-checkbox', {})

  return (
    <>
      <div className="viking-tree-content">
        <span className={switchClass} onClick={() => onItemExpend(id)}>
          {children && children.length > 0 ? (
            <Icon icon={expend ? `caret-down` : `caret-right`} />
          ) : (
            <div style={{ width: '10px' }} />
          )}
        </span>

        <span className={checkboxClass}>
          <Checkbox />
        </span>
        <span className="viking-tree-node-content-wrapper">
          <span className="viking-tree-title">{label}</span>
        </span>
      </div>
      {children && children.length > 0 && expend ? (
        <div className="viking-tree-node-children">
          {children.map((item) => {
            let props = { ...item, onItemExpend }
            return <TreeNode {...props} />
          })}
        </div>
      ) : null}
    </>
  )
}

export default TreeNode
