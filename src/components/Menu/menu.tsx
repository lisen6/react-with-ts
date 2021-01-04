import React, { useState, createContext } from 'react';
import ClassNames from 'classnames';
import { MenuItemProps } from './menuItem';

type MenuMode = 'horizontal' | 'vertical';
type SelectCallback = (selectedIndex: string) => void;

export interface MenuProps {
  /** 默认选中的菜单项 */
  defaultIndex?: string;
  /** 横向 || 竖向 */
  mode?: MenuMode;
  className?: string;
  style?: React.CSSProperties;
  /** 选中之后的回调函数 */
  onSelect?: SelectCallback;
  /** 默认展开的菜单项 */
  defaultOpenSubMenus: string[]
}

interface IMenuContent {
  index: string;
  onSelect?: SelectCallback;
  mode?: MenuMode;
  defaultOpenSubMenus?: string[];
}

export const MenuContext = createContext<IMenuContent>({ index: '0' });

const Menu: React.FC<MenuProps> = (props) => {

  const { className, mode, style, children, defaultIndex, onSelect, defaultOpenSubMenus } = props;

  const [currentIndex, setIndex] = useState(defaultIndex);

  const classStyle = ClassNames('menu', className, {
    'menu-vertical': mode === 'vertical',
    'menu-horizontal': mode !== 'vertical',
  });

  const handleClick = (index: string) => {
    setIndex(index);
    if (onSelect) onSelect(index);
  };

  const passedContext: IMenuContent = {
    index: currentIndex ? currentIndex : '0',
    onSelect: handleClick,
    mode,
    defaultOpenSubMenus,
  };

  const renderChildren = () => {
    return React.Children.map(children, (child, index) => {
      const childElement = child as React.FunctionComponentElement<MenuItemProps>;
      const { displayName } = childElement.type;
      if (displayName === 'MenuItem' || displayName === 'SubMenu') {
        return React.cloneElement(childElement, { index: index.toString() });
      } else {
        console.error('Warning: Menu has a child which is not a MenuItem component');
      }
    });
  };

  return (
    <ul className={classStyle} style={style} data-testid="test-menu">
      <MenuContext.Provider value={passedContext}>{renderChildren()}</MenuContext.Provider>
    </ul>
  );
};

Menu.defaultProps = {
  defaultIndex: '0',
  mode: 'horizontal',
  defaultOpenSubMenus: [],
};

export default Menu;