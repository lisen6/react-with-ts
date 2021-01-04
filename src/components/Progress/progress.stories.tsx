import React, { useState } from "react";
import { storiesOf } from "@storybook/react";
import { action } from "@storybook/addon-actions";
import Progress from "./progress";
import Button from '../Button/button'

const simpleProgress = () => {
  return <Progress percentage={10} showText={false} />
}


const diffThemeProgress = () => {
  return <div style={{ width: 500 }}>
    <Progress percentage={10} theme="primary" strokeHeight={20} />
    <Progress style={{ marginTop: 10 }} percentage={20} theme="danger" strokeHeight={20} />
    <Progress style={{ marginTop: 10 }} percentage={30} theme="success" strokeHeight={20} />
    <Progress style={{ marginTop: 10 }} percentage={40} theme="info" strokeHeight={20} />
    <Progress style={{ marginTop: 10 }} percentage={50} theme="secondary" strokeHeight={20} />
    <Progress style={{ marginTop: 10 }} percentage={60} theme="dark" strokeHeight={20} />
  </div>
}


const customColors = [
  { color: '#0d6efd', percentage: 20 },
  { color: 'purple', percentage: 40 },
  { color: '#d63384', percentage: 60 },
  { color: '#F56C6C', percentage: 80 },
  { color: '#17a2b8', percentage: 100 }
]
const customColorMethod = (percentage: any) => {
  if (percentage < 30) {
    return '#909399';
  } else if (percentage < 70) {
    return '#e6a23c';
  } else {
    return '#67c23a';
  }
}
const customColorsProgress = () => {
  return <>
    <Progress customColors={`#17a2b8`} style={{ marginTop: 10 }} percentage={20} theme="secondary" strokeHeight={20} />
    <Progress customColors={customColors} style={{ marginTop: 10 }} percentage={40} theme="secondary" strokeHeight={20} />
    <Progress customColors={customColorMethod} style={{ marginTop: 10 }} percentage={60} theme="dark" strokeHeight={20} />
  </>
}

storiesOf('Progress component', module)
  .add('线形进度条', simpleProgress)
  .add('百分比内显', diffThemeProgress)
  .add('自定义颜色', customColorsProgress)