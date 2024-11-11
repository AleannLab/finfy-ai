"use client";

import { Icon } from "@/components/atoms";
import { cn } from "@/lib/utils";
import { Classes } from "@/types";
import React, { useCallback, useEffect, useState } from "react";
import { useDropzone } from "react-dropzone";

interface DropzoneProps {
  maxFiles?: number;
  name: string;
  onSubmit: (files: { [key: string]: (Blob | MediaSource)[] }) => void;
  classes?: Classes;
  content?: string;
}

const DropzoneComponent = (props: DropzoneProps) => {
  const { maxFiles = 1, name, onSubmit, classes, content = 'Drop files to begin upload' } = props;
  const [files, setFiles] = useState<any>([]);

  const onDrop = useCallback((acceptedFiles: (Blob | MediaSource)[]) => {
    setFiles([...files, ...acceptedFiles]);
    const previewFiles = acceptedFiles.map((file: Blob | MediaSource) =>
      Object.assign(file, { preview: URL.createObjectURL(file) })
    );
  }, []);

  useEffect(() => {
    if (onSubmit && files.length) {
      onSubmit({ [name]: files });
      setFiles([]);
    }
  }, [files]);

  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    maxFiles,
    accept: { "image/*": [], 'application/pdf': [] },
  });

  return (
    <div
      {...getRootProps()}
      className={cn(
        "rounded-md w-full justify-center items-center flex py-6 cursor-pointer",
        classes?.wrapper
      )}
    >
      <input {...getInputProps()} />
      <p className="text-2xl font-semibold flex flex-col items-center gap-2">
        <Icon type="DocumentIcon" className="w-6 h-6 stroke-white" />
        {content}
        <p className="text-2xl font-semibold ">or</p>
        <p className="text-purple-15">browse</p>
      </p>
    </div>
  );
};

export { DropzoneComponent };
