import React, { useState } from "react";
import { parse } from "svg-parser";

interface ScreenProps {
  svgDocument: Element | null;
}

function Screen({ svgDocument }: ScreenProps) {
  return (
    <div>
      {svgDocument && <div dangerouslySetInnerHTML={{ __html: svgDocument.outerHTML }} />}
    </div>
  );
}

export default function Button() {
  const [svgDocument, setSvgDocument] = useState<Element | null>(null);

  function handleUpload(event: React.ChangeEvent<HTMLInputElement>) {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        const svgText = event.target?.result as string;
        const svgParser = new DOMParser();
        const svgDom = svgParser.parseFromString(svgText, "image/svg+xml");
        const svgParsed = parse(svgDom.documentElement.outerHTML);
        setSvgDocument(svgParsed);
      };
      reader.readAsText(file);
    }
  }

  return (
    <div>
      <input type="file" accept=".svg" onChange={handleUpload} />
      <Screen svgDocument={svgDocument} />
    </div>
  );
}
