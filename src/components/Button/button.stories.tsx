import React from "react";
import { storiesOf } from "@storybook/react";
import { action } from "@storybook/addon-actions";

import Button from "./button";

const defaultButton = () => (
  <Button onClick={action("clicked")}>default Button</Button>
);

const buttonWithSize = () => (
  <>
    <Button size="lg">large Button</Button>
    <Button>default Button</Button>
    <Button size="sm">small Button</Button>
  </>
);

const buttonWithType = () => (
  <>
    <Button btnType="primary">primary Button</Button>
    <Button btnType="danger">danger Button</Button>
    <Button btnType="link" href="https://www.baidu.com">
      link Button
    </Button>
  </>
);

storiesOf("Button Component", module)
  // .addDecorator(withInfo)
  // .addParameters({
  //   info: {
  //     inline: true,
  //   },
  // })
  .add("默认的Button", defaultButton)
  .add("不同大小的Button", buttonWithSize)
  .add("不同主题的Button", buttonWithType);
