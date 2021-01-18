import React from "react";
import { storiesOf } from "@storybook/react";

import Input from "./input";

const baseInput = () => {
  return <Input placeholder="请输入内容" />;
};

const disabledInput = () => {
  return <Input placeholder="请输入内容" disabled />;
};

const clearableInput = () => {
  return <Input placeholder="请输入内容" clearable />;
};

const renderInputwithIcon = () => {
  return (
    <Input placeholder="请输入内容" clearable prefix="search" suffix="user-circle" />
  );
};

const renderInputwithAddon = () => {
  return (
    <Input
      placeholder="请输入内容"
      addonBefore="Http://"
      addonAfter=".com"
      style={{ width: 400 }}
    />
  );
};

storiesOf("Input Component", module)
  .add("基础Input", baseInput)
  .add("禁用状态Input", disabledInput)
  .add("可清空Input", clearableInput)
  .add("带icon的输入框", renderInputwithIcon)
  .add("复合型输入框", renderInputwithAddon);
