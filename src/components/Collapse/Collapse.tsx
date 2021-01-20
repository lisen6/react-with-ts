import React, { useState, Children, useEffect, forwardRef, HTMLAttributes } from 'react'
import Panel from './Panel'

import classNames from 'classnames'

type onChangeCallback = (val: string[]) => void

type positionType = 'left' | 'right'

export interface CollapseProps extends Omit<HTMLAttributes<HTMLElement>, 'onChange'> {
  /** 初始化选中面板的 key */
  defaultActiveKey?: Array<string>
  /** 手风琴模式, 是否每次只激活一个tab */
  accordion?: Boolean
  /** 设置图标位置 */
  expandIconPosition?: positionType
  /** 当前激活面板改变时触发 */
  onChange?: onChangeCallback
}

export const Collapse = forwardRef<HTMLDivElement, CollapseProps>((props, ref) => {
  let {
    defaultActiveKey,
    accordion,
    expandIconPosition = 'left',
    onChange,
    children,
    ...restProps
  } = props

  defaultActiveKey = accordion
    ? (defaultActiveKey as any)?.[0]
    : defaultActiveKey

  const [value, setValue] = useState<any>(
    typeof defaultActiveKey === 'undefined'
      ? []
      : typeof defaultActiveKey == 'string'
        ? [defaultActiveKey]
        : defaultActiveKey
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
      setValue(result)
      onChange?.(result)
    } else {
      if (i !== -1) {
        value.splice(i, 1)
      } else {
        value.push(activeValue)
      }
      setValue(value)
      onChange?.(value)
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
        onItemClick: disabled ? () => { } : () => onClickItem(activeKey)
      }

      return <Panel {...props}>{children}</Panel>
    })
  }

  useEffect(() => {
    typeof defaultActiveKey !== 'undefined' && setValue([...defaultActiveKey])
  }, [defaultActiveKey])

  return <div className={CollapseClasses} ref={ref} {...restProps}>{getItems()}</div>
})

Collapse.defaultProps = {
  defaultActiveKey: []
}

Panel.displayName = 'Panel'

export default Collapse
