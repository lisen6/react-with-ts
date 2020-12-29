import React from "react";
import { storiesOf } from "@storybook/react";
import { action } from "@storybook/addon-actions";
import { Upload, UploadFile } from "./upload";

const defaultFileList: UploadFile[] = [
  {
    uid: "123",
    size: 1235,
    name: "hello.mid",
    status: "uploading",
    percentage: 30,
  },
  {
    uid: "124",
    size: 1235,
    name: "golang.mid",
    status: "success",
    percentage: 30,
  },
  {
    uid: "125",
    size: 1235,
    name: "ts.mid",
    status: "error",
    percentage: 30,
  },
];

const checkFileSize = (file: File) => {
  if (Math.round(file.size / 1024) > 100) {
    alert("file too big");
    return false;
  }
  return true;
};

const filePromise = (file: File) => {
  const newFile = new File([file], "new_name.docx", { type: file.type });
  return Promise.resolve(newFile);
};

const SimpleUpload = () => {
  return (
    <Upload
      // action="https://jsonplaceholder.typicode.com/posts/"
      action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
      onChange={action("change")}
      defaultFileList={defaultFileList}
      onRemove={action("removed")}
      name="fileName"
      // data={{ key: "val" }}
      // headers={{ "X-Power-By": "shift" }}
      accept=".jpg"
      multiple
      drag
    >
      拖拽上传
    </Upload>
  );
};

storiesOf("Upload component", module).add("Upload", SimpleUpload);
