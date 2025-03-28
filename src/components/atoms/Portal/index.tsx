"use client";

import {
  PropsWithChildren,
  useEffect,
  useState,
  FC,
  CSSProperties,
} from "react";
import ReactDOM from "react-dom";

interface PortalProps extends PropsWithChildren {
  containerId?: string;
  className?: string;
  style?: CSSProperties;
  isDisabledPortal?: boolean;
}

const Portal: FC<PortalProps> = ({
  children,
  containerId,
  className,
  style,
  isDisabledPortal,
}) => {
  const [container, setContainer] = useState<HTMLElement | null>(null);

  useEffect(() => {
    if (!isDisabledPortal) {
      let createdContainer: HTMLElement;

      if (containerId) {
        createdContainer =
          document.getElementById(containerId) || document.createElement("div");
        if (!document.getElementById(containerId)) {
          createdContainer.id = containerId;
          document.body.appendChild(createdContainer);
        }
      } else {
        createdContainer = document.createElement("div");
        document.body.appendChild(createdContainer);
      }

      if (className) {
        createdContainer.className = className;
      }

      if (style) {
        Object.assign(createdContainer.style, style);
      }

      setContainer(createdContainer);

      return () => {
        if (createdContainer.parentElement) {
          createdContainer.parentElement.removeChild(createdContainer);
        }
      };
    }
  }, [containerId, className, style]);

  if (isDisabledPortal) {
    return children;
  }

  if (!container) {
    return null;
  }

  return ReactDOM.createPortal(children, container);
};

export { Portal };
