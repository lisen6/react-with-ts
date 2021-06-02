import React, { useState } from 'react'
import { storiesOf } from '@storybook/react'

import Tree from './Tree1'
import Button from '../Button/Button1'

const BasicTree = () => {
  const data = [
    {
      id: '1',
      label: '一级 2',
      children: [
        {
          id: '3',
          label: '二级 2-1',
          children: [
            {
              id: '4',
              label: '三级 3-1-1'
            },
            {
              id: '5',
              label: '三级 3-1-2'
            }
          ]
        },
        {
          id: '2',
          label: '二级 2-2',
          children: [
            {
              id: '6',
              label: '三级 3-2-1'
            },
            {
              id: '7',
              label: '三级 3-2-2'
            }
          ]
        }
      ]
    }
  ]
  const [expendKeys, setExpendKeys] = useState<string[]>(['1', '2', '3'])
  const [checkedKeys, setCheckedKeys] = useState<string[]>(['3'])
  return (
    <>
      <Tree
        treeData={data}
        defaultExpendedKeys={expendKeys}
        defaultCheckedKeys={checkedKeys}
        onExpend={(v, k) => console.log(v, k, 'onExpend')}
        onChange={(v, k) => console.log(v, k, 'Select')}
      />
      <br />
      <Button onClick={() => setExpendKeys(['1', '2'])} theme="primary">
        ExpendedKeys
      </Button>
      <br />
      <br />
      <Button onClick={() => setCheckedKeys(['2', '3'])} theme="primary">
        checkedKeys
      </Button>
    </>
  )
}

storiesOf('Tree', module).add('基础Tree', BasicTree)
