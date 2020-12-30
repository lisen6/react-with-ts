import React, { useContext, useRef, useEffect, useCallback } from "react";
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

  const outLayerRef = useRef<HTMLDivElement>(null);

  const innerLayerRef = useRef<HTMLSpanElement>(null);

  // 判断是否处于打开模式
  // 手风琴模式下传了 0个参数 || N个参数。只判断第一个
  const isOpened = index
    ? accordion
      ? value[0] === index
      : value.includes(index)
    : false;

  const handleClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (collapsible === "disabled") {
      e.preventDefault();
      return;
    }
    e.stopPropagation();

    // 手风琴模式
    if (accordion) {
      isOpened ? setValue([]) : setValue([index]);
      return;
    }

    // 判断是否已经展开
    if (isOpened) {
      setValue(value.filter((item) => item !== index));
    } else {
      index && setValue([...value, index]);
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

  const ContentClasses = classNames("Panel-text");

  // const recalculateHeight = useCallback(() => {
  //   const childElement = innerLayerRef.current;
  //   const parentElement = outLayerRef.current;
  //   if (childElement && parentElement) {
  //     parentElement.style.height = isOpened
  //       ? childElement?.getBoundingClientRect().height + "px"
  //       : "0";
  //   }
  // }, [isOpened, innerLayerRef.current, outLayerRef.current]);

  useEffect(() => {
    context.onChange?.(
      value.sort((a: string, b: string) => parseInt(a) - parseInt(b))
    );
  }, [value]);

  // useEffect(() => {
  //   // recalculateHeight();
  // }, [recalculateHeight]);

  return (
    <div className="collapse-item">
      <div onClick={handleClick} className={HeadClasses}>
        {showArrow && <Icon icon="chevron-left" className={IconClasses} />}
        {header}
      </div>

      <div ref={outLayerRef} className={ChildClasses} style={style}>
        <span className={ContentClasses} ref={innerLayerRef}>
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
