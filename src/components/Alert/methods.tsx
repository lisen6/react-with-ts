import React, { useState, FC } from 'react'
import ReactDOM from 'react-dom'
import StaticAlert, {
  StaticAlertProps as AlertProps,
  KINDS
} from './StaticAlert'

type KindType = keyof typeof KINDS

export interface StaticAlertProps extends Omit<AlertProps, 'kind'> {
  text?: string
}

interface InnerItem extends AlertProps {
  key: number
  text?: string
}

const Alert = () => {
  const [list, setList] = useState<InnerItem[]>([])

  const fillApis = (kind: KindType) => {
    return (item: StaticAlertProps | string) => {
      let data: InnerItem = {
        text: '',
        key: count++,
        visible: true,
        duration: 3000,
        kind
      }

      if (typeof item === 'string') {
        data.text = item
        data.closable = false
      } else {
        data = {
          ...data,
          ...item
        }
      }

      if (data.action || data.closable) {
        data.duration = 5000
      }

      setList((list) => {
        list.unshift(data)

        if (list.length > limit) {
          list.forEach((it, i) => {
            if (i > limit - 1) {
              it.visible = false
            }
          })
          list = [list[0], list[1]]
        }

        return [...list]
      })
    }
  }

  Object.keys(KINDS).map((type: any) => (apis[type] = fillApis(type)))

  return (
    <div className="alert-fixed-container">
      {
        list.map(({ key, text, ...props }) =>
          <div key={key} style={{ marginBottom: 16 }}>
            <StaticAlert {...props}>{text}</StaticAlert>
          </div>)
      }

    </div>
  )
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

function getPortalRoot(document: Document) {
  let root = document.querySelector('#viking-alert-container')
  if (!root) {
    root = document.createElement('div')
    root.textContent = '123'
    root.id = 'viking-alert-container'
    document.body.appendChild(root)
  }
  return root
}

ReactDOM.render(<Alert />, getPortalRoot(document))



