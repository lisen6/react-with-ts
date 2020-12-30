import React, { useState } from "react";
import "./styles/index.scss";
import Button from "./components/Button/button";

import Menu from "./components/Menu/menu";
import SubMenu from "./components/Menu/subMenu";
import MenuItem from "./components/Menu/menuItem";

import Collapse from "./components/Collapse/Collapse";
import Panel from "./components/Collapse/Panel";

import Icon from "./components/Icon/Icon";

import Input from "./components/Input/input";

import AutoComplete, {
  DataSourceType,
} from "./components/AutoComplete/autoComplete";

import Switch from "./components/Switch/switch";

function App() {
  const [collapseValue, setCollapseValue] = useState<string[]>([]);

  const [inputValue, setInputValue] = useState("lisen.6");

  const [switchValue, setSwitchValue] = useState(true);
  const [switchDisabled, setSwitchDisabled] = useState(false);

  // const larkers = ["1111", "2222", "3333", "4444"];
  // const handleFetch = (query: string) => {
  //   return larkers
  //     .filter((item) => item.includes(query))
  //     .map((item) => ({ value: item }));
  // };

  interface larkersProps {
    name?: string;
    value: string;
    [propName: string]: any;
  }
  const larkers = [
    {
      name: "lisen1",
      value: "111",
    },
    {
      name: "lisen2",
      value: "222",
    },
    {
      name: "lisen3",
      value: "333",
    },
  ];

  // const handleFetch = (query: string) => {
  //   return larkers.filter((lark) => lark.name.includes(query));
  // };

  const handleFetch = (query: string) => {
    return fetch(`https://api.github.com/search/users?q=${query}`)
      .then((res) => res.json())
      .then((data) => {
        const formatItems = data.items
          .slice(0, 10)
          .map((item: any) => ({ ...item, value: item.login }));
        return formatItems;
      });
  };

  const renderOptions = (item: DataSourceType<larkersProps>) => {
    return (
      <>
        <span>Name: {item.login}</span> &nbsp;
        <span>Value: {item.value}</span>
      </>
    );
  };
  return (
    <>
      <div className="Button-wrapper">
        <Button
          onClick={(e: React.MouseEvent) => console.log(e, 123)}
          btnType="default"
        >
          Button
        </Button>
        <Button disabled btnType="default">
          Disabled Button
        </Button>
        <Button btnType="primary" size="lg">
          Button Large
        </Button>
        <Button btnType="danger" size="sm">
          Button Small
        </Button>

        <Button href="/baidu.com" btnType="link" size="sm">
          Link
        </Button>
        <Button disabled href="/baidu.com" btnType="link" size="sm">
          Disabled Link
        </Button>
      </div>

      <div className="Menu-wrapper">
        <Menu
          defaultIndex="0"
          mode="horizontal"
          defaultOpenSubMenus={[]}
          onSelect={(index: string) => console.log(index)}
        >
          <MenuItem>link1</MenuItem>
          <MenuItem disabled>link2</MenuItem>
          <SubMenu title="dropdown">
            <MenuItem>dropdown1</MenuItem>
            <MenuItem>dropdown2</MenuItem>
          </SubMenu>
          <MenuItem>link4</MenuItem>
        </Menu>
      </div>
      <span>{JSON.stringify(collapseValue)}</span>
      <div className="Collapse-wrapper" style={{ maxWidth: 800 }}>
        <Collapse
          defaultActiveKey={collapseValue}
          // accordion
          onChange={(val: string[]) => {
            setCollapseValue(val);
          }}
        >
          <Panel header="this is panel header 1" index="1">
            我是children1我是children1我是children1我是children1我是children1我是children1我是children1我是children1我是children1我是children1我是children1我是children1我是children1我是children1我是children1我是children1
            <Collapse
              onChange={(index: string[]) =>
                console.log(index, "显示已展开的面板2")
              }
            >
              <Panel header="this is panel header 2" index="1">
                我是children2
              </Panel>
            </Collapse>
          </Panel>
          <Panel header="this is panel header 2" index="2">
            我是children2
          </Panel>
          <Panel header="this is panel header 3" index="3">
            我是children3
          </Panel>
        </Collapse>
      </div>

      <div className="Icon-wrapper">
        <Icon theme="primary" icon="coffee" size="10x" />
      </div>

      <div className="Input-wrapper">
        <Input
          style={{ width: 380, marginLeft: 10 }}
          // disabled
          size="medium"
          clearable
          // suffix="search"
          // prefix="coffee"
          // addonBefore={"https://"}
          // addonAfter={".com"}
          onChange={(val) => {
            console.log(val);
            setInputValue(val);
          }}
          placeholder="请输入内容"
        />
        <br />
        <span>{inputValue}</span>
      </div>
      <div className="AutoComplete-wrapper" style={{ maxWidth: 240 }}>
        <AutoComplete
          style={{ width: 240 }}
          fetchSuggestions={handleFetch}
          renderOptions={renderOptions}
          onSelect={(data) => {
            console.log(data);
          }}
        />
      </div>
      <div style={{ height: 200 }}>11111</div>
      <div className="Switch-wrapper">
        lisen
        <Switch
          defaultChecked={switchValue}
          disabled={switchDisabled}
          // activeColor="blue"
          // inactiveColor="black"
          // size="small"
          onChange={setSwitchValue}
        />
        <Button onClick={() => setSwitchDisabled(!switchDisabled)}>
          {JSON.stringify(switchValue)}
        </Button>
      </div>
    </>
  );
}

export default App;
