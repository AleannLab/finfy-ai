"use client";

import { FC } from "react";
import { DropzoneComponent } from "../DropzoneComponent";

interface FileUploaderProps {}

const FileUploader: FC<FileUploaderProps> = ({}) => {
  return (
    <div className="w-full flex items-center justify-center">
      <DropzoneComponent
        name="Dropzone"
        onSubmit={() => console.log("FILES UPLOADED")}
        content="Upload a question"
        classes={{ wrapper: "border-0" }}
      />
    </div>
  );
};

export { FileUploader };
