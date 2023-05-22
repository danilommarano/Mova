import React, { useState, useEffect } from "react";
import * as d3 from "d3";

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

  return <input type="file" accept=".svg" onChange={handleFileChange} />;
}

function SVGCanvas({ svgDoc, onElementClick }) {
  const svgRef = React.useRef();

  React.useEffect(() => {
    if (!svgDoc) return;

    const svgElement = d3.select(svgRef.current);
    svgElement.html(svgDoc);

    svgElement.selectAll("*").on("click", (event, d) => {
      const randomColor = `#${Math.floor(Math.random() * 16777215).toString(
        16
      )}`;
      d3.select(event.target).style("fill", randomColor);
    });
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
