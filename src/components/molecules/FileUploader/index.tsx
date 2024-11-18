"use client";

import { FC } from "react";
import { DropzoneComponent } from "../DropzoneComponent";

interface FileUploaderProps { onSubmit: any }

const FileUploader: FC<FileUploaderProps> = ({onSubmit}) => {
  return (
    <div className="w-full flex items-center justify-center">
      <DropzoneComponent
        name="Dropzone"
        onSubmit={onSubmit}
        content="Upload a question"
        classes={{ wrapper: "border-0" }}
      />
    </div>
  );
};

export { FileUploader };
