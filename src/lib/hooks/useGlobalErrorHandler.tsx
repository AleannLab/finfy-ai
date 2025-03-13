import { useEffect } from "react";
import * as Sentry from "@sentry/nextjs";

export function useGlobalErrorHandler() {
  useEffect(() => {
    const SafeRegExp = new Proxy(RegExp, {
      construct(target, args: ConstructorParameters<typeof RegExp>) {
        try {
          return new target(...args);
        } catch (error) {
          console.error("Error in RegExp:", error);
          Sentry.captureException(error);
          return new target(".*");
        }
      },
    });

    window.RegExp = SafeRegExp;

    const handleError: OnErrorEventHandler = (
      eventOrMessage: Event | string,
      source?: string,
      lineno?: number,
      colno?: number,
      error?: Error
    ) => {
      if (eventOrMessage instanceof Event) {
        console.error("Global Event Error detected:", eventOrMessage);
        Sentry.captureException(eventOrMessage);
      } else {
        console.error("Global error detected:", error || eventOrMessage);
        Sentry.captureException(error || new Error(String(eventOrMessage)));
      }

      event?.preventDefault?.();
      return true; 
    };

    const handlePromiseRejection = (event: PromiseRejectionEvent) => {
      console.error("Unhandled Promise Rejection:", event.reason);
      Sentry.captureException(event.reason);
      event?.preventDefault?.();
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
