import React, { useState, useRef, useEffect } from 'react'
import { storiesOf } from '@storybook/react'

import Alert from './Alert'
import Button from '../Button/button'

const BasicAlert = () => {

  const [visible, setVisible] = useState(true)
  const ref = useRef(null)
  useEffect(() => {
    console.log(ref)
  }, [])
  return <div style={{ width: 600 }}>
    <Alert ref={ref} type="success" description={`Success Description Success Description Success Description`} >
      Success Text
    </Alert>
    {
      visible && <Alert type="info" description={`Info Description Info Description Info Description Info Description`} closeable onClose={setVisible}>Success Text</Alert>
    }
    <Alert type="warning" description={`Warning Description Warning Description Warning Description Warning Description`}>Warning Text</Alert>
    <Alert type="error" description={`Error Description Error Description Error Description Error Description`}>Error Text</Alert>
    <Button size="sm" onClick={() => setVisible(!visible)}>{visible ? '隐藏' : '显示'}</Button>
  </div>
}

storiesOf('Alert Component', module).add('基础Alert', BasicAlert)