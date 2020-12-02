import React, { createContext, useState } from "react";
import classNames from "classnames";
import { MenuItemProps } from './menuItem'

type MenuMode = "horizontal" | "vertical";
type SelectCallback = (selectedIndex: number) => void;

export interface MenuProps {
  defaultIndex?: number;
  mode?: MenuMode;
  className?: string;
  style?: React.CSSProperties;
  onSelect?: SelectCallback;
}

interface IMenuContext {
  index: number;
  onSelect?: SelectCallback;
  mode?: MenuMode
}

export const MenuContext = createContext<IMenuContext>({ index: 0 });

const Menu: React.FC<MenuProps> = (props) => {
  const { defaultIndex, mode, className, style, children, onSelect } = props;
  const classes = classNames("menu", className, {
    "menu-vertical": mode === "vertical",
    "menu-horizontal": mode !== "vertical",
  });
  const [currentActive, setCurrentActive] = useState(defaultIndex);

  const handleClick = (index = 0) => {
    setCurrentActive(index);
    if (onSelect) {
      onSelect(index);
    }
  };
  const passedContext: IMenuContext = {
    index: currentActive ? currentActive : 0,
    onSelect: handleClick,
    mode: mode
  };

  const renderChild = () => {
    return React.Children.map(children, (child: any, index: number) => {
      // const childElement = child as React.FunctionComponentElement<MenuItemProps>
      const childElement = child
      const { displayName } = childElement.type;
      if (displayName === 'MenuItem' || displayName === 'SubMenu') {
        return React.cloneElement(childElement, {
          index
        })
      } else {
        console.error('Warning: Menu has a child which is not MenuItem')
      }
    })
  }

  return (
    <ul className={classes} style={style} data-testid="test-menu">
      <MenuContext.Provider value={passedContext}>
        {renderChild()}
      </MenuContext.Provider>
    </ul>
  );
};

Menu.defaultProps = {
  defaultIndex: 0,
  mode: "horizontal",
};

export default Menu;
