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
  /** 是否禁用状态，默认为 false */
  disabled?: boolean;
  /** 控件大小 */
  size?: InputSize;
  /** 带标签的 input，设置前置标签 */
  addonBefore?: string | ReactElement;
  /** 带标签的 input，设置后置标签 */
  addonAfter?: string | ReactElement;
  /** 可以点击清除图标删除内容 */
  clearable?: boolean;
  /** 带有前缀图标的 input */
  prefix?: IconProp;
  /** 带有后缀图标的 input */
  suffix?: IconProp;
  /** 输入框内容 */
  value?: string;
  /** 输入框默认内容 */
  defaultValue?: string;
  /** 输入框内容变化时的回调 */
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

  const [focused, setFocused] = useState(false);

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
    type: "text",
    ...restProps,
  };

  const handleClear = (e: any) => {
    setFocused(true);
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
    setFocused(false);
    onBlur?.(e);
  };

  const innerOnFocus: FocusEventHandler<HTMLInputElement> = (e) => {
    setFocused(true);
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
      const showClear =
        clearable && !disabled && String(inputRef.current?.value).length > 0;
      return (
        <div className={suffixNames}>
          {showClear && (
            <Icon
              style={{ cursor: "pointer" }}
              onClick={(e) => {
                handleClear(e);
              }}
              icon="times-circle"
              title={`title`}
            />
          )}
          {suffix && (
            <Icon
              onClick={(e) => {
                handleClear(e);
              }}
              icon={suffix}
              title={`title`}
            />
          )}
        </div>
      );
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
