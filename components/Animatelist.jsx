import React, { useEffect, useState } from 'react';
import LineWithBalls from './LineWithBalls';

const AnimateList = ({ svgElement, loadedSVG, animateCounter }) => {
  const [animateElements, setAnimateElements] = useState([]);

  useEffect(() => {
    if (!svgElement && !loadedSVG) return;

    const svgContent = svgElement ? svgElement.outerHTML : loadedSVG;
    const parser = new DOMParser();
    const svgDocument = parser.parseFromString(svgContent, 'image/svg+xml');
    const animElements = Array.from(svgDocument.getElementsByTagName('animate'));
    setAnimateElements(animElements);
  }, [svgElement, loadedSVG, animateCounter]);

  const calculateCirclePosition = (begin, dur) => {
    const maxValue = 10;
    const startPos = begin * maxValue;
    const endPos = (begin + dur) * maxValue;
    return [startPos, endPos];
  };

  return (
    <div className='p-4 h-fit max-h-96 min-h-20 w-full bg-[#353535] text-[#D9D9D9]'>
      {animateElements.length === 0 ? (
        <p>Nenhum elemento &lt;animate&gt; encontrado.</p>
      ) : (
        <ul className='flex flex-col gap-4'>
          {animateElements.map((animateElement, index) => {
            const begin = animateElement.getAttribute('begin') || 0;
            const dur = animateElement.getAttribute('dur');
            const [startPos, endPos] = calculateCirclePosition(begin, dur);

            return (
              <li key={index} className='flex gap-4 items-center'>
                <p className='whitespace-nowrap'>Animação #{index + 1}</p>
                <LineWithBalls ball1Position={startPos} ball2Position={endPos} />
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
};

export default AnimateList;
