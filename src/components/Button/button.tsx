import React, { ButtonHTMLAttributes, AnchorHTMLAttributes, forwardRef, HTMLAttributes } from "react";
import classnames from "classnames";

type ButtonSize = "lg" | "sm";

type ButtonType = "primary" | "default" | "danger" | "link";

export interface BaseButtonProps extends HTMLAttributes<HTMLElement> {
  className?: string;
  /** 是否禁用状态 */
  disabled?: boolean;
  /** 尺寸 */
  size?: ButtonSize;
  /** 设置跳转地址 */
  href?: string;
  /** Button的类型 */
  btnType: ButtonType;
  children: React.ReactNode;
}

type NativeButtonProps = BaseButtonProps & ButtonHTMLAttributes<HTMLElement>;

type AnchorButtonProps = BaseButtonProps & AnchorHTMLAttributes<HTMLElement>;

// Partial<T, U>  T跟U的所有属性可选
export type ButtonProps = Partial<NativeButtonProps & AnchorButtonProps>;

/**
 * ## 引用方法
 * ~~~js
 * import { Button } from 'vikingShip'
 * ~~~
 */
export const Button = forwardRef<HTMLButtonElement & HTMLAnchorElement, ButtonProps>((props, ref) => {
  const {
    btnType,
    disabled,
    size,
    children,
    href,
    ...resetProps
  } = props;

  const classes = classnames("btn", {
    [`btn-${btnType}`]: btnType,
    [`btn-${size}`]: size,
    disabled: btnType === "link" && disabled,
  });

  if (btnType === "link" && href) {
    return (
      <a className={classes} href={href} ref={ref} {...resetProps}>
        {children}
      </a>
    );
  } else {
    return (
      <button ref={ref} className={classes} disabled={disabled} {...resetProps}>
        {children}
      </button>
    );
  }
});

Button.defaultProps = {
  disabled: false,
  btnType: 'default'
};

export default Button;
