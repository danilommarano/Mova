import React, { useState, useEffect, useRef } from 'react';

function LoadSVGButton({ onSVGChange }) {
  const handleFileChange = (event) => {
    const file = event.target.files[0];
    const reader = new FileReader();

    reader.onload = (event) => {
      const svgString = event.target.result;
      onSVGChange(svgString);
    };

    reader.readAsText(file);
  };

  return (
    <input type="file" accept=".svg" onChange={handleFileChange} />
  );
}

function SVGCanvas({ svgDoc, onElementClick }) {
  const svgRef = useRef();

  useEffect(() => {
    if (!svgDoc) return;

    const svgElement = svgRef.current;
    svgElement.innerHTML = svgDoc;

    const svgChildren = svgElement.querySelectorAll('*');
    svgChildren.forEach((child) => {
      child.addEventListener('click', (event) => {
        const randomColor = `#${Math.floor(Math.random() * 16777215).toString(16)}`;
        event.target.style.fill = randomColor;
      });
    });

    return () => {
      svgChildren.forEach((child) => {
        child.removeEventListener('click', () => {});
      });
    };
  }, [svgDoc]);

  return <div ref={svgRef} />;
}

export default function App() {
  const [svgDoc, setSvgDoc] = useState(null);

  const handleSVGChange = (svgString) => {
    setSvgDoc(svgString);
  };

  return (
    <div>
      <LoadSVGButton onSVGChange={handleSVGChange} />
      <SVGCanvas svgDoc={svgDoc} />
    </div>
  );
}
