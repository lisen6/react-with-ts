// import React from "react";
// import ReactDOM from "react-dom";
// import "./styles/index.scss";
// import App from "./App";
// import reportWebVitals from "./reportWebVitals";

// ReactDOM.render(<App />, document.getElementById("root"));
// reportWebVitals();

import { library } from '@fortawesome/fontawesome-svg-core'
import { fas } from '@fortawesome/free-solid-svg-icons'
library.add(fas)

export { default as AutoComplete } from './components/AutoComplete'

export { default as Button } from './components/Button'

export { default as Menu } from './components/Menu'

export { default as Collapse } from './components/Collapse'

export { default as Panel } from './components/Collapse/Panel'

export { default as Icon } from './components/Icon'

export { default as Input } from './components/Input'

export { default as Progress } from './components/Progress'

export { default as Switch } from './components/Switch'

export { default as Upload } from './components/Upload'
