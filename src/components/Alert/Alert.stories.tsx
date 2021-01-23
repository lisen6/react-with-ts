import React, { useRef, useEffect } from 'react'
import { storiesOf } from '@storybook/react'

import Alert from './Alert'
import Button from '../Button/button'

import Hr from '../Hr/Hr'

const BasicAlert = () => {
  const ref = useRef(null)
  useEffect(() => {
    console.log(ref)
  }, [])
  return (
    <div>
      <Hr margin="10px">type</Hr>
      <div style={{ width: 600 }}>
        <Alert ref={ref} type="success" showIcon>
          Success Text
        </Alert>
        <Alert
          ref={ref}
          type="success"
          description={`Success Description Success Description Success Description`}
          showIcon
        >
          Success Text
        </Alert>
      </div>

      <Hr margin="10px">showIcon</Hr>
      <div style={{ width: 600 }}>
        <Alert type="info" closeable showIcon>
          Info Text
        </Alert>
        <Alert
          type="info"
          description={`Success Description Success Description Success Description`}
          closeable
          showIcon
        >
          Info Text
        </Alert>
      </div>

      <Hr margin="10px">closeText</Hr>
      <div style={{ width: 600 }}>
        <Alert type="warning" showIcon closeText="close now">
          Warning Text
        </Alert>
        <Alert
          type="warning"
          description={`Warning Description Warning Description Warning Description Warning Description`}
          showIcon
          closeText="close now"
        >
          Warning Text
        </Alert>
      </div>

      <Hr margin="10px">action</Hr>
      <Alert
        type="error"
        showIcon
        action={
          <Button href="https://www.baidu.com" theme="link">
            操作
          </Button>
        }
      >
        Error Text
      </Alert>
      <Alert
        type="error"
        description={`Error Description Error Description Error Description Error Description`}
        showIcon
        action={
          <Button href="https://www.baidu.com" theme="link" size="small">
            操作
          </Button>
        }
      >
        Error Text
      </Alert>

      <Hr margin="10px">static Alert</Hr>
      <Button onClick={() => Alert.success(`我是新增的${new Date()}`)}>
        点击显示Alert
      </Button>
    </div>
  )
}

storiesOf('Alert', module).add('基础Alert', BasicAlert)
