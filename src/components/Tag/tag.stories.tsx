import React from 'react'
import { storiesOf } from '@storybook/react'

import Tag from './tag'

const BasicTag = () => {
  return <Tag />
}

storiesOf('Tag', module).add('Basic', BasicTag)
