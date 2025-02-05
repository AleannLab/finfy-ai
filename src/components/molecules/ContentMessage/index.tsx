"use client";

import { Icon } from "@/components/atoms";
import { cn } from "@/lib/utils";
import { ChevronDownIcon, ChevronUpIcon } from "lucide-react";
import React, { FC, ReactNode, useState } from "react";
import Markdown from "react-markdown";
import remarkGfm from 'remark-gfm';
import rehypeRaw from 'rehype-raw';
import remarkMath from 'remark-math';
import rehypeKatex from 'rehype-katex';
import 'katex/dist/katex.min.css';
import { useChat } from "@/hooks";
import { supabase } from "@/lib/supabase/client";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import dynamic from 'next/dynamic';


// Register Chart.js components
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

interface ContentMessageProps {
  text: ReactNode;
  isUser: boolean;
  isLoading?: boolean;
  isLastMessage?: boolean;
  files?: File[];
}

const ContentMessage: FC<ContentMessageProps> = ({
  text,
  files = [],
  isUser,
  isLoading,
  isLastMessage,
}) => {
  const [openDropdowns, setOpenDropdowns] = useState<Record<number, boolean>>({});
  const { streamMessage } = useChat();

  const toggleDropdown = (index: number) => {
    setOpenDropdowns((prev) => ({
      ...prev,
      [index]: !prev[index],
    }));
  };

  const IconStart = () => (
    <svg
      width="20"
      height="21"
      viewBox="0 0 20 21"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M3 1.5V5.5M1 3.5H5M4 15.5V19.5M2 17.5H6M11 1.5L13.2857 8.35714L19 10.5L13.2857 12.6429L11 19.5L8.71429 12.6429L3 10.5L8.71429 8.35714L11 1.5Z"
        stroke="white"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );

  const renderers = {
    details: ({ children, node }: any) => {
      const index = node.position?.start.offset ?? Math.random();
      const isOpen = openDropdowns[index] || false;

      return (
        <div className="my-4 border border-[#374061] rounded-lg overflow-hidden">
          {children.map((child: any) =>
            child.type === "summary" ? (
              <button
                key={index}
                onClick={() => toggleDropdown(index)}
                className={cn(
                  "w-full flex justify-between hover:bg-white hover:bg-opacity-5 duration-300 items-center px-4 py-3 text-lg font-semibold text-[#547a91]  rounded-lg transition-all", isOpen ? " mb-4" : ""
                )}
              >
                <div className="flex items-center gap-4">
                  <IconStart />
                  <span>{child.props.children}</span>
                </div>
                {isOpen ? <ChevronUpIcon /> : <ChevronDownIcon />}
              </button>
            ) : (
              <div
                key={`${index}-content`}
                className={cn(
                  "transition-all duration-500 ease-in-out",
                  isOpen ? "max-h-screen opacity-100" : "max-h-0 opacity-0"
                )}
                style={{
                  maxHeight: isOpen ? "10000px" : "0px",
                  overflow: isOpen ? "visible" : "hidden",
                }}
              >
                <div className="px-4">
                  <div
                    className="overflow-x-auto"
                    style={{ maxWidth: "100%" }}
                  >
                    {child}
                  </div>
                </div>
              </div>
            )
          )}
        </div>
      );
    },
    table: ({ children }: any) => (
      <div className="overflow-x-auto w-full">
        <table
          className="w-full border-collapse border border-gray-700"
          style={{ marginBottom: "16px" }}
        >
          {children}
        </table>
      </div>
    ),
    a: ({ children, node }: any) => {
      const href = node?.properties?.href || '#';

      return (
        <a target="_blank" href={href} className="underline text-blue-700">
          {children}
        </a>
      );
    },
    div: ({ node, children }: any) => {
      const graphId = node?.properties?.id;
      const shapeId = node?.properties?.id;
      const dataRaw = children;

      if (graphId === "GraphId" && typeof dataRaw === "string") {
        let parsedData;
        try {
          parsedData = JSON.parse(dataRaw);
        } catch (error) {
          console.error("Error parsing JSON for graph:", error);
          return <div>Error parsing graph data</div>;
        }

        const csvData = parsedData?.data;
        if (typeof csvData !== "string" || !parsedData?.data) {
          return <div>Invalid graph data</div>;
        }

        const rows = csvData.split("\n").filter(row => row.trim() !== "");

        const points = rows
          .map(row => {
            const [x, y] = row.split(",").map(Number);
            if (isNaN(x) || isNaN(y)) {
              console.error("Invalid point detected:", { x, y });
            }
            return { x, y };
          })
          .filter(point => !isNaN(point.x) && !isNaN(point.y));

        if (points.length === 0) {
          return <div>No valid data points to display</div>;
        }

        const interpolatedPoints = [];
        for (let i = 0; i < points.length - 1; i++) {
          interpolatedPoints.push(points[i]);
          const midX = (points[i].x + points[i + 1].x) / 2;
          const midY = (points[i].y + points[i + 1].y) / 2;
          interpolatedPoints.push({ x: midX, y: midY });
        }
        interpolatedPoints.push(points[points.length - 1]);

        let minX = Math.min(...interpolatedPoints.map(p => p.x));
        let maxX = Math.max(...interpolatedPoints.map(p => p.x));
        let minY = Math.min(...interpolatedPoints.map(p => p.y));
        let maxY = Math.max(...interpolatedPoints.map(p => p.y));

        minX = Math.min(minX, 0);
        maxX = Math.max(maxX, 0);
        minY = Math.min(minY, 0);
        maxY = Math.max(maxY, 0);

        if (minX === maxX) {
          minX -= 1;
          maxX += 1;
        }
        if (minY === maxY) {
          minY -= 1;
          maxY += 1;
        }

        const yPadding = (maxY - minY) * 0.001;
        const minYWithPadding = minY - yPadding;
        const maxYWithPadding = maxY + yPadding;

        const width = 600;
        const height = 500;
        const padding = 60;

        const scaleX = (x: number) =>
          ((x - minX) / (maxX - minX)) * (width - 2 * padding) + padding
        const scaleY = (y: number) =>
          height -
          ((y - minYWithPadding) / (maxYWithPadding - minYWithPadding)) *
          (height - 2 * padding) -
          padding;

        const polylinePoints = interpolatedPoints
          .map(({ x, y }) => `${scaleX(x)},${scaleY(y)}`)
          .join(" ");

        const TICK_COUNT = 5;
        function generateTicks(minVal: number, maxVal: number) {
          const step = (maxVal - minVal) / (TICK_COUNT - 1);
          const arr: number[] = [];
          for (let i = 0; i < TICK_COUNT; i++) {
            const val = minVal + i * step;
            arr.push(parseFloat(val.toFixed(2)));
          }
          return Array.from(new Set(arr));
        }

        const xTicks = generateTicks(minX, maxX);
        const yTicks = generateTicks(minYWithPadding, maxYWithPadding);

        return (
          <div className="svg-container p-3 w-full h-auto lg:p-10">
            <svg
              width="100%"
              height="100%"
              viewBox={`0 0 ${width} ${height}`}
              style={{ border: "1px solid #ccc" }}
            >
              {[...Array(10)].map((_, i) => {
                const x = padding + (i / 9) * (width - 2 * padding);
                const y = padding + (i / 9) * (height - 2 * padding);
                return (
                  <React.Fragment key={i}>
                    <line
                      x1={x}
                      y1={padding}
                      x2={x}
                      y2={height - padding}
                      stroke="#ddd"
                      strokeWidth="1"
                    />
                    <line
                      x1={padding}
                      y1={y}
                      x2={width - padding}
                      y2={y}
                      stroke="#ddd"
                      strokeWidth="1"
                    />
                  </React.Fragment>
                );
              })}

              <line
                x1={scaleX(0)}
                y1={padding}
                x2={scaleX(0)}
                y2={height - padding}
                stroke="black"
                strokeWidth="2"
              />
              <line
                x1={padding}
                y1={scaleY(0)}
                x2={width - padding}
                y2={scaleY(0)}
                stroke="black"
                strokeWidth="2"
              />

              <polyline fill="none" stroke="blue" strokeWidth="3" points={polylinePoints} />

              <text x={scaleX(0) - 4} y={padding - 20} fontSize="14" fill="black">
                Y
              </text>
              <text x={width - padding + 25} y={scaleY(0) + 15} fontSize="14" fill="black">
                X
              </text>

              {xTicks.map((val, i) => (
                <text
                  key={`xTick-${i}`}
                  x={scaleX(val)}
                  y={scaleY(0) + 15}
                  fontSize="12"
                  fill="black"
                  textAnchor="middle"
                >
                  {val}
                </text>
              ))}

              {yTicks.map((val, i) => (
                <text
                  key={`yTick-${i}`}
                  x={scaleX(0) - 10}
                  y={scaleY(val) + 4}
                  fontSize="12"
                  fill="black"
                  textAnchor="end"
                >
                  {val}
                </text>
              ))}
            </svg>
          </div>
        );
      }


      if (shapeId === "ShapeId" && typeof dataRaw === "string") {
        let parsedData;
        try {
          parsedData = JSON.parse(dataRaw);
        } catch (error) {
          console.error("Error parsing JSON for shape:", error);
          return <div>Error parsing shape data</div>;
        }

        const { shapeType, dimensions, color, points } = parsedData;

        const width = 400;
        const height = 300;
        const padding = 40;

        switch (shapeType) {
          // case "circle":
          //   if (dimensions?.radius) {
          //     // Scaling logic for the circle
          //     const scaleFactor = 50; // Adjusting factor for better visibility
          //     const radius = 50 * scaleFactor;
          //     const numPoints = 100; // Number of points to approximate the circle

          //     const circlePoints = Array.from({ length: numPoints }, (_, i) => {
          //       const angle = (i / numPoints) * 2 * Math.PI;
          //       const x = radius + radius * Math.cos(angle);
          //       const y = radius + radius * Math.sin(angle);
          //       return `${x},${y}`;
          //     }).join(" ");

          //     return (
          //       <svg
          //         width={radius * 2 + padding}
          //         height={radius * 2 + padding}
          //         radius={radius}
          //         viewBox={`0 0 ${radius * 2 + padding} ${radius * 2 + padding}`}
          //       >
          //         <polyline
          //           fill={"red"}
          //           // fill={color || "blue"}
          //           stroke={color || "blue"}
          //           strokeWidth="2"
          //           points={circlePoints}
          //         />
          //       </svg>
          //     );
          //   }
          //   return <div>Error: Missing radius for circle.</div>;

          case "polygon":
            if (points && Array.isArray(points)) {
              // Find min/max values to create a dynamic scaling factor
              const minX = Math.min(...points.map(p => p.x));
              const maxX = Math.max(...points.map(p => p.x));
              const minY = Math.min(...points.map(p => p.y));
              const maxY = Math.max(...points.map(p => p.y));

              // Guard against invalid min/max values
              if (minX === maxX || minY === maxY) {
                console.error("Invalid range for polygon scaling");
                return <div>Error with polygon data range</div>;
              }

              const scaleX = (x: number) => ((x - minX) / (maxX - minX)) * (width - 2 * padding) + padding;
              const scaleY = (y: number) => height - ((y - minY) / (maxY - minY)) * (height - 2 * padding) - padding;

              const polygonPoints = points
                .map(({ x, y }) => `${scaleX(+x)},${scaleY(+y)}`)
                .join(" ");

              return (
                <svg width={width / 10} height={height / 10} viewBox={`0 0 ${width / 10} ${height / 10}`}>
                  <polygon points={polygonPoints} fill={color || "green"} stroke={color || "black"} strokeWidth="2" />
                </svg>
              );
            }
            return <div>Error: Missing points for polygon.</div>
          default:
            return <div>Error: Unsupported shape type.</div>;
        }
      }


      return <div className="markdown !whitespace-normal markdown-special">{children}</div>;
    },


  };

  function removeSpaceBeforePunctuation(text: string): string {
    return text?.replace(/ (\.|\:)/g, '$1');
  }


  function adaptMarkdownForMath(text: string): string {
    const newlinePlaceholder = '__NEWLINE__';
    text = text.replace(/\n/g, newlinePlaceholder);
    // Handle \begin{align*} blocks
    text = text.replace(/\\begin\{align\*\}(.*?)\\end\{align\*\}/gs, (_, content: string) => {
      // Split the content into lines and wrap each in $...$
      return content
        .split(/\\\\/)
        .map(line => ` $ __NEWLINE__ ${line.replace(/&/g, '').trim()} __NEWLINE__ $ `)
        .join('__NEWLINE__');
    });
    text = text.replace(/\\\[(.*?)\\\]/gs, (_, formula: string) => ` $$ ${formula.trim()} $$ `);
    text = text.replace(/\\\((.*?)\\\)/g, (_, formula: string) => ` $$ ${formula.trim()} $$ `);
    text = text.replace(/\$\$\s+/g, '$$ ').replace(/\s+\$\$/g, ' $$');
    text = text.replace(/\s*(\$\$)\s*([.:])/g, '$1$2');
    text = text.replace(/([.:])\s+(\$\$)/g, '$1$2');
    text = text.replace(new RegExp(newlinePlaceholder, 'g'), '\n');
    return removeSpaceBeforePunctuation(text);
  }

  if (isUser) {
    return (
      <div className="min-h-[88px] flex-col p-8 bg-[#daede6] rounded-xl border border-[#f3f9ed] justify-center items-end gap-2.5 inline-flex">
        <div className="text-[#272e48] text-base font-normal leading-normal">{text}</div>
        <div className="flex overflow-hidden gap-4">
          {files?.map((file: any) => {
            if (file?.preview) {
              console.log("publicURL", file?.preview)
              // eslint-disable-next-line @next/next/no-img-element
              return <img width={300} key={file?.preview} alt={file?.path} src={file?.preview} />
            }
          })}
        </div>
      </div>
    )
  }

  function splitByBoltParagraphs(text: string): Array<{ type: "html" | "markdown"; content: string }> {
    const regex = /(<p className="bolt">[\s\S]*?<\/p>)(\s*\n\n)/gi;

    const parts: Array<{ type: "html" | "markdown"; content: string }> = [];
    let lastIndex = 0;

    text?.replace(regex, (match, _, index) => {
      if (index > lastIndex) {
        parts.push({ type: "markdown", content: text.slice(lastIndex, index) });
      }
      parts.push({ type: "html", content: match });
      lastIndex = index + match.length;
      return match;
    });

    if (lastIndex < text.length) {
      parts.push({ type: "markdown", content: text.slice(lastIndex) });
    }

    return parts;
  }



  return (
    <div className="flex flex-col w-full h-full">
      {!isUser && !isLoading && (
        <div className="flex items-center gap-4 mb-4">
          <span className="w-8 h-8">
            <Icon height="32px" width="32px" type="LogoChatIcon" />
          </span>
          <span className="text-[#272E48] text-2xl leading-3 font-medium">
            {isLastMessage ? "Answer" : "Career Buddy"}
          </span>
          <span className="text-[rgb(97,103,125)] mt-2 text-sm">
            {(isLastMessage && !!streamMessage?.length) && ("(typing...)")}
          </span>
        </div>
      )}

      <p
        className={cn(
          "whitespace-pre-line text-[#272E48] font-normal leading-[14px] md:leading-8",
          isUser
            ? "text-2xl md:text-4xl font-bold flex gap-2.5 items-center"
            : "text-sm md:text-base"
        )}
      >
        {isUser || isLoading ? (
          text
        ) : (
          <>
            {!!streamMessage?.length ? <>
              <Markdown
                className={"markdown !whitespace-normal markdown-special"}
                remarkPlugins={[remarkGfm, remarkMath]}
                rehypePlugins={[rehypeRaw, rehypeKatex]}
                components={renderers}
              >
                {adaptMarkdownForMath(text as string) as string}
              </Markdown>
            </> :
              <>
                {splitByBoltParagraphs(text as string).map((part, index) =>
                  part.type === "html" ? (
                    <Markdown
                      key={index}
                      className={"markdown !whitespace-normal markdown-special"}
                      remarkPlugins={[remarkGfm, remarkMath]}
                      rehypePlugins={[rehypeRaw, rehypeKatex]}
                      components={renderers}
                    >
                      {adaptMarkdownForMath(part?.content as string) as string}
                    </Markdown>
                  ) : (
                    <Markdown
                      key={index}
                      className={"markdown !whitespace-normal markdown-special"}
                      remarkPlugins={[remarkGfm, remarkMath]}
                      rehypePlugins={[rehypeRaw, rehypeKatex]}
                      components={renderers}
                    >
                      {adaptMarkdownForMath(part?.content?.replace("</p>", "") as string) as string}
                    </Markdown>
                  )
                )}
              </>}
          </>
        )}
      </p>
    </div>
  );
};

export { ContentMessage };
