import React from 'react'
import { storiesOf } from '@storybook/react'

import Tree from './tree'

const Tree = () => {
  return (
    <>
      <Tree />
    </>
  )
}

storiesOf('Tree', module).add('基础Tree', Tree)
