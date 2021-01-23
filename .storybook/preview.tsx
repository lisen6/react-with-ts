import React from 'react'
import '../src/styles/index.scss'
import { addDecorator, addParameters, configure } from '@storybook/react'
import { withInfo } from '@storybook/addon-info'

export const parameters = {
  actions: { argTypesRegex: '^on[A-Z].*' }
}

// 全局插件配置
const wrapperStyle = {
  padding: '20px 40px'
}

const storyWrapper = (storyFn) => <div style={wrapperStyle}>{storyFn()}</div>

addDecorator(storyWrapper)
addDecorator(withInfo as any)
addParameters({ info: { inline: true, header: false } })

const loaderFn = () => {
  const allExports = [require('../src/welcome.stories.tsx')]
  const req = require.context('../src/components', true, /\.stories\.tsx$/)
  req.keys().forEach((fname) => allExports.push(req(fname)))
  return allExports
}

configure(loaderFn, module)
