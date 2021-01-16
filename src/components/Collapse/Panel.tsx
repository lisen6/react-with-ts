import React, { FC, useState, useEffect } from "react";
import classNames from "classnames";
import Icon from "../Icon/Icon";

export interface PanelProps {
  /** 面板头内容 */
  header?: string;
  /** 对应 activeKey */
  activeKey?: string;
  /** 是否展示当前面板上的箭头 */
  showArrow?: Boolean;
  className?: string;
  isActive?: boolean;
  /** 禁止状态 */
  disabled?: boolean;
  /** 自定义渲染每个面板右上角的内容 */
  extra?: React.ReactNode;
  onItemClick?: (val: string, e?: MouseEvent) => void;
  style?: React.CSSProperties;
}

const Panel: FC<PanelProps> = (props) => {
  const { header, activeKey, isActive: isOpened, showArrow = true, style, className, disabled, extra, onItemClick, children } = props;

  let [isActive, setIsActive] = useState(isOpened)



  const HeadClasses = classNames("Panel-head", {
    "is-disabled": disabled,
  });

  const ChildClasses = classNames("Panel-content", className, {
    "is-active": isActive,
  });

  const IconClasses = classNames("Panel-icon", {
    "is-active": isActive,
  });

  const handleClick = (e: MouseEvent) => {
    onItemClick?.(activeKey as string, e)
    !disabled && setIsActive(!isActive)
  }

  const renderIcon = () => {
    return showArrow && <Icon icon="chevron-left" className={IconClasses} size="1x" />
  }

  useEffect(() => {
    setIsActive(isOpened)
  }, [isOpened])


  return (
    <div className="collapse-item">
      <div onClick={(e: any) => handleClick(e)} className={HeadClasses}>
        {renderIcon()}
        {header}
        <div className="viking-collapse-extra">
          {extra}
        </div>
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
  disabled: false
};

export default Panel;
