import React, { useState, useRef, useEffect } from "react";

const AnimateForm = ({ onAnimateChange }) => {
  const [attributeType, setAttributeType] = useState("");
  const [attributeName, setAttributeName] = useState("");
  const [from, setFrom] = useState("");
  const [to, setTo] = useState("");
  const [dur, setDur] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();

    const animateElement = {
      attributeType,
      attributeName,
      from,
      to,
      dur
    };

    onAnimateChange(animateElement);
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label htmlFor="attribute-type-input">Attribute Type:</label>
        <input
          id="attribute-type-input"
          type="text"
          value={attributeType}
          onChange={(event) => setAttributeType(event.target.value)}
        />
      </div>
      <div>
        <label htmlFor="attribute-name-input">Attribute Name:</label>
        <input
          id="attribute-name-input"
          type="text"
          value={attributeName}
          onChange={(event) => setAttributeName(event.target.value)}
        />
      </div>
      <div>
        <label htmlFor="from-input">From:</label>
        <input
          id="from-input"
          type="text"
          value={from}
          onChange={(event) => setFrom(event.target.value)}
        />
      </div>
      <div>
        <label htmlFor="to-input">To:</label>
        <input
          id="to-input"
          type="text"
          value={to}
          onChange={(event) => setTo(event.target.value)}
        />
      </div>
      <div>
        <label htmlFor="dur-input">Duration (seconds):</label>
        <input
          id="dur-input"
          type="text"
          value={dur}
          onChange={(event) => setDur(event.target.value)}
        />
      </div>
      <button type="submit">Create Animate</button>
    </form>
  );
};


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
        onElementClick(event);
      });
    });

    return () => {
      svgChildren.forEach((child) => {
        child.removeEventListener('click', () => {});
      });
    };
  }, [svgDoc, onElementClick]);

  return <div ref={svgRef} />;
}


const DownloadButton = ({ svgDoc }) => {
  const handleDownload = () => {
    const svgBlob = new Blob([svgDoc], { type: "image/svg+xml" });
    const url = URL.createObjectURL(svgBlob);

    const link = document.createElement("a");
    link.href = url;
    link.download = "image.svg";
    link.click();

    URL.revokeObjectURL(url);
  };

  return (
    <div>
      <button onClick={handleDownload}>Download SVG</button>
    </div>
  );
};

const SVGEditor = () => {
  const [svgDoc, setSvgDoc] = useState(null);
  const [clickedElement, setClickedElement] = useState(null);
  const [newAnimation, setNewAnimation] = useState(null);

  const handleSVGChange = (svgString) => {
    setSvgDoc(svgString);
  };

  const handleSVGElementClick = (svgElement) => {
    setClickedElement(svgElement.target.style.fill)
  };  

  const handleNewAnimation = (animation) => {
    setNewAnimation(animation);
  };

  return (
    <div>
      <h1>SVG Editor</h1>
      <AnimateForm />
      <LoadSVGButton onSVGChange={handleSVGChange} />
      {svgDoc && <SVGCanvas svgDoc={svgDoc} onElementClick={handleSVGElementClick} />}
      {svgDoc && <DownloadButton svgDoc={svgDoc} />}
    </div>
  );
};

export default SVGEditor;
