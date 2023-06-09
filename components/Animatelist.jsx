import React, { useEffect, useState } from 'react';

const AnimateList = ({ svgElement, loadedSVG }) => {
  const [animateElements, setAnimateElements] = useState([]);

  useEffect(() => {
    if (!svgElement && !loadedSVG) return;

    const svgContent = loadedSVG ? loadedSVG : svgElement.outerHTML;
    const parser = new DOMParser();
    const svgDocument = parser.parseFromString(svgContent, 'image/svg+xml');
    const animateElements = Array.from(svgDocument.getElementsByTagName('animate'));
    setAnimateElements(animateElements);
  }, [svgElement, loadedSVG]);

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
