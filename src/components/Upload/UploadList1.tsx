import React, { FC } from 'react'
import { UploadFile } from './Upload1'
import Icon from '../Icon/Icon'
import Progress from '../Progress/Progress1'

interface uploadListProps {
  fileList: UploadFile[]
  onRemove: (_file: UploadFile) => void
}

export const UploadList: FC<uploadListProps> = (props) => {
  const { fileList, onRemove } = props
  return (
    <ul className="viking-upload-list">
      {fileList.map((item) => {
        return (
          <li className="viking-upload-list-item" key={item.uid}>
            <div className="upload-content-wrapper">
              <span className={`file-name file-name-${item.status}`}>
                <Icon icon="file-alt" theme="secondary" />
                {item.name}
              </span>
              <span className="file-status">
                {item.status === 'uploading' && (
                  <Icon icon="spinner" spin theme="primary" />
                )}
                {item.status === 'success' && (
                  <Icon icon="check-circle" theme="success" />
                )}
                {item.status === 'error' && (
                  <Icon icon="times-circle" theme="danger" />
                )}
              </span>
              <span className="file-actions">
                <Icon icon="times" onClick={() => onRemove(item)} />
              </span>
            </div>
            {item.status === 'uploading' && (
              <Progress percentage={item.percentage || 0} />
            )}
          </li>
        )
      })}
    </ul>
  )
}

export default UploadList
