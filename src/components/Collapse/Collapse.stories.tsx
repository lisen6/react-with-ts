import React from "react";
import { storiesOf } from "@storybook/react";
import { action } from "@storybook/addon-actions";

import Collapse from "./Collapse";
import Panel from './Panel'


const defaultOpenCollapse = () => (
  <Collapse
    defaultActiveKey={["1", "2"]}
    onChange={(index) => console.log(index, "显示已展开的面板")}
  >
    <Panel header="this is panel header 1" index="1">
      我是children1我是children1我是children1我是children1
    </Panel>
    <Panel header="this is panel header 2" index="2">
      我是children2
    </Panel>
    <Panel showArrow={false} header="this is panel header 3" index="3">
      我是children3
    </Panel>
  </Collapse>
);

const accordionCollapse = () => (
  <Collapse
    defaultActiveKey={["1", "2"]}
    accordion
    onChange={(index) => console.log(index, "显示已展开的面板")}
  >
    <Panel header="this is panel header 1" index="1">
      我是children1我是children1我是children1我是children1
    </Panel>
    <Panel header="this is panel header 2" index="2">
      我是children2
    </Panel>
    <Panel showArrow={false} header="this is panel header 3" index="3">
      我是children3
    </Panel>
  </Collapse>
);

const disabledCollapse = () => (
  <Collapse
    defaultActiveKey={["1", "2"]}
    collapsible="disabled"
    onChange={(index) => console.log(index, "显示已展开的面板")}
  >
    <Panel header="this is panel header 1" index="1">
      我是children1我是children1我是children1我是children1
    </Panel>
    <Panel header="this is panel header 2" index="2">
      我是children2
    </Panel>
    <Panel showArrow={false} header="this is panel header 3" index="3">
      我是children3
    </Panel>
  </Collapse>
);

storiesOf("Collapse Component", module)
  .add("默认展开的Collapse", defaultOpenCollapse)
  .add("手风琴模式的Collapse", accordionCollapse)
  .add('禁止收缩的Collapse', disabledCollapse)
