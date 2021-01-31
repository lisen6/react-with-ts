import React from 'react'
import { storiesOf } from '@storybook/react'

import Tag from './Tag'
import Hr from '../Hr/Hr'
import girl from '../../assets/image/girl.jpg'

const BasicTag = () => {
  return (
    <>
      <Hr>属性标签</Hr>
      <Tag>基础标签</Tag>
      <Tag size="large">基础标签</Tag>
      <Tag size="small">基础标签</Tag>

      <Hr>弱状态</Hr>
      <Tag weak>基础标签</Tag>
      <Tag weak size="large">
        基础标签
      </Tag>
      <Tag weak size="small">
        基础标签
      </Tag>

      <Hr>颜色标签</Hr>
      <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center' }}>
        <Tag theme="blue" onClick={() => {}}>
          标签内容
        </Tag>
        <Tag theme="gray" onClick={() => {}}>
          标签内容
        </Tag>
        <Tag theme="wathet" onClick={() => {}}>
          标签内容
        </Tag>
        <Tag theme="turquoise" onClick={() => {}}>
          标签内容
        </Tag>
        <Tag theme="green" onClick={() => {}}>
          标签内容
        </Tag>
        <Tag theme="lime" onClick={() => {}}>
          标签内容
        </Tag>
        <Tag theme="yellow" onClick={() => {}}>
          标签内容
        </Tag>
        <Tag theme="orange" onClick={() => {}}>
          标签内容
        </Tag>
        <Tag theme="red" onClick={() => {}}>
          标签内容
        </Tag>
        <Tag theme="carmine" onClick={() => {}}>
          标签内容
        </Tag>
        <Tag theme="violet" onClick={() => {}}>
          标签内容
        </Tag>
        <Tag theme="purple" onClick={() => {}}>
          标签内容
        </Tag>
        <Tag theme="indigo" onClick={() => {}}>
          标签内容
        </Tag>
      </div>

      <Hr>可点击</Hr>
      <Tag weak onClick={() => console.log('我被点击了')}>
        基础标签
      </Tag>
      <Tag kind="round" onClick={() => console.log('我被点击了')}>
        基础标签
      </Tag>

      <Hr>可关闭</Hr>
      <Tag weak closable onClose={() => console.log('我被关闭了')}>
        基础标签
      </Tag>
      <Tag
        kind="round"
        closable
        onClose={(val) => console.log(val, '我被关闭了')}
      >
        基础标签
      </Tag>

      <Hr>头像标签</Hr>
      <Tag weak avatar={girl} onClick={() => console.log('我被点击了')}>
        基础标签
      </Tag>
      <Tag kind="round" onClick={() => console.log('我被点击了')}>
        基础标签
      </Tag>
    </>
  )
}

storiesOf('Tag', module).add('基础Tag', BasicTag)
