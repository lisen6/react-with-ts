import React from 'react'
import { render, cleanup } from '@testing-library/react'
import Button, { ButtonType } from './button'

afterEach(cleanup)

describe('test Button component', () => {
  // test || it
  test('should render the correct default button', () => {
    const wrapper = render(<Button>Nice</Button>)
    const element = wrapper.getByText('Nice')
    expect(element.tagName).toEqual('BUTTON')
    expect(element).toHaveClass('btn btn-default')
  })

  test('should render a link when btnType equals link and href is provided', () => {
    const wrapper = render(
      <Button href="www.baidu.com" btnType={ButtonType.Link}>
        Nice
      </Button>
    )
    const element = wrapper.getByText('Nice')
    expect(element.tagName).toEqual('A')
    expect(element).not.toBeDisabled()
    expect(element).toHaveAttribute('href')
  })
})
