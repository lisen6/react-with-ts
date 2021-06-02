import React, {
  useState,
  useRef,
  FC,
  ChangeEvent,
  KeyboardEvent,
  ReactElement,
  useEffect
} from 'react'
import classNames from 'classnames'

import Input, { InputProps } from '../Input/Input1'

import useDebounce from '../../hooks/useDebounce'
import useClickOutSide from '../../hooks/useClickOutSide'

interface DataSourceObject {
  value: string
}

export type DataSourceType<T = {}> = T & DataSourceObject
export interface AutoCompleteProps extends Omit<InputProps, 'onSelect'> {
  fetchSuggestions: (
    str: string
  ) => DataSourceType[] | Promise<DataSourceType[]>
  onSelect?: (item: DataSourceType) => void
  renderOptions?: (item: DataSourceType) => ReactElement
}

export const AutoComplete: FC<AutoCompleteProps> = (props) => {
  const {
    fetchSuggestions,
    onSelect,
    value,
    renderOptions,
    ...restProps
  } = props

  // input值
  const [inputValue, setInputValue] = useState(value)

  // 是否展示下拉列表
  const [visible, setVisible] = useState(false)

  // 展示列表
  const [suggestions, setSuggestions] = useState<DataSourceType[]>([])

  const [loading, setLoading] = useState(false)

  // 防抖
  const debouncedValue = useDebounce(inputValue)

  // 条目高亮
  const [highlightIndex, setHighlightIndex] = useState(0)

  // 用来限制选中之后还会再触发查询的问题
  const triggerSearchRef = useRef(true)

  const componentRef = useRef<HTMLDivElement>(null)

  useClickOutSide(componentRef, () => {
    setVisible(false)
  })

  // 输入内容回调
  const handleChange = (value: string, e: ChangeEvent<HTMLInputElement>) => {
    triggerSearchRef.current = true
    setInputValue(value)
  }

  // 点击
  const handleFocus = (e: ChangeEvent<HTMLInputElement>) => {
    setVisible(true)
  }

  const highlight = (index: number, e: KeyboardEvent<HTMLInputElement>) => {
    e.preventDefault()
    if (index < 0) index = suggestions.length - 1
    if (index >= suggestions.length) {
      index = 0
    }
    setHighlightIndex(index)
  }

  // 键盘事件
  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    switch (e.keyCode) {
      // enter
      case 13:
        if (suggestions[highlightIndex]) {
          handleSelect(suggestions[highlightIndex])
        }
        break

      // top
      case 38:
        highlight(highlightIndex - 1, e)
        break

      // bottom
      case 40:
        highlight(highlightIndex + 1, e)
        break

      // esc
      case 27:
        setVisible(false)
        break
      default:
        break
    }
  }

  // 选中之后的回调
  const handleSelect = (item: DataSourceType) => {
    setVisible(false)
    setInputValue(item.value)
    onSelect?.(item)
    triggerSearchRef.current = false
  }

  // 渲染自定义html
  const renderTemplate = (item: DataSourceType) => {
    return renderOptions ? renderOptions(item) : item.value
  }

  const renderSuggestions = () => {
    return (
      <>
        {suggestions.length > 0 && (
          <div className="viking-select-dropdown-wrapper">
            <ul className="viking-select-dropdown">
              {suggestions.map((item: any, index) => {
                const highNames = classNames('suggestion-item', {
                  'item-highlighted': index === highlightIndex
                })
                return (
                  <li
                    className={highNames}
                    onClick={() => handleSelect(item)}
                    key={index}
                  >
                    {renderTemplate(item)}
                  </li>
                )
              })}
            </ul>
          </div>
        )}
        {loading && !suggestions.length && (
          <div className="viking-select-dropdown-wrapper">
            <span className="autoComplete-loading">loading...</span>
          </div>
        )}
      </>
    )
  }

  useEffect(() => {
    if (debouncedValue && triggerSearchRef.current) {
      const result = fetchSuggestions(debouncedValue) // result是联合类型  DataSourceType || Promise
      if (result instanceof Promise) {
        setLoading(true)
        result.then((data) => {
          setTimeout(() => {
            setLoading(false)
            setVisible(true)
            setSuggestions(data)
          }, 3000)
        })
      } else {
        setSuggestions(result)
      }
    } else {
      setVisible(false)
    }
    setHighlightIndex(0)
  }, [debouncedValue])

  return (
    <div className="viking-autoComplete" ref={componentRef}>
      <Input
        value={inputValue}
        onFocus={handleFocus}
        onKeyDown={handleKeyDown}
        onChange={(value, e: any) => handleChange(value, e)}
        {...restProps}
      />

      {visible && renderSuggestions()}
    </div>
  )
}

export default AutoComplete
