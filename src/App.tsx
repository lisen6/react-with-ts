import React from "react";
import "./styles/index.scss";
import Button, { ButtonType, ButtonSize } from "./components/Button/button";

function App() {
  return (
    <div className="App" style={{}}>
      <Button onClick={(e) => console.log(e, 123)} btnType={ButtonType.Default}>
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
  );
}

export default App;
