import React from "react";
import "./styles/index.scss";
import Button from "./components/Button/button";

import Menu from "./components/Menu/menu";
import SubMenu from "./components/Menu/subMenu";
import MenuItem from "./components/Menu/menuItem";

import Collapse from "./components/Collapse/Collapse";
import Panel from "./components/Collapse/Panel";

import Icon from "./components/Icon/Icon";

function App() {
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

      <div className="Collapse-wrapper" style={{ maxWidth: 800 }}>
        <Collapse
          // defaultActiveKey={["1", "2", "3"]}
          // collapsible="disabled"
          onChange={(index: string[]) => console.log(index, "显示已展开的面板")}
        >
          <Panel header="this is panel header 1" index="1">
            我是children1我是children1我是children1我是children1我是children1我是children1我是children1我是children1我是children1我是children1我是children1我是children1我是children1我是children1我是children1我是children1
            <Collapse
              defaultActiveKey={["1"]}
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
          <Panel showArrow={false} header="this is panel header 3" index="3">
            我是children3
          </Panel>
        </Collapse>
      </div>
      <div className="Icon-wrapper">
        <Icon theme="primary" icon="coffee" size="10x" />
      </div>
    </>
  );
}

export default App;
