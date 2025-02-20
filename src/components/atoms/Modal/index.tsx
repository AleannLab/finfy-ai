"use client";

import clsx from "clsx";
import { FC, ReactNode, useEffect, MouseEvent, TouchEvent } from "react";

import { ModalBody } from "./ModalBody";
import { ModalFooter } from "./ModalFooter";
import { ModalHeader } from "./ModalHeader";
import { Portal } from "@/components/atoms";

interface ModalComponentProps {
  children: ReactNode;
  open: boolean;
  onClose?: () => void;
  classes?: {
    wrapper?: string;
    container?: string;
    background?: string;
  };
  isStopScroll?: boolean;
  isDisabledPortal?: boolean;
}

interface ModalComponentType extends ModalComponentProps {
  displayName?: string;
}

const ModalComponent: FC<ModalComponentType> = ({
  children,
  classes,
  onClose,
  open,
  isStopScroll,
  isDisabledPortal,
}) => {
  const handleClick = (
    event: MouseEvent<HTMLDivElement> | TouchEvent<HTMLDivElement>
  ) => {
    event.stopPropagation();
  };

  useEffect(() => {
    if (open && !isStopScroll) {
      document.body.style.overflow = "hidden";
      document.body.style.touchAction = "none";
    } else {
      document.body.style.overflow = "visible";
      document.body.style.touchAction = "auto";
    }
    return () => {
      document.body.style.overflow = "visible";
      document.body.style.touchAction = "auto";
    };
  }, [open]);

  if (!open) {
    return null;
  }
  return (
    <Portal isDisabledPortal={isDisabledPortal}>
      {onClose && (
        <div
          onClick={onClose}
          className={clsx(
            "fixed inset-0 backdrop-blur-md bg-black bg-opacity-20 z-[1000]",
            classes?.background
          )}
        ></div>
      )}
      <div
        onClick={() => onClose && onClose()}
        className={clsx(
          "fixed left-1/2 top-1/2 w-full flex justify-center items-center px-4 -translate-x-1/2 -translate-y-1/2 z-[1001]",
          classes?.wrapper
        )}
      >
        <div
          onClick={handleClick}
          className={clsx(
            "w-11/12 md:w-full max-h-11/12 p-6 relative overflow-auto relative",
            classes?.container
          )}
          role="dialog"
          aria-labelledby="modal"
        >
          <button
              onClick={onClose}
              className="absolute top-[24px] right-[24px]">
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path fill-rule="evenodd" clip-rule="evenodd"
                    d="M4.29289 4.29289C4.68342 3.90237 5.31658 3.90237 5.70711 4.29289L10 8.58579L14.2929 4.29289C14.6834 3.90237 15.3166 3.90237 15.7071 4.29289C16.0976 4.68342 16.0976 5.31658 15.7071 5.70711L11.4142 10L15.7071 14.2929C16.0976 14.6834 16.0976 15.3166 15.7071 15.7071C15.3166 16.0976 14.6834 16.0976 14.2929 15.7071L10 11.4142L5.70711 15.7071C5.31658 16.0976 4.68342 16.0976 4.29289 15.7071C3.90237 15.3166 3.90237 14.6834 4.29289 14.2929L8.58579 10L4.29289 5.70711C3.90237 5.31658 3.90237 4.68342 4.29289 4.29289Z"
                    fill="#374061"/>
            </svg>
          </button>
          {children}
        </div>
      </div>
    </Portal>
  );
};

ModalComponent.displayName = "Modal";
ModalHeader.displayName = "Modal.Header";
ModalBody.displayName = "Modal.Body";
ModalFooter.displayName = "Modal.Footer";

export const Modal = Object.assign(ModalComponent, {
  Header: ModalHeader,
  Body: ModalBody,
  Footer: ModalFooter,
});
