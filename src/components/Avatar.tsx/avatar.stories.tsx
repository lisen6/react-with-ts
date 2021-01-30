import React from 'react'
import { storiesOf } from '@storybook/react'

import Avatar from './avatar'

const BasicAvatar = () => {
  return <Avatar />
}

storiesOf('Avatar', module).add('Basic', BasicAvatar)
