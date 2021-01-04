import React, { FC, useEffect, useState } from "react";
import { ThemeProps } from "../Icon/Icon";

interface colorProps {
  color: string;
  percentage: number;
  [key: string]: any
}
export interface ProgressProps {
  /** 百分比（必填）*/
  percentage: number;
  /** 进度条的高度 */
  strokeHeight?: number;
  /** 进度条显示文字内置在进度条内 */
  showText?: boolean;
  style?: React.CSSProperties;
  /** 主题 */
  theme?: ThemeProps;
  /** 自定义颜色（支持字符串、数组、函数） */
  customColors?: string | Array<colorProps> | Function;
}

export const Progress: FC<ProgressProps> = (props) => {
  const { percentage, strokeHeight, showText, style, theme, customColors } = props;

  const [barColor, setBarColor] = useState<string>('')

  useEffect(() => {
    if (typeof customColors === 'string') {
      setBarColor(customColors)
    } else if (Array.isArray(customColors)) {
      let renderColor = ''
      for (let v of customColors) {
        if (v.percentage <= percentage) {
          renderColor = v.color
        }
      }
      setBarColor(renderColor)
    } else if (typeof customColors === 'function') {
      let renderColor = customColors(percentage)
      setBarColor(renderColor)
    }
  }, [percentage, customColors])

  return (
    <div className="viking-progress-bar" style={style}>
      <div
        className="viking-progress-bar-outer"
        style={{ height: `${strokeHeight}px` }}
      >
        <div
          className={`viking-progress-bar-inner color-${theme}`}
          style={{ width: `${percentage}%`, backgroundColor: barColor }}
        >
          {showText && <span className="inner-text">{`${percentage}%`}</span>}
        </div>
      </div>
    </div>
  );
};

Progress.defaultProps = {
  strokeHeight: 15,
  showText: true,
  theme: "primary",
};

export default Progress;
