"use client";

import { useEffect, useState } from "react";

const termlyIds = {
  privacy: "2f319e91-3d85-4754-b2f6-37ce01699b9f",
  tos: "a76da4fe-6910-47f9-8fe2-e9cf506cf4ff",
  aup: "730375ba-62f5-4a92-b118-67f1c0c76313",
};

const FooterAuth = () => {
  const [activeDocument, setActiveDocument] = useState<"privacy" | "tos" | "aup" | null>(null);

  useEffect(() => {
    if (activeDocument) {
      const existingScript = document.getElementById("termly-embed-js");
      if (existingScript) {
        existingScript.remove();
      }
      const script = document.createElement("script");
      script.id = "termly-embed-js";
      script.src = "https://app.termly.io/embed-policy.min.js";
      script.async = true;
      document.body.appendChild(script);
    }
  }, [activeDocument]);

  useEffect(() => {
    return () => {
      const existingScript = document.getElementById("termly-embed-js");
      if (existingScript) {
        existingScript.remove();
      }
    };
  }, [activeDocument]);

  return (
    <footer className="flex flex-col relative text-white z-10 justify-center items-center w-full gap-4 mt-auto mb-6">
      <div className="text-center text-sm max-w-[430px] text-[#E9E9E9]">
        By continuing, you agree to Espen’s{" "}
        <span
          onClick={() => setActiveDocument("tos")}
          className="text-[#e9e9e9] cursor-pointer underline hover:no-underline"
        >
          Terms of Service
        </span>{" "}
        and{" "}
        <span
          onClick={() => setActiveDocument("privacy")}
          className="text-[#e9e9e9] cursor-pointer underline hover:no-underline"
        >
          Privacy Policy
        </span>
        , and acknowledge our{" "}
        <span
          onClick={() => setActiveDocument("aup")}
          className="text-[#e9e9e9] cursor-pointer underline hover:no-underline"
        >
          End User License Agreement
        </span>
        .
      </div>
      {activeDocument && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
          style={{ zIndex: 1000000 }}
        >
          <div className="bg-white rounded-lg p-6 w-11/12 max-w-2xl relative">
            <button
              className="absolute top-3 right-3 text-gray-600 hover:text-black"
              onClick={() => setActiveDocument(null)}
            >
              ✖
            </button>
            {/* <h2 className="text-lg font-semibold mb-4">
              {activeDocument === "tos"
                ? "Terms of Service"
                : activeDocument === "privacy"
                ? "Privacy Policy"
                : "End User License Agreement"}
            </h2> */}
            <div
              className="max-h-[80vh] overflow-auto thin-scroll"
              dangerouslySetInnerHTML={{
                __html: `<div name='termly-embed' data-id='${termlyIds[activeDocument]}'></div>`
              }}
            ></div>
          </div>
        </div>
      )}
      <style jsx>{`
        .thin-scroll::-webkit-scrollbar {
          width: 4px;
        }
        .thin-scroll::-webkit-scrollbar-thumb {
          background-color: rgba(0, 0, 0, 0.2);
          border-radius: 4px;
        }
      `}</style>
    </footer>
  );
};

export { FooterAuth };