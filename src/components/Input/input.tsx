import React, {
  useState,
  useEffect,
  useRef,
  FC,
  ReactElement,
  FocusEventHandler,
  InputHTMLAttributes,
  ChangeEvent,
} from "react";
import { IconProp } from "@fortawesome/fontawesome-svg-core";
import classNames from "classnames";
import Icon from "../Icon/Icon";

type InputSize = "medium" | "small";

export interface InputProps
  extends Omit<
  InputHTMLAttributes<HTMLInputElement>,
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
  /** 输入框首部图标 */
  suffix?: IconProp;
  /** 输入框尾部图标 */
  prefix?: IconProp;
  /** 输入框值 */
  value?: string;
  /** 输入框默认值 */
  defaultValue?: string;
  /** 改变的时候触发回调函数 */
  onChange?: (value: string, e?: ChangeEvent<HTMLInputElement>) => void;
}

const Input: FC<InputProps> = (props) => {
  const {
    disabled,
    size,
    addonBefore,
    addonAfter,
    value: propsValue,
    defaultValue,
    onChange,
    onBlur,
    onFocus,
    suffix,
    prefix,
    clearable,
    style,
    ...restProps
  } = props;

  const lock = useRef(false);

  const inputRef = useRef<HTMLInputElement>(null);

  const names = classNames("viking-input-wrapper", {
    [`input-size-${size}`]: size,
    "is-disabled": disabled,
    "input-group": addonBefore || addonAfter,
    "input-group-addonAfter": !!addonAfter,
    "input-group-addonBefore": !!addonBefore,
    "input--suffix": !!suffix || !!clearable,
    "input--prefix": !!prefix,
  });

  const prefixNames = classNames("input__prefix");
  const suffixNames = classNames("input__suffix");

  const innerProps = {
    disabled: disabled,
    type: 'text',
    ...restProps,
  };

  const handleClear = (e: any) => {
    if (!disabled) {
      const target = inputRef.current;
      if (target) {
        target.value = "";
      }
      onChange?.("", e);
    }
  };

  const innerOnChange = (e: any) => {
    if (typeof propsValue !== "undefined") {
      if (e.type === "compositionstart") {
        lock.current = true;
        return;
      }
      if (e.type === "compositionend") {
        lock.current = false;
      }
      if (!lock.current && inputRef.current) {
        const v = e.target.value;
        inputRef.current.value = propsValue;
        onChange?.(v, e);
      }
    } else {
      onChange?.(e.target.value, e);
    }
  };

  const innerOnBlur: FocusEventHandler<HTMLInputElement> = (e) => {
    onBlur?.(e);
  };

  const innerOnFocus: FocusEventHandler<HTMLInputElement> = (e) => {
    onFocus?.(e);
  };

  const inputEvents = {
    onCompositionStart: innerOnChange,
    onCompositionEnd: innerOnChange,
    onChange: innerOnChange,
    onBlur: innerOnBlur,
    onFocus: innerOnFocus,
  };

  const renderInput = () => {
    const renderComponentWithPrefix = () => {
      return (
        prefix && (
          <div className={prefixNames}>
            <Icon icon={prefix} title={`title`} />
          </div>
        )
      );
    };

    const renderComponentWithSuffix = () => {
      const showClear = clearable && !disabled && String(inputRef.current?.value).length > 0
      return (
        <div className={suffixNames}>
          {
            showClear && <Icon
              style={{ cursor: 'pointer' }}
              onClick={(e) => {
                handleClear(e);
              }}
              icon="times-circle"
              title={`title`}
            />
          }
          {
            suffix && <Icon
              onClick={(e) => {
                handleClear(e);
              }}
              icon={suffix}
              title={`title`}
            />
          }
        </div>
      )
    };
    return (
      <div className="inner-input-wrapper">
        {renderComponentWithPrefix()}
        <input
          className="viking-input-inner"
          {...innerProps}
          {...inputEvents}
          ref={inputRef}
          defaultValue={defaultValue}
        />
        {renderComponentWithSuffix()}
      </div>
    );
  };

  useEffect(() => {
    if (
      typeof propsValue !== "undefined" &&
      propsValue !== null &&
      inputRef.current
    ) {
      inputRef.current.value = propsValue;
    }
  }, [propsValue]);

  return (
    <div className={names} style={style}>
      {addonBefore && (
        <div className="input-group__addonBefore">{addonBefore}</div>
      )}
      {renderInput()}
      {addonAfter && (
        <div className="input-group__addonAfter">{addonAfter}</div>
      )}
    </div>
  );
};

export default Input;
