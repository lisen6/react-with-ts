import React from 'react'
import { storiesOf } from '@storybook/react'
import { action } from '@storybook/addon-actions'

import Button from './button'
import Hr from '../Hr/Hr'

const DefaultButton = () => {
  return (
    <div>
      <Hr>kind=default</Hr>
      <br />
      <div
        style={{ width: 450, display: 'flex', justifyContent: 'space-between' }}
      >
        <Button>Button</Button>

        <Button theme="primary">Primary</Button>

        <Button theme="danger">Error</Button>

        <Button theme="link" href="www.baidu.com">
          link
        </Button>
      </div>

      <Hr>kind=outline</Hr>
      <br />
      <div
        style={{ width: 300, display: 'flex', justifyContent: 'space-between' }}
      >
        <Button theme="default" kind="outline">
          Button
        </Button>
        <Button theme="primary" kind="outline">
          Primary
        </Button>
        <Button theme="danger" kind="outline">
          Error
        </Button>
      </div>

      <Hr>kind=circle</Hr>
      <br />
      <div
        style={{ width: 200, display: 'flex', justifyContent: 'space-between' }}
      >
        <Button theme="default" kind="circle">
          B
        </Button>
        <Button theme="primary" kind="circle">
          P
        </Button>
        <Button theme="danger" kind="circle">
          E
        </Button>
      </div>
    </div>
  )
}

const ButtonWithSize = () => (
  <>
    <Button size="large">large Button</Button>
    <Button>default Button</Button>
    <Button size="small">small Button</Button>
  </>
)

storiesOf('Button', module)
  .add('默认的Button', DefaultButton)
  .add('不同大小的Button', ButtonWithSize)
