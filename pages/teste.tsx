import React, { useState, useEffect, useRef, ChangeEvent } from 'react';
import * as d3 from 'd3';

interface LoadSVGButtonProps {
  onSVGChange: (svgString: string) => void;
}

const LoadSVGButton: React.FC<LoadSVGButtonProps> = ({ onSVGChange }) => {
  const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    const reader = new FileReader();

    reader.onload = (event) => {
      const svgString = event.target?.result as string;
      onSVGChange(svgString);
    };

    reader.readAsText(file);
  };

  return (
    <input type="file" accept=".svg" onChange={handleFileChange} />
  );
}

interface SVGCanvasProps {
  svgDoc: string | null;
  onElementClick: () => void;
}

const SVGCanvas: React.FC<SVGCanvasProps> = ({ svgDoc, onElementClick }) => {
  const svgRef = useRef<HTMLDivElement>(null);

  const handleClick = (event: React.MouseEvent<SVGElement, MouseEvent>) => {
    const element = event.target as SVGElement;

    if (element.tagName !== 'path') return;

    const randomColor = `#${Math.floor(Math.random() * 16777215).toString(16)}`;
    d3.select(element).style('fill', randomColor);
  };

  useEffect(() => {
    if (!svgDoc) return;

    const svgElement = d3.select(svgRef.current!);
    svgElement.html(svgDoc);

    svgElement.selectAll('*').on('click', handleClick);
  }, [svgDoc]);

  return <div ref={svgRef} />;
}

const App: React.FC = () => {
  const [svgDoc, setSvgDoc] = useState<string | null>(null);

  const handleSVGChange = (svgString: string) => {
    setSvgDoc(svgString);
  };

  return (
    <div>
      <LoadSVGButton onSVGChange={handleSVGChange} />
      <SVGCanvas svgDoc={svgDoc} onElementClick={() => {}} />
    </div>
  );
}

export default App;
