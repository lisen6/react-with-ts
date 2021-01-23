import React from 'react'
import { storiesOf } from '@storybook/react'
// import { action } from "@storybook/addon-actions";

import Menu from './menu'
import SubMenu from './subMenu'
import MenuItem from './menuItem'

const verticalMenu = () => (
  <Menu
    defaultIndex="0"
    mode="vertical"
    defaultOpenSubMenus={[]}
    onSelect={(index: string) => console.log(index)}
  >
    <MenuItem>link1</MenuItem>
    <MenuItem disabled>link2</MenuItem>
    <SubMenu title="dropdown">
      <MenuItem>dropdown1</MenuItem>
      <MenuItem>dropdown2</MenuItem>
    </SubMenu>
    <MenuItem>link4</MenuItem>
  </Menu>
)

const horizontalMenu = () => (
  <Menu
    defaultIndex="0"
    mode="horizontal"
    defaultOpenSubMenus={[]}
    onSelect={(index: string) => console.log(index)}
  >
    <MenuItem>link1</MenuItem>
    <MenuItem disabled>link2</MenuItem>
    <SubMenu title="dropdown">
      <MenuItem>dropdown1</MenuItem>
      <MenuItem>dropdown2</MenuItem>
    </SubMenu>
    <MenuItem>link4</MenuItem>
  </Menu>
)

storiesOf('Menu', module)
  .add('横向Menu', horizontalMenu)
  .add('竖向Menu', verticalMenu)
