import React, { useRef, useEffect } from 'react'
import { storiesOf } from '@storybook/react'

import Alert from './Alert'
import Button from '../Button/button'

const BasicAlert = () => {
  const ref = useRef(null)
  useEffect(() => {
    console.log(ref)
  }, [])
  return <div style={{ width: 600 }}>
    <Alert ref={ref} type="success" showIcon>
      Success Text
    </Alert>
    <Alert ref={ref} type="success" description={`Success Description Success Description Success Description`} showIcon>
      Success Text
    </Alert>

    <Alert type="info" closeable showIcon>Info Text</Alert>
    <Alert type="info" description={`Success Description Success Description Success Description`} closeable showIcon>Info Text</Alert>

    <Alert type="warning" showIcon closeText="close now">Warning Text</Alert>
    <Alert type="warning" description={`Warning Description Warning Description Warning Description Warning Description`} showIcon closeText="close now">Warning Text</Alert>

    <Alert type="error" showIcon action={
      <Button href="https://www.baidu.com" btnType="link" size="sm">
        操作
      </Button>
    }>Error Text</Alert>
    <Alert type="error" description={`Error Description Error Description Error Description Error Description`} showIcon action={
      <Button href="https://www.baidu.com" btnType="link" size="sm">
        操作
      </Button>
    }>Error Text</Alert>
  </div>
}

storiesOf('Alert Component', module).add('基础Alert', BasicAlert)