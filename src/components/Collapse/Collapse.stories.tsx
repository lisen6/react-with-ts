import React, { useState } from "react";
import { storiesOf } from "@storybook/react";

import Collapse from "./Collapse";
import Panel from "./Panel";
import Switch from '../Switch/switch2'

const DefaultOpenCollapse = () => {
  const [value1, setValue1] = useState(['1', '2']);
  return <>
    <Collapse
      defaultActiveKey={value1}
      onChange={(val) => {
        console.log(val, "显示已展开的面板")
        setValue1(val)
      }}
    >
      <Panel header="this is panel header 1" activeKey="1">
        我是children1我是children1我是children1我是children1
      </Panel>
      <Panel header="this is panel header 2" activeKey="2">
        我是children2
      </Panel>
      <Panel header="this is panel header 3" activeKey="3">
        我是children3
      </Panel>
    </Collapse>
    <span>展开的面板值: {String(value1)}</span>
  </>
};

const AccordionCollapse = () => {
  const [value1, setValue1] = useState(['1']);
  return <>
    <Collapse
      defaultActiveKey={value1}
      accordion
      onChange={setValue1}
    >
      <Panel header="this is panel header 1" activeKey="1">
        我是children1我是children1我是children1我是children1
      </Panel>
      <Panel header="this is panel header 2" activeKey="2">
        我是children2
      </Panel>
      <Panel header="this is panel header 3" activeKey="3">
        我是children3
      </Panel>
    </Collapse>
    <span>展开的面板值: {String(value1)}</span>
  </>
};

const NestingCollapse = () => (
  <Collapse
    defaultActiveKey={["1", "2"]}
    onChange={(index) => console.log(index, "显示已展开的面板")}
  >
    <Panel header="this is panel header 1" activeKey="1">
      <div style={{ marginBottom: 10 }}>
        我是children1我是children1我是children1我是children1
      </div>
      <Collapse onChange={(index) => console.log(index, "显示已展开的面板")}>
        <Panel header="this is panel header 1" activeKey="1">
          我是children1我是children1我是children1我是children1
        </Panel>
        <Panel header="this is panel header 2" activeKey="2">
          我是children2
        </Panel>
      </Collapse>
    </Panel>
    <Panel header="this is panel header 2" activeKey="2">
      我是children2
    </Panel>
    <Panel header="this is panel header 3" activeKey="3">
      我是children3
    </Panel>
  </Collapse>
);

const DisabledCollapse = () => {
  const [value1, setValue1] = useState(['1', '2'])
  const getExtra = () => {
    return <Switch defaultChecked onClick={(val, e: any) => {
      console.log(val, e, '111')
      e.stopPropagation()
      val ? setValue1(['1', '2']) : setValue1(['2', '3'])
    }} />
  }

  console.log(value1, 'value1')
  return <>
    <Collapse
      defaultActiveKey={value1}
      expandIconPosition="left"
      onChange={(index) => {
        setValue1([...index])
      }}
    >
      <Panel header="this is panel header 1" disabled activeKey="1">
        我是children1我是children1我是children1我是children1
      </Panel>
      <Panel header="this is panel header 2" activeKey="2" extra={getExtra()}>
        我是children2
      </Panel>
      <Panel header="this is panel header 3" activeKey="3">
        我是children3
      </Panel>
    </Collapse >
    <span>展开的面板值: {String(value1)}</span>
  </>
};

storiesOf("Collapse Component", module)
  .add("默认展开的Collapse", DefaultOpenCollapse)
  .add("手风琴模式的Collapse", AccordionCollapse)
  .add("面板嵌套", NestingCollapse)
  .add("禁止收缩的Collapse", DisabledCollapse);
