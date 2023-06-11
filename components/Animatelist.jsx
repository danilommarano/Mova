import React, { useEffect, useState } from 'react';

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

  return (
    <div>
      <h3>Lista de elementos &lt;animate&gt;</h3>
      {animateElements.length === 0 ? (
        <p>Nenhum elemento &lt;animate&gt; encontrado.</p>
      ) : (
        <ul>
          {animateElements.map((animateElement, index) => (
            <li key={index}>
              Elemento #{index + 1}
              <ul>
                <li>Atributo: attributeName = {animateElement.getAttribute('attributeName')}</li>
                <li>Atributo: from = {animateElement.getAttribute('from')}</li>
                <li>Atributo: to = {animateElement.getAttribute('to')}</li>
                <li>Atributo: dur = {animateElement.getAttribute('dur')}</li>
              </ul>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default AnimateList;
