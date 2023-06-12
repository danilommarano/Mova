import React, { useRef, useState } from 'react';
import CreateAnimateForm from '@/components/CreateAnimateForm';
import AnimateList from '@/components/AnimateList';
import SVGStructure from '@/components/SVGStructure';
import { FaPlay } from 'react-icons/fa';
import { FiUpload, FiDownload   } from 'react-icons/fi';


const App = () => {
  const selectedSVGChild = useRef(null);
  const rootSVG = useRef(null);
  const fileInputRef = useRef(null);
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

  const handleClick = () => {
    fileInputRef.current.click();
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
    <div className='flex w-full text-[#DBDBDB]'>
      <div className='flex flex-col h-screen w-96'>
        <CreateAnimateForm
          svgElementRef={selectedSVGChild}
          onAnimateCreated={handleAnimateCreated}
        />
        <SVGStructure key={animateCounter} svgElement={rootSVG.current} loadedSVG={loadedSVG} />
      </div>
      <div className='flex flex-col w-full'>
        <div className='relative grow'>
          <div className='absolute right-0'>
            <div className='flex gap-4'>
              <button className='flex gap-2 px-2 py-0.5 justify-center items-center bg-[#353535]' onClick={handleRestartAnimation}>
                <FaPlay /> 
              </button>
              <input
                type="file"
                accept=".svg"
                onChange={handleFileUpload}
                ref={fileInputRef}
                style={{ display: 'none' }}
              />
              <button onClick={handleClick} className='flex gap-2 px-2 py-0.5 justify-center items-center bg-[#353535]'>
                <FiUpload /> Abrir arquivo 
              </button>

              <button onClick={handleDownloadSVG} className='flex px-2 py-0.5 gap-2 justify-center items-center bg-[#353535]'>
                <FiDownload /> Baixar arquivo
              </button>
            </div>
          </div>
          <div className='flex h-full w-full justify-center items-center bg-black'>
            <div className='bg-white w-fit'>
              <svg ref={rootSVG} onClick={handleSvgClick} xmlns="http://www.w3.org/2000/svg" width="400" height="400">
                {loadedSVG && <g dangerouslySetInnerHTML={{ __html: loadedSVG }} />}
                {!loadedSVG && (
                  <>
                    <rect width="100" height="100" />
                    <rect width="100" height="100" x="150" y="20" fill="#123456" />
                  </>
                )}
              </svg>
            </div>
          </div>
        </div>
        <div className=''>
          <AnimateList animateCounter={animateCounter} svgElement={rootSVG.current} loadedSVG={loadedSVG} />
        </div>
      </div>

    </div>
  );
};

export default App;
