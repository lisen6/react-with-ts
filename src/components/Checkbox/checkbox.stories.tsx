import React, { useState, useRef, useEffect } from 'react'
import { storiesOf } from '@storybook/react'

import Checkbox from './checkbox'
import Button from '../Button/button'
import Hr from '../Hr/Hr'

const BasicCheckbox = () => {
  const [value, setValue] = useState(true)
  return (
    <>
      <div>
        <Hr>非受控组件</Hr>
        <Checkbox defaultValue indeterminate>
          Basic
        </Checkbox>
      </div>
      <div style={{ marginTop: 30 }}>
        <Hr>受控组件</Hr>
        <Checkbox value={value}>Basic</Checkbox>
        <br />
        <Button theme="primary" onClick={() => setValue(!value)}>
          {value ? 'unchecked' : 'checked'}
        </Button>
        <br />
        <span>value: {String(value)}</span>
      </div>
    </>
  )
}

const CheckboxGroup = () => {
  const [value, setValue] = useState()

  const ref = useRef(null)
  useEffect(() => console.log(ref), [])
  return (
    <>
      <div>
        <h6>checkbox Group</h6>
        <Checkbox ref={ref} value={value} onChange={setValue}>
          <Checkbox.Option>A. aaaaaaa</Checkbox.Option>
          <Checkbox.Option>B. bbbbbbb</Checkbox.Option>
          <Checkbox.Option>C. ccccccc</Checkbox.Option>
        </Checkbox>
        <span>value: {String(value)}</span>
      </div>

      <div style={{ marginTop: 30 }}>
        <h6>with defaultValue</h6>
        <Checkbox defaultValue={[0, 1]}>
          <Checkbox.Option disabled>A. aaaaaaa</Checkbox.Option>
          <Checkbox.Option>B. bbbbbbb</Checkbox.Option>
          <Checkbox.Option>C. ccccccc</Checkbox.Option>
        </Checkbox>
      </div>
    </>
  )
}

storiesOf('Checkbox', module)
  .add('基础Checkbox', BasicCheckbox)
  .add('多选框组', CheckboxGroup)
