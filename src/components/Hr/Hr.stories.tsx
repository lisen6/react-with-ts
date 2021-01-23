import React from 'react'
import { storiesOf } from '@storybook/react'

import Hr from './Hr'

const BasicHr = () => {
  return (
    <>
      <Hr>提示文字</Hr>
      <Hr textLeft="30px">提示文字</Hr>
      <Hr textRight="50px">提示文字</Hr>
    </>
  )
}

storiesOf('Hr', module).add('基础用法', BasicHr)
