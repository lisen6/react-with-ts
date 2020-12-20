import React, {
  useState,
  FC,
  ReactElement,
  InputHTMLAttributes,
  ChangeEvent,
} from "react";
import { IconProp } from "@fortawesome/fontawesome-svg-core";
import classNames from "classnames";
import Icon from "../Icon/Icon";

type InputSize = "lg" | "sm";

export interface InputProps
  extends Omit<
    React.InputHTMLAttributes<HTMLInputElement>,
    "size" | "prefix" | "suffix" | "onChange"
  > {
  /** 是否可禁用 */
  disabled?: boolean;
  /** 输入框大小 */
  size?: InputSize;
  /** 输入框前置元素 */
  addonBefore?: string | ReactElement;
  /** 输入框后置元素 */
  addonAfter?: string | ReactElement;
  /** 是否支持可清空 */
  clearable?: boolean;
  /** 是否支持显示密码 */
  showPassword?: boolean;
  /** 输入框首部图标 */
  suffix?: IconProp;
  /** 输入框尾部图标 */
  prefix?: IconProp;
  value?: string;
  onChange?: (value: string, e?: ChangeEvent<HTMLInputElement>) => void;
}

export const Input: FC<InputProps> = (props) => {
  const {
    disabled,
    size,
    addonBefore,
    addonAfter,
    value: propsValue,
    onChange,
    suffix,
    prefix,
    clearable,
    showPassword,
    style,
    ...restProps
  } = props;

  // 用于控制显示是否显示密码框
  const [passwordVisible, setPasswordVisible] = useState(false);

  const names = classNames("viking-input-wrapper", {
    [`input-size-${size}`]: size,
    "is-disabled": disabled,
    "input-group": addonBefore || addonAfter,
    "input-group-addonAfter": !!addonAfter,
    "input-group-addonBefore": !!addonBefore,
    "input--suffix": !!suffix || !!clearable || !!showPassword,
    "input--prefix": !!prefix,
  });

  const prefixNames = classNames("input__prefix");
  const clearableNames = classNames("input__suffix", "is-clear");
  const suffixNames = classNames("input__suffix");

  // 保证state属性初始化的时候  值不为undefined
  const fixControlledValue = (value: any) => {
    if (typeof value === "undefined" || value === null) {
      return "";
    }
    return value;
  };

  // input组件只能是受控 || 非受控。不能同时出现这两个属性
  if ("value" in props) {
    delete restProps.defaultValue;
    // restProps.value = fixControlledValue(props.value);
  }

  const handleChange = (e: any) => {
    if (onChange) {
      const value = e.target.value;
      onChange(value, e);
    }
  };

  const handleClear = (e: any) => {
    if (onChange) {
      onChange("", e);
    }
  };

  const handlePassword = (e: any) => {
    setPasswordVisible(!passwordVisible);
  };
  const renderComponentWithPrefix = () => {
    if (addonBefore) return;
    return (
      <>
        {prefix && (
          <div className={prefixNames}>
            <Icon icon={prefix} title={`title`} />
          </div>
        )}
      </>
    );
  };

  const renderComponentWithSuffix = () => {
    if (addonAfter) return;
    return (
      <>
        <>
          {propsValue && clearable && !showPassword && (
            <span className={clearableNames}>
              <Icon
                onClick={(e) => {
                  handleClear(e);
                }}
                icon="times-circle"
              />
            </span>
          )}
          {propsValue && showPassword && (
            <span className={suffixNames}>
              <Icon
                onClick={(e) => {
                  handlePassword(e);
                }}
                icon={passwordVisible ? "eye-slash" : "eye"}
              />
            </span>
          )}
        </>
        {suffix && !showPassword && !clearable && (
          <div className={suffixNames}>
            <Icon icon={suffix} title={`title`} />
          </div>
        )}
      </>
    );
  };

  return (
    <div className={names} style={style}>
      {addonBefore && (
        <div className="input-group__addonBefore">{addonBefore}</div>
      )}
      {renderComponentWithPrefix()}
      <input
        className="viking-input-inner"
        disabled={disabled}
        type={
          showPassword
            ? passwordVisible
              ? "text"
              : "password"
            : restProps.type
        }
        onChange={(e) => {
          handleChange(e);
        }}
        {...restProps}
      />
      {renderComponentWithSuffix()}
      {addonAfter && (
        <div className="input-group__addonAfter">{addonAfter}</div>
      )}
    </div>
  );
};

export default Input;
