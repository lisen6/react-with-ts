import React, {
  useState,
  useRef,
  useEffect,
  useMemo,
  useCallback,
  FC,
  Children,
  ChangeEvent,
  ReactNode,
  isValidElement,
  InputHTMLAttributes,
} from "react";
import classNames from "classnames";

export interface OptionProps
  extends Omit<
    InputHTMLAttributes<Element>,
    "value" | "defaultValue" | "onChange" | "title"
  > {
  disabled?: boolean;
  label?: ReactNode;
  value?: any;
  [key: string]: any;
}
export interface RadioProps extends OptionProps {
  value?: any;
  defaultValue?: any;
  onChange?: (val: any, e: ChangeEvent) => void;
  options?: OptionProps[];
}

interface RadioInnerProps extends Omit<RadioProps, "onChange"> {
  kind?: string;
  onChange?: (e: ChangeEvent<HTMLInputElement>) => void;
}

const InnerRadio: FC<RadioInnerProps> = (props) => {
  const { disabled, label, value, kind, onChange } = props;

  const inputRef = useRef<HTMLInputElement>(null!);

  const labelClass = classNames("viking-radio", {
    "is-checked": !!value,
    "is-disabled": !!disabled,
    "viking-radio-button": kind === "button",
  });

  return (
    <label className={labelClass} onMouseLeave={() => inputRef.current.blur()}>
      <input
        className="viking-radio__original"
        ref={inputRef}
        type="radio"
        checked={!!value}
        disabled={disabled}
        onChange={onChange}
      />
      <span className="viking-radio__input" />
      <span className="viking-radio__label">{label}</span>
    </label>
  );
};

// 单选按钮组
const Option: FC<OptionProps> = (props) => null;

const ButtonOption: FC<OptionProps> = (props) => null;

export const Radio: FC<RadioProps> = (props) => {
  let {
    label,
    checked,
    value: propsValue,
    defaultValue,
    defaultChecked,
    disabled,
    options,
    renderOption,
    children,
    onChange,
  } = props;

  propsValue = typeof propsValue === "undefined" ? checked : propsValue;

  defaultValue =
    typeof defaultValue === "undefined" ? defaultChecked : defaultValue;

  label = label || children;

  const [value, setValue] = useState(
    typeof propsValue === "undefined" ? defaultValue : propsValue
  );

  const childrenOptions = useMemo(
    () =>
      Children.map(children, (child) => {
        if (isValidElement(child) && child?.type === Option) {
          return Object.assign({ kind: "default" }, child.props);
        }
        if (isValidElement(child) && child?.type === ButtonOption) {
          return Object.assign({ kind: "button" }, child.props);
        }
      }),
    [children]
  );

  useEffect(() => {
    typeof propsValue !== "undefined" && setValue(propsValue);
  }, [propsValue]);

  /**
   * if Single
   */
  const onSingleRadioChange = useCallback(
    (e) => {
      if (typeof propsValue === "undefined") {
        setValue(e.target.checked);
      }
      onChange?.(propsValue || e.target.checked, e);
    },
    [propsValue, onChange]
  );

  const singleRadio = useMemo(() => {
    return (
      <InnerRadio
        disabled={disabled}
        label={label}
        value={value}
        onChange={onSingleRadioChange}
      />
    );
  }, [disabled, value, label, onSingleRadioChange]);

  /**
   * if Group
   */
  const innerOptions = useMemo(() => {
    const _opt: OptionProps[] = [];

    if (!options?.length) {
      options = childrenOptions || [];
    }

    _opt.push.apply(
      _opt,
      options.map((o) => ({ ...o, disabled: disabled || o.disabled }))
    );

    return _opt;
  }, [options, childrenOptions, disabled]);

  const onGroupRadioChange = useCallback(
    (index, optionValue, e) => {
      if (typeof propsValue === "undefined") {
        setValue(typeof optionValue === "undefined" ? index : optionValue);
      }
      onChange?.(typeof optionValue === "undefined" ? index : optionValue, e);
    },
    [propsValue, onChange]
  );

  const group = useMemo(
    () =>
      innerOptions.map((opt, index) => {
        const _label = renderOption
          ? renderOption(opt, index)
          : opt.children || opt.label;
        return (
          <InnerRadio
            key={index}
            disabled={!!opt.disabled}
            value={
              typeof opt.value === "undefined"
                ? value === index
                : value === opt.value
            }
            label={_label}
            kind={opt.kind}
            onChange={(e) => onGroupRadioChange(index, opt.value, e)}
          />
        );
      }),
    [innerOptions, renderOption, value]
  );

  return (
    <>
      {isSingle(options, childrenOptions) ? (
        singleRadio
      ) : (
        <div className="viking-radio-group">{group}</div>
      )}
    </>
  );
};

function isSingle(options: any, childrenOptions: any) {
  return !options?.length && !childrenOptions?.length;
}

Option.displayName = "Option";

ButtonOption.displayName = "Button";

Radio.displayName = "Radio";

export default Object.assign(Radio, {
  Option,
  Button: ButtonOption,
});
