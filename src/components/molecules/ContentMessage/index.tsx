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
        const points = rows.map(row => {
          const [x, y] = row.split(",").map(Number);
          if (isNaN(x) || isNaN(y)) {
            console.error("Invalid point detected:", { x, y });
          }
          return { x, y };
        }).filter(point => !isNaN(point.x) && !isNaN(point.y)); // Filter out invalid points
      
        if (points.length === 0) {
          return <div>No valid data points to display</div>;
        }
      
        const labels = points.map(point => point.x);
        const dataset = {
          label: "Graph Data",
          data: points.map(point => point.y),
          borderColor: "#FBAB18",
          backgroundColor: "rgba(251, 171, 24, 0.2)",
          tension: 0.4,
          pointRadius: 3,
          pointBackgroundColor: "#272E48",
        };
      
        const data = {
          labels,
          datasets: [dataset],
        };
      
        const options = {
          responsive: true,
          plugins: {
            legend: {
              position: "top" as const, // Explicitly set as const to ensure correct typing
            },
            title: {
              display: true,
              text: "Graph Data Representation",
            },
          },
          scales: {
            x: {
              title: {
                display: true,
                text: "X-Axis",
              },
            },
            y: {
              title: {
                display: true,
                text: "Y-Axis",
              },
            },
          },
        };
        
      
        return <Line data={data} options={options} />;
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
       
  
      return children;
    },
  };



  function removeSpaceBeforePunctuation(text: string): string {
    return text.replace(/ (\.|\:)/g, '$1');
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
    console.log(text, "graphData")
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



  return (
    <div className="flex flex-col h-full">
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
          <Markdown
            className={"markdown !whitespace-normal markdown-special"}
            remarkPlugins={[remarkGfm, remarkMath]}
            rehypePlugins={[rehypeRaw, rehypeKatex]}
            components={renderers}
          >
            {adaptMarkdownForMath(text as string) as string}
          </Markdown>
        )}
      </p>
    </div>
  );
};

export { ContentMessage };
