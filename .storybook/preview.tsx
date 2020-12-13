import React from "react";
import "../src/styles/index.scss";
import { addDecorator, addParameters } from "@storybook/react";
import { withInfo } from "@storybook/addon-info";

export const parameters = {
  actions: { argTypesRegex: "^on[A-Z].*" },
};

// 全局插件配置
const wrapperStyle = {
  padding: "20px 40px",
};

const storyWrapper = (storyFn) => <div style={wrapperStyle}>{storyFn()}</div>;

addDecorator(storyWrapper);
addDecorator(withInfo);

addParameters({ info: { inline: true, header: false } });
