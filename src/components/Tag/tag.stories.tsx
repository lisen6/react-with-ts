import React from 'react'
import { storiesOf } from '@storybook/react'

import Tag from './Tag1'
import Hr from '../Hr/Hr'
import girl from '../../assets/image/girl.jpg'

const BasicTag = () => {
  return (
    <>
      <Hr>属性标签</Hr>
      <Tag>基础标签</Tag>
      <Tag size="large">基础标签</Tag>
      <Tag size="small">基础标签</Tag>
    </>
  )
}

storiesOf('Tag', module).add('基础Tag', BasicTag)
