import React, { useContext, useState } from "react";
import classNames from "classnames";
import { MenuContext } from "./menu";
import Icon from "../Icon/Icon";

export interface SubMenuProps {
  /** 菜单项的索引。不能重复 */
  index?: string;
  /** 菜单项的名称 */
  title: string;
  className?: string;
}

const SubMenu: React.FC<SubMenuProps> = (props) => {
  const { index, title, className, children } = props;
  const context = useContext(MenuContext);
  const openedSubMenus = context.defaultOpenSubMenus;
  const isOpened =
    index && context.mode === "vertical"
      ? openedSubMenus.includes(index)
      : false;
  const [menuOpen, setMenuOpen] = useState(isOpened);
  const classes = classNames("submenu-item", classNames, {
    "is-active": context.index === index,
    "is-opened": menuOpen,
    "is-vertical": context.mode === "vertical",
  });
  const handleClick = (e: React.MouseEvent) => {
    e.preventDefault();
    setMenuOpen(!menuOpen);
  };

  let timer: any;
  const handleMouse = (e: React.MouseEvent, toggle: boolean) => {
    clearTimeout(timer);
    e.preventDefault();
    timer = setTimeout(() => {
      setMenuOpen(toggle);
    }, 300);
  };

  const clickEvents =
    context.mode === "vertical"
      ? {
        onClick: handleClick,
      }
      : {};

  const hoverEvents =
    context.mode !== "vertical"
      ? {
        onMouseEnter: (e: React.MouseEvent) => {
          handleMouse(e, true);
        },
        onMouseLeave: (e: React.MouseEvent) => {
          handleMouse(e, false);
        },
      }
      : {};
  const renderChildren = () => {
    const subMenuClasses = classNames("submenu", {
      "menu-opened": menuOpen,
    });
    const childComponent = React.Children.map(children, (child: any, i) => {
      // const childElement = child as React.FunctionComponentElement<MenuItemProps>
      const childElement = child;
      const { displayName } = childElement.type;
      if (displayName === "MenuItem") {
        return React.cloneElement(childElement, {
          index: `${index}-${i}`,
        });
      } else {
        console.error("Warning: SubMenu has a child which is not MenuItem");
      }
    });
    return (
      // <Transition
      //   in={menuOpen}
      //   animation="zoom-in-bottom"
      //   timeout={300}
      // >
      <ul className={subMenuClasses}>{childComponent}</ul>
    );
  };

  return (
    <li key={index} className={classes} {...hoverEvents}>
      <div className="submenu-title" {...clickEvents}>
        {title}
        <Icon icon="angle-down" className="arrow-icon" />
      </div>
      {renderChildren()}
    </li>
  );
};

SubMenu.displayName = "SubMenu";
export default SubMenu;
