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

export { default as Alert } from './components/Alert'

export { default as Animation } from './components/Animation'

export { default as AutoComplete } from './components/AutoComplete'

export { default as Avatar } from './components/Avatar'

export { default as Button } from './components/Button'

export { default as Checkbox } from './components/Checkbox'

export { default as Collapse } from './components/Collapse'

export { default as Panel } from './components/Collapse/Panel'

export { default as Hr } from './components/Hr'

export { default as Icon } from './components/Icon'

export { default as Input } from './components/Input'

export { default as Progress } from './components/Progress'

export { default as Radio } from './components/Radio'

export { default as Switch } from './components/Switch'

export { default as Tag } from './components/Tag'

export { default as Tree } from './components/Tree'

export { default as Upload } from './components/Upload'
