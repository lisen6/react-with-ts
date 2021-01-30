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
  forwardRef
} from 'react'
import classNames from 'classnames'

export interface OptionProps
  extends Omit<
    InputHTMLAttributes<Element>,
    'value' | 'defaultValue' | 'onChange'
  > {
  disabled?: boolean
  label?: ReactNode
  value?: any
  [key: string]: any
}

export interface CheckboxProps extends OptionProps {
  value?: any
  defaultValue?: any
  indeterminate: boolean
  onChange?: (val: any, e: ChangeEvent) => void
  options?: OptionProps[]
}

interface CheckboxInnerProps extends Omit<CheckboxProps, 'onChange'> {
  kind?: string
  onChange?: (e: ChangeEvent<HTMLInputElement>) => void
}

const Option: FC<OptionProps> = (props) => null

const InnerCheckbox = forwardRef<HTMLInputElement, CheckboxInnerProps>(
  (props, ref) => {
    const {
      disabled,
      label,
      value,
      onChange,
      indeterminate,
      ...restProps
    } = props

    const inputRef = useRef<HTMLInputElement>(null!)

    const labelClass = classNames('viking-checkbox', {
      'is-checked': !!value,
      'is-disabled': !!disabled,
      'is-indeterminate': !!indeterminate
    })

    return (
      <label
        className={labelClass}
        onMouseLeave={() => inputRef.current.blur()}
      >
        <input
          className="viking-checkbox__original"
          ref={inputRef}
          type="checkbox"
          checked={!!value}
          disabled={disabled}
          onChange={onChange}
          {...restProps}
        />
        <span className="viking-checkbox__input" />
        <span className="viking-checkbox__label">{label}</span>
      </label>
    )
  }
)

export const Checkbox = forwardRef<HTMLInputElement, CheckboxProps>(
  (props, ref) => {
    let {
      label,
      checked,
      value: propsValue,
      defaultValue,
      defaultChecked,
      disabled,
      indeterminate,
      options,
      renderOption,
      children,
      onChange,
      ...restProps
    } = props

    propsValue = typeof propsValue === 'undefined' ? checked : propsValue

    defaultValue =
      typeof defaultValue === 'undefined' ? defaultChecked : defaultValue

    label = label || children

    const [value, setValue] = useState(
      typeof propsValue === 'undefined' ? defaultValue : propsValue
    )

    const childrenOptions = useMemo(
      () =>
        Children.map(children, (child) => {
          if (isValidElement(child) && child?.type === Option) {
            return Object.assign({ kind: 'default' }, child.props)
          }
        }),
      [children]
    )

    useEffect(() => {
      typeof propsValue !== 'undefined' && setValue(propsValue)
    }, [propsValue])

    /**
     * if Single
     */
    const onSingleCheckboxChange = useCallback(
      (e) => {
        if (typeof propsValue === 'undefined') {
          setValue(e.target.checked)
        }
        onChange?.(propsValue || e.target.checked, e)
      },
      [propsValue, onChange]
    )

    const singleCheckbox = useMemo(() => {
      return (
        <InnerCheckbox
          disabled={disabled}
          ref={ref}
          label={label}
          value={value}
          indeterminate={indeterminate}
          onChange={onSingleCheckboxChange}
          {...restProps}
        />
      )
    }, [disabled, value, label, onSingleCheckboxChange])

    /**
     * if Group
     */
    const innerOptions = useMemo(() => {
      const _opt: OptionProps[] = []

      if (!options?.length) {
        options = childrenOptions || []
      }

      _opt.push.apply(
        _opt,
        options.map((o) => ({ ...o, disabled: disabled || o.disabled }))
      )

      return _opt
    }, [options, childrenOptions, disabled])

    const onGroupCheckboxChange = useCallback(
      (index, optionValue, e) => {
        const v = value ? [...value] : []
        let _v = typeof optionValue === 'undefined' ? index : optionValue

        const i = v.findIndex((it: any) => it === _v)
        if (i === -1) {
          v.push(_v)
        } else {
          v.splice(i, 1)
        }

        if (typeof propsValue === 'undefined') {
          setValue([...v])
        }
        onChange?.([...v], e)
      },
      [propsValue, value, onChange]
    )

    const group = useMemo(
      () =>
        innerOptions.map((opt, index) => {
          const _label = renderOption
            ? renderOption(opt, index)
            : opt.children || opt.label
          return (
            <InnerCheckbox
              key={index}
              disabled={!!opt.disabled}
              value={
                typeof opt.value === 'undefined'
                  ? value?.includes(index)
                  : value?.includes(opt.value)
              }
              label={_label}
              kind={opt.kind}
              {...restProps}
              onChange={(e: ChangeEvent) =>
                onGroupCheckboxChange(index, opt.value, e)
              }
            />
          )
        }),
      [innerOptions, renderOption, value]
    )

    return (
      <>
        {isSingle(options, childrenOptions) ? (
          singleCheckbox
        ) : (
          <div className="viking-checkbox-group" ref={ref}>
            {group}
          </div>
        )}
      </>
    )
  }
)

function isSingle(options: any, childrenOptions: any) {
  return !options?.length && !childrenOptions?.length
}

Checkbox.displayName = 'Checkbox'

Option.displayName = 'Option'

export default Object.assign(Checkbox, {
  Option
})
