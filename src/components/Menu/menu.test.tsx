import React from 'react'
import { cleanup, fireEvent, render, RenderResult, waitFor } from '@testing-library/react'
import Menu, { MenuProps } from './menu'
import SubMenu from './subMenu'
import MenuItem from './menuItem'


const testProps: MenuProps = {
  defaultIndex: '0',
  onSelect: jest.fn(),
  className: 'test',
  defaultOpenSubMenus: []
}

const testVerProps: MenuProps = {
  defaultIndex: '0',
  mode: 'vertical',
  defaultOpenSubMenus: []
}

const generateMenu = (props: MenuProps) => {
  return (
    <Menu
      {...props}
    >
      <MenuItem>active</MenuItem>
      <MenuItem disabled>disabled</MenuItem>
      <MenuItem>xyz</MenuItem>
      <SubMenu title="dropdown">
        <MenuItem>drop1</MenuItem>
      </SubMenu>
    </Menu>
  )
}

const createStyleFile = () => {
  const fileStyle: string = `
    .submenu {
      display: none
    }
    .menu-opened {
      display: block
    }
  `
  const style = document.createElement('style')
  style.innerHTML = fileStyle
  return style
}

let wrapper: RenderResult, menuElement: HTMLElement, actvieElement: HTMLElement, disabledElement: HTMLElement
describe('test Menu and MenuItem component', () => {
  it('should render correct Menu and MenuItem based on default props', () => {
    wrapper = render(generateMenu(testProps));
    menuElement = wrapper.getByTestId('test-menu')
    actvieElement = wrapper.getByText('active')
    disabledElement = wrapper.getByText('disabled')

    expect(menuElement).toBeInTheDocument()
    expect(menuElement).toHaveClass('menu')
    // expect(menuElement.getElementsByTagName('li').length).toEqual(3)

    expect(menuElement.querySelectorAll(":scope > li").length).toEqual(4)
    expect(actvieElement).toHaveClass('menu-item is-active')
    expect(disabledElement).toHaveClass('menu-item is-disabled')
  })

  it('click items should change active and call the right callback', () => {
    wrapper = render(generateMenu(testProps));
    menuElement = wrapper.getByTestId('test-menu')
    actvieElement = wrapper.getByText('active')
    disabledElement = wrapper.getByText('disabled')

    expect(menuElement).toBeInTheDocument()
    const thirdItem = wrapper.getByText('xyz')
    fireEvent.click(thirdItem)
    expect(thirdItem).toHaveClass('is-active')
    expect(actvieElement).not.toHaveClass('is-active')
    expect(testProps.onSelect).toHaveBeenCalledWith('2')
    // fireEvent.click(disabledElement)
    // expect(disabledElement).not.toHaveClass('is-active')
    // expect(testProps.onSelect).toHaveBeenCalledWith(1)
  })

  it('should render vertical mode when mode is set to vertical', async () => {
    wrapper = render(generateMenu(testVerProps));
    menuElement = wrapper.getByTestId('test-menu')
    actvieElement = wrapper.getByText('active')
    disabledElement = wrapper.getByText('disabled')

    expect(menuElement).toHaveClass('menu-vertical')
  })

  // it('should show dropdown items when hover on SubMenu', () => {
  //   wrapper = render(generateMenu(testVerProps));
  //   wrapper.container.append(createStyleFile())

  //   expect(wrapper.queryByText('drop1')).not.toBeVisible()
  //   const dropDownvayneElement = wrapper.getByText('dropdown')

  //   fireEvent.mouseEnter(dropDownElement)
  //   waitFor(() => {
  //     expect(wrapper.queryByText('drop1')).toBeVisible()
  //   }, { timeout: 1000 })

  //   fireEvent.click(wrapper.getByText('drop1'))
  //   expect(testProps.onSelect).toHaveBeenLastCalledWith('3-0')
  // })
})