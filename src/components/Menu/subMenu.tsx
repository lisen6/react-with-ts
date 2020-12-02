import React, { useContext, useState } from "react";
import classNames from "classnames";
import { MenuContext } from './menu'


export interface SubMenuProps {
  index?: number;
  title: string;
  className?: string
}

const SubMenu: React.FC<SubMenuProps> = (props) => {
  const { index, title, className, children } = props;
  const context = useContext(MenuContext);

  const [menuOpen, setMenuOpen] = useState(false)
  const classes = classNames('menu-item', classNames, {
    'is-active': context.index === index
  })
  const handleClick = (e: React.MouseEvent) => {
    e.preventDefault()
    setMenuOpen(!menuOpen)
  }

  let timer: any;
  const handleMouse = (e: React.MouseEvent, toggle: boolean) => {
    clearTimeout(timer)
    e.preventDefault()
    timer = setTimeout(() => {
      setMenuOpen(toggle)
    }, 300)
  }

  const clickEvents = context.mode === 'vertical' ? {
    onClick: handleClick
  } : {}

  const hoverEvents = context.mode !== 'vertical' ? {
    onMouseEnter: (e: React.MouseEvent) => { handleMouse(e, true) },
    onMouseLeave: (e: React.MouseEvent) => { handleMouse(e, false) }
  } : {}
  const renderChildren = () => {
    const subMenuClasses = classNames('submenu', {
      'menu-opened': menuOpen
    })
    const childComponent = React.Children.map(children, (child: any, index) => {
      // const childElement = child as React.FunctionComponentElement<MenuItemProps>
      const childElement = child
      const { displayName } = childElement.type;
      if (displayName === 'MenuItem') {
        return childElement
      } else {
        console.error('Warning: SubMenu has a child which is not MenuItem')
      }
    })
    return (
      <ul className={subMenuClasses}>
        {childComponent}
      </ul>
    )
  }

  return (
    <li key={index} className={classes} {...hoverEvents}>
      <div className="submenu-title" {...clickEvents}>
        {title}
      </div>
      {renderChildren()}
    </li>
  )
}

SubMenu.displayName = 'SubMenu'
export default SubMenu