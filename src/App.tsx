import React from "react";
import "./styles/index.scss";
import Button, { ButtonType, ButtonSize } from "./components/Button/button";

import Menu from "./components/Menu/menu";
import MenuItem from "./components/Menu/menuItem";

function App() {
  return (
    <>
      <div className="Button-wrapper">
        <Button
          onClick={(e) => console.log(e, 123)}
          btnType={ButtonType.Default}
        >
          Button
        </Button>
        <Button disabled btnType={ButtonType.Default}>
          Disabled Button
        </Button>
        <Button btnType={ButtonType.Primary} size={ButtonSize.Large}>
          Button Large
        </Button>
        <Button btnType={ButtonType.Danger} size={ButtonSize.Small}>
          Button Small
        </Button>

        <Button
          href="/baidu.com"
          btnType={ButtonType.Link}
          size={ButtonSize.Small}
        >
          Link
        </Button>
        <Button
          disabled
          href="/baidu.com"
          btnType={ButtonType.Link}
          size={ButtonSize.Small}
        >
          Disabled Link
        </Button>
      </div>
      <div className="Menu-wrapper">
        <Menu
          defaultIndex={0}
          mode="vertical"
          onSelect={(index) => console.log(index)}
        >
          <MenuItem>1</MenuItem>
          <MenuItem>2</MenuItem>
          <MenuItem>3</MenuItem>
        </Menu>
      </div>
    </>
  );
}

export default App;
