import React, { useContext, useRef, useEffect } from "react";
import classNames from "classnames";
import Icon from "../Icon/Icon";
import { CollapseContext } from "./Collapse";

export interface PanelProps {
  /** 头部标题 */
  header?: string;
  /** 默认展开索引 */
  index?: string;
  /** 是否显示箭头图标 */
  showArrow?: Boolean;
  className?: string;
  style?: React.CSSProperties;
}

export const Panel: React.FC<PanelProps> = (props) => {
  const { header, index, showArrow, children, style, className } = props;

  const context = useContext(CollapseContext);

  const { value, setValue, accordion, collapsible } = context;

  // 判断是否处于打开模式
  // 手风琴模式下传了 0个参数 || N个参数。只判断第一个
  const isOpened = index
    ? accordion
      ? value[0] === index
      : value.includes(index)
    : false;

  const handleClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (collapsible === "disabled") return

    // 手风琴模式
    if (accordion) {
      isOpened ? setValue([]) : setValue([index]);
    } else {
      // 非手风琴模式
      if (isOpened) {
        setValue(value.filter((item) => item !== index));
      } else {
        setValue([...value, index]);
      }
    }
  };

  const HeadClasses = classNames("Panel-head", {
    "is-disabled": collapsible,
  });

  const ChildClasses = classNames("Panel-content", className, {
    "is-active": isOpened,
  });

  const IconClasses = classNames("Panel-icon", {
    "is-active": isOpened,
  });

  useEffect(() => {
    context.onChange?.(value);
  }, [value]);

  return (
    <div className="collapse-item">
      <div onClick={handleClick} className={HeadClasses}>
        {showArrow && <Icon icon="chevron-left" className={IconClasses} size="1x" />}
        {header}
      </div>

      <div className={ChildClasses} style={style}>
        <span className={`Panel-text`}>
          {children}
        </span>
      </div>
    </div>
  );
};

Panel.displayName = "Panel";
Panel.defaultProps = {
  showArrow: true,
};

export default Panel;
