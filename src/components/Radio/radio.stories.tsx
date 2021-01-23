import React, { useState } from 'react'
import { storiesOf } from '@storybook/react'
import Radio from './radio'
import Button from '../Button/button'
import Hr from '../Hr/Hr'

const BasicRadio = () => {
  const [value, setValue] = useState(false)
  return (
    <>
      <div>
        <Hr>非受控组件</Hr>
        <Radio label="Basic" onChange={(val, e) => console.log(val, e, 1)} />
      </div>
      <div style={{ marginTop: 30 }}>
        <Hr>受控组件</Hr>
        <Radio
          label="Basic"
          value={value}
          onChange={(val, e) => console.log(val, e)}
        />
        <br />
        <Button theme="primary" onClick={() => setValue(!value)}>
          {value ? 'unchecked' : 'checked'}
        </Button>
        <br />
        <span>value: {JSON.stringify(value)}</span>
      </div>
    </>
  )
}

const RadioGroup = () => {
  const [value, setValue] = useState(undefined)
  const [value2, setValue2] = useState(undefined)
  const [value3, setValue3] = useState(undefined)
  const [value4, setValue4] = useState(undefined)
  const [value5, setValue5] = useState(undefined)
  return (
    <div>
      <div>
        <h6>单选Group</h6>
        <Radio value={value} onChange={setValue}>
          <Radio.Option>A. aaaaaaa</Radio.Option>
          <Radio.Option>B. bbbbbbb</Radio.Option>
          <Radio.Option>C. ccccccc</Radio.Option>
        </Radio>
        <span>value: {JSON.stringify(value)}</span>
      </div>

      <div style={{ marginTop: 30 }}>
        <h6>Button like</h6>
        <Radio value={value5} onChange={setValue5}>
          <Radio.Button>A. aaaaaaa</Radio.Button>
          <Radio.Button>B. bbbbbbb</Radio.Button>
          <Radio.Button>C. ccccccc</Radio.Button>
        </Radio>
        <span>value: {JSON.stringify(value5)}</span>
      </div>

      <div style={{ marginTop: 30 }}>
        <h6>自定义value</h6>
        <Radio
          options={[
            { label: 'A. aaaaaaa', value: '我是AAA' },
            { label: 'B. bbbbbbb', value: '我是BBB' },
            { label: 'C. ccccccc', value: '我是CCC' }
          ]}
          onChange={setValue2}
        />
        <span>value: {JSON.stringify(value2)}</span>
      </div>

      <div style={{ marginTop: 30 }}>
        <h6>自定义Options</h6>
        <Radio
          options={[
            { label: 'A. aaaaaaa', value: '皮卡皮', name: '皮卡丘' },
            { label: 'B. bbbbbbb', value: '种子种子', name: '妙蛙种子' },
            { label: 'C. ccccccc', value: '杰尼杰尼', name: '杰尼龟' }
          ]}
          renderOption={(val: any) => `${val.name}`}
          onChange={setValue3}
        />
        <span>value: {JSON.stringify(value3)}</span>
      </div>

      <div style={{ marginTop: 30 }}>
        <h6>禁止🚫disabled</h6>
        <Radio
          options={[
            {
              label: 'A. aaaaaaa',
              disabled: true,
              value: '皮卡皮',
              name: '皮卡丘'
            },
            { label: 'B. bbbbbbb', value: '种子种子', name: '妙蛙种子' },
            { label: 'C. ccccccc', value: '杰尼杰尼', name: '杰尼龟' }
          ]}
          renderOption={(val: any) => `${val.name}`}
          onChange={setValue4}
        />
        <span>value: {JSON.stringify(value4)}</span>
      </div>
    </div>
  )
}

storiesOf('Radio', module)
  .add('基础Radio', BasicRadio)
  .add('单选框组', RadioGroup)
