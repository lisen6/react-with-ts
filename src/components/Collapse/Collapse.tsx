import React, { createContext } from "react";
// import { PanelProps } from "./Panel";

type onChangeCallback = (val: string[]) => void;

export interface CollapseProps {
  onChange?: onChangeCallback;
  defaultActiveKey?: string[];
  accordion?: Boolean;
  collapsible?: string;
}

interface ICollapseContext {
  defaultActiveKey: string[];
  onChange?: onChangeCallback;
  accordion?: Boolean;
  collapsible?: string;
}

export const CollapseContext = createContext<ICollapseContext>({
  defaultActiveKey: [],
});

const Collapse: React.FC<CollapseProps> = (props) => {
  const {
    onChange,
    children,
    defaultActiveKey,
    collapsible,
    accordion,
  } = props;

  const handleChange = (index: string[]) => {
    if (onChange) {
      onChange(index);
    }
  };
  const passedContext: ICollapseContext = {
    defaultActiveKey: defaultActiveKey || [],
    onChange: handleChange,
    accordion,
    collapsible,
  };

  const renderChild = () => {
    return React.Children.map(children, (child) => {
      const childElement: any = child;
      // as React.FunctionComponentElement<PanelProps>;
      const { displayName } = childElement.type;
      if (displayName === "Panel") {
        return React.cloneElement(childElement);
      } else {
        console.error("Warning: Collapse has a child which is not Panel");
      }
    });
  };

  return (
    <div style={{ border: "solid 1px #ccc" }}>
      <CollapseContext.Provider value={passedContext}>
        {renderChild()}
      </CollapseContext.Provider>
    </div>
  );
};

Collapse.defaultProps = {
  defaultActiveKey: [],
};

export default Collapse;
