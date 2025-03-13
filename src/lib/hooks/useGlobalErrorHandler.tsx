import { useEffect } from "react";
import * as Sentry from "@sentry/nextjs";

export function useGlobalErrorHandler() {
  useEffect(() => {
    let isReloading = false;

    const SafeRegExp = new Proxy(RegExp, {
      construct(target, args: ConstructorParameters<typeof RegExp>) {
        try {
          return new target(...args);
        } catch (error) {
          console.error("Error in RegExp:", error);
          Sentry.captureException(error);
          safeReload();
          return new target(".*");
        }
      },
    });

    window.RegExp = SafeRegExp;

    const safeReload = () => {
      if (!isReloading) {
        isReloading = true;
        document.body.style.opacity = "0";
        setTimeout(() => {
          window.location.reload();
        }, 500);
      }
    };

    const handleError: OnErrorEventHandler = (
      eventOrMessage: Event | string,
      source?: string,
      lineno?: number,
      colno?: number,
      error?: Error
    ) => {
      if (eventOrMessage instanceof Event) {
        console.error("Global Event Error detected:", eventOrMessage);
      } else {
        console.error("Global error detected:", error || eventOrMessage);
      }

      event?.preventDefault?.();
      safeReload();
      return true; 
    };

    const handlePromiseRejection = (event: PromiseRejectionEvent) => {
      console.error("Unhandled Promise Rejection:", event.reason);
      event?.preventDefault?.();
      safeReload();
    };

    window.onerror = handleError;
    window.addEventListener("unhandledrejection", handlePromiseRejection);

    return () => {
      window.RegExp = RegExp;
      window.onerror = null;
      window.removeEventListener("unhandledrejection", handlePromiseRejection);
    };
  }, []);
}
