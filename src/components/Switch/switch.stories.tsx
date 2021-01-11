import React from "react";
import { storiesOf } from "@storybook/react";
import Switch from './switch2'

const Basic = () => {
  return <Switch />
}

const DisabledSwitch = () => {
  return <Switch disabled={true} />
}

const CustomActiveColor = () => {
  return <Switch activeColor="#E6A23C" inactiveColor="#F56C6C" />
}

storiesOf('Switch Component', module).add('基础Switch', Basic).add('禁用状态Switch', DisabledSwitch).add('自定义颜色', CustomActiveColor)