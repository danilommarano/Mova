import React, { useRef, useState } from 'react';
import CreateAnimateForm from '@/components/CreateAnimateForm';
import AnimateList from '@/components/AnimateList';
import SVGStructure from '@/components/SVGStructure';

const App = () => {
  const selectedSVGChild = useRef(null);
  const rootSVG = useRef(null);
  const [animateCounter, setAnimateCounter] = useState(0);
  const [loadedSVG, setLoadedSVG] = useState(null);

  const handleSvgClick = (e) => {
    selectedSVGChild.current = e.target;
  };

  const handleAnimateCreated = () => {
    setAnimateCounter((prevCounter) => prevCounter + 1);
  };

  const handleRestartAnimation = () => {
    const animateElements = Array.from(rootSVG.current.getElementsByTagName('animate'));
    animateElements.forEach((animateElement) => {
      animateElement.beginElement();
    });
  };

  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();

    reader.onload = (event) => {
      const contents = event.target.result;
      setLoadedSVG(contents);
    };

    reader.readAsText(file);
  };

  return (
    <div>
      <svg ref={rootSVG} onClick={handleSvgClick} width="400" height="400">
        {loadedSVG && (
          <g dangerouslySetInnerHTML={{ __html: loadedSVG }} />
        )}
        {!loadedSVG && (
          <>
            <rect width="100" height="100" />
            <rect width="100" height="100" x="150" y="20" fill="#123456" />
          </>
        )}
      </svg>

      <CreateAnimateForm
        svgElementRef={selectedSVGChild}
        onAnimateCreated={handleAnimateCreated}
      />
      <AnimateList svgElement={rootSVG.current} loadedSVG={loadedSVG} />
      <button onClick={() => handleRestartAnimation()}>Teste</button>
      <input type="file" accept=".svg" onChange={handleFileUpload} />
      <SVGStructure svgElement={rootSVG.current} loadedSVG={loadedSVG} />
    </div>
  );
};

export default App;
