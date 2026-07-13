import { useEffect, useRef } from "react";

interface AdsterraBannerProps {
  adKey: string;
  width: number;
  height: number;
  className?: string;
}

/**
 * Injects an Adsterra iframe banner into an isolated container.
 * The atOptions global is set on a per-container basis before the invoke.js
 * script loads, following Adsterra's standard iframe banner snippet.
 */
export function AdsterraBanner({ adKey, width, height, className }: AdsterraBannerProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    // Clear any prior render (e.g. React strict-mode double-invoke)
    container.innerHTML = "";

    const configScript = document.createElement("script");
    configScript.type = "text/javascript";
    configScript.text = `atOptions = { 'key' : '${adKey}', 'format' : 'iframe', 'height' : ${height}, 'width' : ${width}, 'params' : {} };`;

    const invokeScript = document.createElement("script");
    invokeScript.type = "text/javascript";
    invokeScript.src = `//www.highperformanceformat.com/${adKey}/invoke.js`;
    invokeScript.async = true;

    container.appendChild(configScript);
    container.appendChild(invokeScript);

    return () => {
      container.innerHTML = "";
    };
  }, [adKey, width, height]);

  return (
    <div
      ref={containerRef}
      className={className}
      style={{ width, height, overflow: "hidden" }}
    />
  );
}
