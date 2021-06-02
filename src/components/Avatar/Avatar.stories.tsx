import React from 'react'
import { storiesOf } from '@storybook/react'

import Avatar from './Avatar'
import Hr from '../Hr/Hr'
import girl from '../../assets/image/girl.jpg'

const BasicAvatar = () => {
  return (
    <>
      <Avatar image={girl} />
      <br />
      <Avatar kind="square" image={girl} />
    </>
  )
}

const DiffSizeAvatar = () => {
  return (
    <>
      <Hr>kind=circle</Hr>
      <Avatar size="large" image={girl} />
      <br />
      <Avatar size="normal" image={girl} />
      <br />
      <Avatar size="small" image={girl} />
      <br />

      <Hr>kind=square</Hr>
      <Avatar kind="square" size="large" image={girl} />
      <br />
      <Avatar kind="square" size="normal" image={girl} />
      <br />
      <Avatar kind="square" size="small" image={girl} />
      <br />
    </>
  )
}

storiesOf('Avatar', module)
  .add('默认的头像', BasicAvatar)
  .add('不同大小的头像', DiffSizeAvatar)
