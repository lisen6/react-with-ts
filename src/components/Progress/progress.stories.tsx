import React, { useState } from "react";
import { storiesOf } from "@storybook/react";
import Progress from "./progress";
import Button from "../Button/button";

const SimpleProgress = () => {
  return <Progress style={{ width: 500 }} percentage={10} showText={false} />;
};

const DiffThemeProgress = () => {
  return (
    <div style={{ width: 500 }}>
      <Progress percentage={10} theme="primary" strokeHeight={20} />
      <Progress
        style={{ marginTop: 10 }}
        percentage={20}
        theme="danger"
        strokeHeight={20}
      />
      <Progress
        style={{ marginTop: 10 }}
        percentage={30}
        theme="success"
        strokeHeight={20}
      />
      <Progress
        style={{ marginTop: 10 }}
        percentage={40}
        theme="info"
        strokeHeight={20}
      />
      <Progress
        style={{ marginTop: 10 }}
        percentage={50}
        theme="secondary"
        strokeHeight={20}
      />
      <Progress
        style={{ marginTop: 10 }}
        percentage={60}
        theme="dark"
        strokeHeight={20}
      />
    </div>
  );
};

const customColors = [
  { color: "#0d6efd", percentage: 20 },
  { color: "purple", percentage: 40 },
  { color: "#d63384", percentage: 60 },
  { color: "#F56C6C", percentage: 80 },
  { color: "#17a2b8", percentage: 100 },
];
const customColorMethod = (percentage: any) => {
  if (percentage < 30) {
    return "#909399";
  } else if (percentage < 70) {
    return "#e6a23c";
  } else {
    return "#67c23a";
  }
};
const CustomColorsProgress = () => {
  const [value, setValue] = useState(20)
  const [value2, setValue2] = useState(40)
  const [value3, setValue3] = useState(60)
  return (
    <div style={{ width: 500 }}>
      <Progress
        customColors={`#17a2b8`}
        style={{ marginTop: 10 }}
        percentage={value}
        theme="secondary"
        strokeHeight={20}
      />
      <Progress
        customColors={customColors}
        style={{ marginTop: 10 }}
        percentage={value2}
        theme="secondary"
        strokeHeight={20}
      />
      <Progress
        customColors={customColorMethod}
        style={{ marginTop: 10 }}
        percentage={value3}
        theme="dark"
        strokeHeight={20}
      />
      <br />
      <Button size="sm" onClick={() => {
        setValue(value + 10)
        setValue2(value2 + 10)
        setValue3(value3 + 10)
      }}>增加</Button>
      <Button size="sm" onClick={() => {
        setValue(value - 10)
        setValue2(value2 - 10)
        setValue3(value3 - 10)
      }}>减少</Button>
    </div>
  );
};

storiesOf("Progress Component", module)
  .add("线形进度条", SimpleProgress)
  .add("百分比内显", DiffThemeProgress)
  .add("自定义颜色", CustomColorsProgress);
