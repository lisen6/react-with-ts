import React, { useContext, useState, useRef, useEffect } from "react";
import classNames from "classnames";

import { CollapseContext } from "./Collapse";

export interface PanelProps {
  header?: string;
  index?: string;
  showArrow?: Boolean;
  className?: string;
  style?: React.CSSProperties;
}

const Panel: React.FC<PanelProps> = (props) => {
  const { header, index, showArrow, children, style, className } = props;

  const outLayerRef = useRef(null);
  const innerLayerRef = useRef(null);

  const context = useContext(CollapseContext);

  const { defaultActiveKey, accordion, collapsible } = context;

  const isOpened = index ? defaultActiveKey.includes(index) : false;
  const [panelOpen, setPanelOpen] = useState(isOpened);

  const handleClick = (e: React.MouseEvent) => {
    if (collapsible === "disabled") {
      e.preventDefault();
      return;
    }
    e.stopPropagation();
    setPanelOpen(!panelOpen);

    if (index && isOpened && defaultActiveKey) {
      context.defaultActiveKey = context.defaultActiveKey.filter(
        (item) => item !== index
      );
    } else {
      index && context.defaultActiveKey.push(index);
    }

    if (
      context.onChange &&
      typeof index === "string" &&
      context.defaultActiveKey &&
      !collapsible
    ) {
      context.onChange(
        context.defaultActiveKey.sort((a, b) => parseInt(a) - parseInt(b))
      );
    }
  };

  const HeadClasses = classNames("Panel-head", {
    "is-disabled": collapsible,
  });

  const ChildClasses = classNames("Panel-content", className, {
    "is-active": panelOpen,
  });

  const IconClasses = classNames("Panel-icon", {
    "is-active": panelOpen,
  });

  useEffect(() => {
    const childElement: any = innerLayerRef.current;
    const parentElement: any = outLayerRef.current;
    if (childElement.getBoundingClientRect().height > 300) {
      parentElement.style.maxHeight = isOpened
        ? childElement.getBoundingClientRect().height + "px"
        : 0;
    }
  }, [isOpened]);

  return (
    <div className="collapse-item">
      <div onClick={handleClick} className={HeadClasses}>
        {/* {showArrow && <I size={"14px"} className={IconClasses} icon={Down} />} */}
        {header}
      </div>

      <div ref={outLayerRef} className={ChildClasses} style={style}>
        <span ref={innerLayerRef}>{children}</span>
      </div>
    </div>
  );
};

Panel.displayName = "Panel";
Panel.defaultProps = {
  showArrow: true,
};

export default Panel;
