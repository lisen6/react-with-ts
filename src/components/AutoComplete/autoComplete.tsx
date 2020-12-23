import React, {
  useState,
  FC,
  ChangeEvent,
} from "react";

import Input, { InputProps } from '../Input/input'

export interface AutoCompleteProps extends Omit<InputProps, 'onSelect'> {
  fetchSuggestions: (str: string) => string[];
  onSelect?: (item: string) => void;
}

export const AutoComplete: FC<AutoCompleteProps> = (props) => {
  const {
    fetchSuggestions,
    onSelect,
    value,
    ...restProps
  } = props

  const [inputValue, setInputValue] = useState(value)

  const [suggestions, setSuggestions] = useState<String[]>([])

  const handleChange = (value: string, e: ChangeEvent<HTMLInputElement>) => {
    console.log(value, 'value')
    setInputValue(value)
    if (value) {
      const result = fetchSuggestions(value)
      setSuggestions(result)
    } else {
      setSuggestions([])
    }
  }

  const handleSelect = (item: string) => {
    setInputValue(item)
    setSuggestions([])
    onSelect?.(item)
  }

  const renderSuggestions = () => {
    return <ul>
      {suggestions.map((item: any, index) => {
        return <li onClick={() => handleSelect(item)} key={index}>{item}</li>
      })}
    </ul>
  }

  return (
    <div className="viking-autoComplete">
      <Input
        value={inputValue}
        onChange={(value, e: any) => handleChange(value, e)}
        {...restProps}
      />
      {suggestions.length > 0 && renderSuggestions()}
    </div>
  )
}

export default AutoComplete