import React, { FC, useState, useEffect, MouseEvent, useCallback } from "react";
import classnames from "classnames";

type SwitchSize = "default" | "small";

export interface SwitchProps {
  /** 是否禁用 */
  disabled?: boolean;
  /** switch尺寸 */
  size?: SwitchSize;
  /** 是否默认选中 */
  defaultChecked?: boolean;
  /** switch 打开时的背景色 */
  activeColor?: string;
  /** switch 关闭时的背景色 */
  inactiveColor?: string;
  /** 是否选中 */
  checked?: boolean;
  /** switch 状态发生变化时的回调函数 */
  onChange?: (isTrue: boolean) => void;
}

export const Switch: FC<SwitchProps> = (props) => {
  const {
    disabled,
    size,
    activeColor,
    inactiveColor,
    defaultChecked,
    checked,
    onChange,
  } = props;

  const propsValue = defaultChecked ? !!defaultChecked : !!checked;

  const [value, setValue] = useState(propsValue);

  const classes = classnames("viking-switch", {
    "is-checked": value,
    "is-disabled": disabled,
    [`viking-switch-${size}`]: size === "small",
  });

  const handleClick = useCallback(
    (e: MouseEvent<HTMLElement>) => {
      setValue(!value);
    },
    [value]
  );

  const styleComputed = () => {
    if (!disabled) {
      return !!value
        ? { backgroundColor: activeColor }
        : { backgroundColor: inactiveColor };
    }
    return !!value
      ? { backgroundColor: activeColor, opacity: 0.5 }
      : { backgroundColor: inactiveColor, opacity: 0.5 };
  };

  useEffect(() => {
    onChange?.(value);
  }, [onChange, value]);

  return (
    <div className={classes}>
      <input
        type="checkbox"
        disabled={!!disabled}
        checked={!!value}
        onChange={() => !disabled && onChange?.(!value)}
        onClick={handleClick}
        className="viking-switch__input"
      />
      <span style={styleComputed()} className="viking-switch__core" />
    </div>
  );
};

Switch.displayName = "Switch";

export default Switch;
