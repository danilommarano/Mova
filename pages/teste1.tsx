import React, { useRef, useState, ChangeEvent, useEffect } from 'react';
import * as d3 from 'd3';

interface LoadSVGButtonProps {
  onSVGChange: (svgString: string) => void;
}

// Botão que carrega o arquivo SVG
const LoadSVGButton: React.FC<LoadSVGButtonProps> = ({ onSVGChange }) => {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const content = e.target?.result;
        if (content) {
          const svgString = content.toString();
          onSVGChange(svgString);
        }
      };
      reader.readAsText(file);
    }
  };

  return (
    <div>
      <input type="file" accept=".svg" ref={fileInputRef} onChange={handleFileChange} />
    </div>
  );
};

interface SVGCanvasProps {
  svgDoc: string | null;
  onElementClick: (attributes: { name: string; value: string }[]) => void;
}

// Componente que renderiza o componente SVG
const SVGCanvas: React.FC<SVGCanvasProps> = ({ svgDoc, onElementClick }) => {
  const svgRef = useRef<SVGSVGElement>(null);

  const handleClick = (event: React.MouseEvent<SVGElement, MouseEvent>) => {
    const element = event.target as SVGElement;

    if (element.tagName !== 'path') return;

    const randomColor = `#${Math.floor(Math.random() * 16777215).toString(16)}`;
    d3.select(element).style('fill', randomColor);
    const attributes = Array.from(element.attributes).map((attr) => ({
      name: attr.name,
      value: attr.value,
    }));
    onElementClick(attributes);
  };

  useEffect(() => {
    if (!svgDoc) return;

    const svgElement = d3.select(svgRef.current!);
    svgElement.html(svgDoc);

    svgElement.selectAll('*').on('click', handleClick);
  }, [svgDoc]);

  return (
    <div>
      <svg ref={svgRef} />
    </div>
  );
};

interface SvgAttributesProps {
  attributes: { name: string; value: string }[];
}

// Componente que renderiza os atributos do elemento clicado
const SvgAttributes: React.FC<SvgAttributesProps> = ({ attributes }) => {
  return (
    <div>
      <h3>Element Attributes:</h3>
      <ul>
        {attributes.map((attr, index) => (
          <li key={index}>
            {attr.name}: {attr.value}
          </li>
        ))}
      </ul>
    </div>
  );
};

// App
const App: React.FC = () => {
  const [svgDoc, setSvgDoc] = useState<string | null>(null);
  const [selectedElementAttributes, setSelectedElementAttributes] = useState<{ name: string; value: string }[]>([]);

  const handleSVGChange = (svgString: string) => {
    setSvgDoc(svgString);
    setSelectedElementAttributes([]);
  };

  const handleElementClick = (attributes: { name: string; value: string }[]) => {
    setSelectedElementAttributes(attributes);
  };

  return (
    <div>
      <LoadSVGButton onSVGChange={handleSVGChange} />
      <SVGCanvas svgDoc={svgDoc} onElementClick={handleElementClick} />
      <SvgAttributes attributes={selectedElementAttributes} />
    </div>
  );
};

export default App;
