import React, { useContext, useState, useRef, useEffect, useCallback } from "react";
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

  const outLayerRef = useRef<HTMLDivElement>(null);

  const innerLayerRef = useRef<HTMLSpanElement>(null);

  const context = useContext(CollapseContext);

  const { defaultActiveKey, accordion, collapsible } = context;

  const [value, setValue] = useState(typeof defaultActiveKey === 'undefined' ? [] : defaultActiveKey)

  const isOpened = index ? value.includes(index) : false;

  const [panelOpen, setPanelOpen] = useState(isOpened);

  const handleClick = useCallback((e: React.MouseEvent) => {
    if (collapsible === "disabled") {
      e.preventDefault();
      return;
    }
    e.stopPropagation();
    setPanelOpen(!panelOpen);

    if (index && value.includes(index)) {
      console.log(value.filter(
        (item) => item !== index
      ))
      setValue(value.filter(
        (item) => item !== index
      ))
    } else {
      index && setValue(value.concat(index));
    }

    console.log(value)
    context.onChange?.(
      value.sort((a, b) => parseInt(a) - parseInt(b))
    );
  }, [value]);

  const HeadClasses = classNames("Panel-head", {
    "is-disabled": collapsible,
  });

  const ChildClasses = classNames("Panel-content", className, {
    "is-active": panelOpen,
  });

  const IconClasses = classNames("Panel-icon", {
    "is-active": panelOpen,
  });

  const ContentClasses = classNames("Panel-text");

  useEffect(() => {
    const childElement = innerLayerRef.current;
    const parentElement = outLayerRef.current;
    if (childElement
      && childElement.getBoundingClientRect().height > 300
      && parentElement) {
      parentElement.style.maxHeight = isOpened
        ? childElement?.getBoundingClientRect().height + "px"
        : '0';
    }
  }, [isOpened]);

  return (
    <div className="collapse-item">
      <div onClick={handleClick} className={HeadClasses}>
        {/* {showArrow && <I size={"14px"} className={IconClasses} icon={Down} />} */}
        {/* {showArrow && <Icon icon="sort-down" className={IconClasses} size="2x" />} */}
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
