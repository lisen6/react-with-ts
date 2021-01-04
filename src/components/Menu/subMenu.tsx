import React, { useContext, useState, FunctionComponentElement } from 'react';
import classNames from 'classnames';
import { MenuContext } from './menu';
import { MenuItemProps } from './menuItem';
import Icon from '../Icon/Icon';
import Transition from '../Transition/transition';

export interface SubMenuProps {
  /** 菜单项的索引。不能重复 */
  index?: string;
  /** 菜单项的名称 */
  title: string;
  className?: string;
}

const SubMenu: React.FC<SubMenuProps> = ({ index, title, children, className }) => {
  const context = useContext(MenuContext);

  const openedSubMenus = context.defaultOpenSubMenus as Array<string>;

  const isOpened = (index && context.mode === 'vertical') ? openedSubMenus.includes(index) : false;

  const [menuOpen, setOpen] = useState(isOpened);

  const classStyle = classNames('menu-item submenu-item', className, {
    'is-active': context.index === index,
    'is-opened': menuOpen,
    'is-vertical': context.mode === 'vertical'
  });

  const handleClick = (e: React.MouseEvent) => {
    e.preventDefault();
    setOpen(!menuOpen);
  };

  let timer: any;
  const handleMouse = (e: React.MouseEvent, toggle: boolean) => {
    clearTimeout(timer);
    e.preventDefault();
    timer = setTimeout(() => {
      setOpen(toggle);
    }, 300);
  };

  // 纵向 点击
  const clickEvents = context.mode === 'vertical' ? {
    onClick: handleClick
  } : {};

  // 横向 移入移出
  const hoverEvents = context.mode !== 'vertical' ? {
    onMouseEnter: (e: React.MouseEvent) => {
      handleMouse(e, true);
    },
    onMouseLeave: (e: React.MouseEvent) => {
      handleMouse(e, false);
    }
  } : {};

  const renderChildren = () => {
    const subMenuClasses = classNames('menu-submenu', {
      'menu-opened': menuOpen
    });
    const childComponent = React.Children.map(children, (child, i) => {
      const childElement: any = child
      if (childElement.type.displayName === 'MenuItem') {
        return React.cloneElement(childElement, {
          index: `${index}-${i}`
        });
      } else {
        console.error('Warning: Menu has a child which is not a MenuItem component');
      }
    });
    return (
      <Transition in={menuOpen}
        timeout={300}
        animation={'zoom-in-top'}>
        <ul className={subMenuClasses}>{childComponent}</ul>
      </Transition>
    );
  };

  return (
    <li key={index} className={classStyle} {...hoverEvents}>
      <div className="submenu-title" {...clickEvents}>
        {title}
        <Icon icon="angle-down" className="arrow-icon" />
      </div>
      {renderChildren()}
    </li>
  );
};

SubMenu.displayName = 'SubMenu';

export default SubMenu;