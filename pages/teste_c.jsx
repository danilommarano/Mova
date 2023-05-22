import React, { useState } from "react";

const UploadButton = ({ onFileUpload }) => {
  const handleFileChange = (event) => {
    const file = event.target.files[0];
    onFileUpload(file);
  };

  return (
    <div>
      <input type="file" accept=".svg" onChange={handleFileChange} />
    </div>
  );
};

const Canvas = ({ svgContent, onElementClick }) => {
  return (
    <div
      dangerouslySetInnerHTML={{ __html: svgContent }}
      onClick={onElementClick}
    />
  );
};

const DownloadButton = ({ svgContent }) => {
  const handleDownload = () => {
    const svgBlob = new Blob([svgContent], { type: "image/svg+xml" });
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

const SVGAnimator = ({ onElementClick }) => {
  const [animation, setAnimation] = useState({
    attributeName: "",
    from: "",
    to: "",
    dur: "",
    repeatCount: "",
  });

  const handleAttributeChange = (event) => {
    const { name, value } = event.target;
    setAnimation((prevAnimation) => ({
      ...prevAnimation,
      [name]: value,
    }));
  };

  const createAnimateElement = () => {
    const { attributeName, from, to, dur, repeatCount } = animation;
    const animateElement = document.createElementNS(
      "http://www.w3.org/2000/svg",
      "animate"
    );

    animateElement.setAttribute("attributeName", attributeName);
    animateElement.setAttribute("from", from);
    animateElement.setAttribute("to", to);
    animateElement.setAttribute("dur", dur);
    animateElement.setAttribute("repeatCount", repeatCount);

    return animateElement;
  };

  const handleElementClick = (event) => {
    const { target } = event;
    const animateElement = createAnimateElement();
    target.appendChild(animateElement);
    onElementClick();
  };

  return (
    <div>
      <h2>SVG Animator</h2>
      <form>
        <label>
          Attribute Name:
          <input
            type="text"
            name="attributeName"
            value={animation.attributeName}
            onChange={handleAttributeChange}
          />
        </label>
        <label>
          From:
          <input
            type="text"
            name="from"
            value={animation.from}
            onChange={handleAttributeChange}
          />
        </label>
        <label>
          To:
          <input
            type="text"
            name="to"
            value={animation.to}
            onChange={handleAttributeChange}
          />
        </label>
        <label>
          Duration (ms):
          <input
            type="number"
            name="dur"
            value={animation.dur}
            onChange={handleAttributeChange}
          />
        </label>
        <label>
          Repeat Count:
          <input
            type="number"
            name="repeatCount"
            value={animation.repeatCount}
            onChange={handleAttributeChange}
          />
        </label>
      </form>
      <div>
        <p>Click on an element in the SVG to add the animate element:</p>
        <Canvas onElementClick={handleElementClick} />
      </div>
    </div>
  );
};

const SVGEditor = () => {
  const [svgContent, setSvgContent] = useState(null);

  const handleFileUpload = (file) => {
    const reader = new FileReader();
    reader.onload = (event) => {
      setSvgContent(event.target.result);
    };
    reader.readAsText(file);
  };

  return (
    <div>
      <h1>SVG Editor</h1>
      <UploadButton onFileUpload={handleFileUpload} />
      {svgContent && <Canvas svgContent={svgContent} />}
      {svgContent && <DownloadButton svgContent={svgContent} />}
      {svgContent && (
        <SVGAnimator onElementClick={() => console.log("Element clicked")} />
      )}
    </div>
  );
};

export default SVGEditor;