import React from 'react'
import { storiesOf } from '@storybook/react'

import DatePicker from './DatePicker1'

const Basic = () => {
  return <DatePicker />
}

storiesOf('DatePicker', module).add('Basic', Basic)
