import React from 'react'
import classNames from 'classnames'

import Icon from '../Icon/Icon'
import Checkbox from '../Checkbox/checkbox'

const TreeNode = () => {
  const switchClass = classNames('viking-tree-switch', {})

  const checkboxClass = classNames('viking-tree-checkbox', {})

  return (
    <div>
      <span className={switchClass}>
        <Icon icon={`sort-up`} />
      </span>
      <span className={checkboxClass}>
        <Checkbox />
      </span>
      <span className="viking-tree-node-content-wrapper">
        <span className="viking-tree-title">123</span>
      </span>
    </div>
  )
}

export default TreeNode
