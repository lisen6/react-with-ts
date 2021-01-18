import React, { useState, FC, Children, useEffect } from 'react'
import Panel from './Panel'

import classNames from 'classnames'

type onChangeCallback = (val: string[]) => void

type positionType = 'left' | 'right'

export interface CollapseProps {
  /** 初始化选中面板的 key */
  defaultActiveKey?: Array<string>
  /** 手风琴模式, 是否每次只激活一个tab */
  accordion?: Boolean
  /** 设置图标位置 */
  expandIconPosition?: positionType
  /** 当前激活面板改变时触发 */
  onChange?: onChangeCallback
}

export const Collapse: FC<CollapseProps> = (props) => {
  let {
    defaultActiveKey,
    accordion,
    expandIconPosition = 'left',
    onChange,
    children
  } = props

  defaultActiveKey = accordion
    ? [(defaultActiveKey as any)?.[0]]
    : defaultActiveKey

  const [value, setValue] = useState<any>(
    typeof defaultActiveKey === 'undefined' ? [] : defaultActiveKey
  )

  const CollapseClasses = classNames('viking-Collapse', {
    [`collapse-icon-position-${expandIconPosition}`]: [
      'left',
      'right'
    ].includes(expandIconPosition)
  })

  const onClickItem = (activeValue: any) => {
    const i = value.indexOf(activeValue)
    if (accordion) {
      let result = i !== -1 ? [] : [activeValue]
      onChange?.(result)
    } else {
      if (i !== -1) {
        value.splice(i, 1)
      } else {
        value.push(activeValue)
      }
      onChange?.([...value])
    }
  }

  const getItems = () => {
    return Children?.map(children, (panel: any, panelIndex: number) => {
      let {
        header,
        children,
        activeKey,
        showArrow,
        extra,
        disabled
      } = panel.props

      activeKey = activeKey || panelIndex

      let isActive = false
      if (accordion) {
        isActive = value?.[0] === activeKey
      } else {
        isActive = value?.includes(activeKey)
      }

      const props = {
        header,
        showArrow,
        activeKey,
        isActive,
        accordion,
        disabled,
        extra,
        onItemClick: disabled ? () => {} : () => onClickItem(activeKey)
      }

      return <Panel {...props}>{children}</Panel>
    })
  }

  useEffect(() => {
    typeof defaultActiveKey !== 'undefined' && setValue(defaultActiveKey)
  }, [defaultActiveKey])

  useEffect(() => {
    setValue(value)
  }, [value])

  return <div className={CollapseClasses}>{getItems()}</div>
}

Collapse.defaultProps = {
  defaultActiveKey: []
}

Panel.displayName = 'Panel'

export default Collapse
