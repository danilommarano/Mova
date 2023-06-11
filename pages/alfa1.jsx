import React, { useRef, useState } from 'react';
import CreateAnimateForm from '@/components/CreateAnimateForm';
import AnimateList from '@/components/AnimateList';
import SVGStructure from '@/components/SVGStructure';

const App = () => {
  const selectedSVGChild = useRef(null);
  const rootSVG = useRef(null);
  const [animateCounter, setAnimateCounter] = useState(0);
  const [loadedSVG, setLoadedSVG] = useState(null);
  const [isSVGLoaded, setIsSVGLoaded] = useState(false);

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
      setIsSVGLoaded(true);
    };

    reader.readAsText(file);
  };

  const handleDownloadSVG = () => {
    let svgContent;
    let fileName;
    if (isSVGLoaded) {
      svgContent = loadedSVG;
      fileName = 'loaded.svg';
    } else {
      svgContent = rootSVG.current.outerHTML;
      fileName = 'root.svg';
    }

    const blob = new Blob([svgContent], { type: 'image/svg+xml' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = fileName;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  return (
    <div className='flex '>
      <div className='flex flex-col h-screen w-96'>
        <CreateAnimateForm
          svgElementRef={selectedSVGChild}
          onAnimateCreated={handleAnimateCreated}
        />
        <SVGStructure key={animateCounter} svgElement={rootSVG.current} loadedSVG={loadedSVG} />
      </div>
      <div>
        <button onClick={handleRestartAnimation}>Teste</button>
        <input type="file" accept=".svg" onChange={handleFileUpload} />
        <button onClick={handleDownloadSVG}>Baixar SVG</button>
        <svg ref={rootSVG} onClick={handleSvgClick} xmlns="http://www.w3.org/2000/svg" width="400" height="400">
          {loadedSVG && <g dangerouslySetInnerHTML={{ __html: loadedSVG }} />}
          {!loadedSVG && (
            <>
              <rect width="100" height="100" />
              <rect width="100" height="100" x="150" y="20" fill="#123456" />
            </>
          )}
        </svg>
        <AnimateList animateCounter={animateCounter} svgElement={rootSVG.current} loadedSVG={loadedSVG} />
      </div>

    </div>
  );
};

export default App;
