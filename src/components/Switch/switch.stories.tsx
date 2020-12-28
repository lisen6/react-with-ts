import React from "react";
import { storiesOf } from "@storybook/react";
import { action } from "@storybook/addon-actions";

import Switch from './switch'

const simpleSwitch = () => {
  return <Switch />
}

storiesOf("Switch component", module)
  .add('基础Switch', simpleSwitch)