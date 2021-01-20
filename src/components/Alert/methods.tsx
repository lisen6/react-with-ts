import React, { useState, HTMLAttributes } from 'react'

import StaticAlert, {
  StaticAlertProps as AlertProps,
  KINDS
} from './StaticAlert'

export interface StaticAlertProps extends Omit<AlertProps, 'kind'> {
  text?: string
}


let count = 0
let limit = 2

const apis = {
  success: (item: StaticAlertProps | string) => { },
  error: (item: StaticAlertProps | string) => { },
  info: (item: StaticAlertProps | string) => { },
  warning: (item: StaticAlertProps | string) => { }
}

export default apis

// console.log('static alert render')
// if (!isServer) {
//   ReactDOM.render(<Alert />, getPortalRoot(document))
// }