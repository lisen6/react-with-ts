import React, { MouseEventHandler, useState, useEffect, ReactNode, forwardRef, HTMLAttributes } from 'react'

export const KINDS = {
  success: {
    icon: "check-circle",
    theme: 'green'
  },
  info: {
    icon: "info-circle",
    theme: 'blue'
  },
  warning: {
    icon: "exclamation-circle",
    theme: 'orange'
  },
  error: {
    icon: "times-circle",
    theme: 'red'
  }
} as const

export interface StaticAlertProps extends HTMLAttributes<Element> {
  /**
   * Specify one of the built-in appearances.
   */
  kind?: 'success' | 'error' | 'info' | 'warning'
  /**
   * Specify one of the built-in theme.
   */
  // theme?: ThemeEnum
  /**
   * Indicate loading status.
   */
  loading?: boolean
  /**
   * Specify the icon needed. (alias: `"up" | "down" | "plus" | "logo" | "spinner" | "smile"`; `SVGElement`; `() => SVGElement`; another `<I icon={xxx} />`)
   */
  // icon?: IconLikeType
  /**
   * If `true`, render a close icon.
   */
  closable?: boolean
  /**
   *
   */
  visible?: boolean
  /**
   * How long it should stay.
   */
  duration?: number
  /**
   * Callback fired when the component requests to be closed.
   */
  onClose?: MouseEventHandler
  /**
   * Action text.
   */
  action?: ReactNode
  /**
   * Callback fired when the action requests to be clicked.
   */
  onAction?: MouseEventHandler
}

