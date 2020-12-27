import React, { DragEvent, FC, useState } from "react";
import classNames from "classnames";

interface DraggerProps {
  onFile?: (file: FileList) => void;
}

export const Dragger: FC<DraggerProps> = (props) => {
  const { onFile, children } = props;

  const [dragOver, setDragOver] = useState(false);

  const dragClass = classNames("viking-upload-dragger", {
    "is-dragOver": dragOver,
  });

  const handleDrag = (e: DragEvent<HTMLElement>, over: boolean) => {
    console.log(1, over ? "我是over" : "我是leave");
    e.preventDefault();
    setDragOver(over);
  };

  return (
    <div
      className={dragClass}
      onDragEnter={(e) => console.log("我被触发了")}
      onDragOver={(e) => handleDrag(e, true)}
      onDragLeave={(e) => handleDrag(e, false)}
    >
      {children}
    </div>
  );
};

export default Dragger;
