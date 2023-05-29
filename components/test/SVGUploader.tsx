import React, { useState } from "react";

interface SvgTreeView {
  type: string;
  attributes: Record<string, any>;
  children: SvgTreeView[];
}

interface SvgUploaderProps {
  onClick: (type: string) => void;
}

function parseSvgTree(
  element: Element,
  onClick: (type: string) => void
): SvgTreeView {
  const result: SvgTreeView = {
    type: element.tagName,
    attributes: {},
    children: [],
  };

  for (let i = 0; i < element.attributes.length; i++) {
    const attribute = element.attributes[i];
    result.attributes[attribute.name] = attribute.value;
  }

  if (
    element.tagName === "rect" ||
    element.tagName === "circle" ||
    element.tagName === "path" ||
    element.tagName === "g"
  ) {
    result.attributes.onClick = () => onClick(result.type);
  }

  for (let i = 0; i < element.children.length; i++) {
    const childElement = element.children[i] as Element;
    const child = parseSvgTree(childElement, onClick);
    result.children.push(child);
  }

  return result;
}

export default function SvgUploader({ onClick }: SvgUploaderProps) {
  const [svgFile, setSvgFile] = useState<File | null>(null);
  const [svgTree, setSvgTree] = useState<SvgTreeView | null>(null);
  const [svgDoc, setSvgDoc] = useState<string | null>(null);

  function handleUpload(event: React.ChangeEvent<HTMLInputElement>) {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();

      reader.onload = (e) => {
        const svgDoc = e.target?.result as string;
        const parser = new DOMParser();
        const svg = parser.parseFromString(svgDoc, "image/svg+xml");
        const tree = parseSvgTree(svg.documentElement, console.log);
        setSvgFile(file);
        setSvgDoc(svgDoc);
        setSvgTree(tree);
      };

      reader.readAsText(file);
    }
  }

  return (
    <div>
      <input type="file" accept=".svg" onChange={handleUpload} />
      {svgFile && <p>File name: {svgFile.name}</p>}
      {svgTree && (
        <pre>{JSON.stringify(svgTree, null, 2)}</pre>
      )}
      {svgDoc && (
        <div dangerouslySetInnerHTML={{ __html: svgDoc }} />
      )}
    </div>
  );
}