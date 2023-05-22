import React, { useState } from "react";

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

const AnimateXML = ({ animateElement }) => {
  const generateXML = (animateElement) => {
    const xml = `
      <animate 
        attributeType="${animateElement.attributeType}"
        attributeName="${animateElement.attributeName}"
        from="${animateElement.from}"
        to="${animateElement.to}"
        dur="${animateElement.dur}s"
      />
    `;
    return xml;
  };

  return (
    <div>
      <h3>Animate XML:</h3>
      {animateElement && (
        <pre>{generateXML(animateElement)}</pre>
      )}
    </div>
  );
};

const App = () => {
  const [animateElement, setAnimateElement] = useState(null);

  const handleAnimateChange = (animate) => {
    setAnimateElement(animate);
  };

  return (
    <div>
      <h1>SVG Animate Editor</h1>
      <AnimateForm onAnimateChange={handleAnimateChange} />
      <AnimateXML animateElement={animateElement} />
    </div>
  );
};

export default App;
