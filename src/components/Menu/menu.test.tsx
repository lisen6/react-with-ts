import React from 'react'
import { cleanup, fireEvent, render, RenderResult } from '@testing-library/react'
import Menu, { MenuProps } from './menu'
import MenuItem from './menuItem'


const testProps: MenuProps = {
  defaultIndex: 0,
  onSelect: jest.fn(),
  className: 'test'
}

const testVerProps: MenuProps = {
  defaultIndex: 0,
  mode: 'vertical'
}

const generateMenu = (props: MenuProps) => {
  return (
    <Menu
      {...props}
    >
      <MenuItem>active</MenuItem>
      <MenuItem disabled>disabled</MenuItem>
      <MenuItem>xyz</MenuItem>
    </Menu>
  )
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
    expect(menuElement.getElementsByTagName('li').length).toEqual(3)
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
    expect(testProps.onSelect).toHaveBeenCalledWith(2)
    // fireEvent.click(disabledElement)
    // expect(disabledElement).not.toHaveClass('is-active')
    // expect(testProps.onSelect).toHaveBeenCalledWith(1)
  })

  it('should render vertical mode when mode is set to vertical', () => {
    wrapper = render(generateMenu(testVerProps));
    menuElement = wrapper.getByTestId('test-menu')
    actvieElement = wrapper.getByText('active')
    disabledElement = wrapper.getByText('disabled')

    expect(menuElement).toHaveClass('menu-vertical')
  })
})