import React, { useState, createContext } from "react";
// import { PanelProps } from "./Panel";

type onChangeCallback = (val: string[]) => void;

export interface CollapseProps {
  /** 当前激活面板改变时触发 */
  onChange?: onChangeCallback;
  /** 当前激活 tab 面板的 key */
  defaultActiveKey?: string[];
  /** 手风琴模式, 是否每次只激活一个tab */
  accordion?: Boolean;
  collapsible?: string;
}

interface ICollapseContext {
  value: string[];
  setValue?: any;
  onChange?: onChangeCallback;
  accordion?: Boolean;
  collapsible?: string;
}

export const CollapseContext = createContext<ICollapseContext>({
  value: [],
});

/**
 * ## 引用方法
 * ~~~js
 * import { Collapse } from 'vikingShip'
 * ~~~
 *
 */
export const Collapse: React.FC<CollapseProps> = (props) => {
  const {
    onChange,
    children,
    defaultActiveKey,
    collapsible,
    accordion,
  } = props;

  const defaultValue =
    typeof defaultActiveKey === "undefined" ? [] : defaultActiveKey;
  const [value, setValue] = useState(defaultValue);

  const handleChange = (index: string[]) => {
    onChange?.(index);
  };
  const passedContext: ICollapseContext = {
    value,
    setValue,
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
    <div className="viking-Collapse">
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
