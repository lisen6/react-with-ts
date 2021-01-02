import React from 'react'
import { storiesOf } from '@storybook/react'

storiesOf("welcome page", module)
  .add('welcome', () => {
    return (
      <>hello world</>
    )
  }, { info: { disabled: true } })