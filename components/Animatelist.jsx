import React, { useEffect, useState } from 'react';

const AnimateList = ({ svgElement }) => {
  // Array of SVG elements
  const [animateElements, setAnimateElements] = useState([]);

  // Filter 
  useEffect(() => {
    if (!svgElement) return;

    const animateElements = Array.from(svgElement.getElementsByTagName('animate'));
    setAnimateElements(animateElements);
  }, [svgElement]);

  const handleRestartAnimation = (animateElement) => {
    animateElement.beginElement();
  };

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
              <button onClick={() => handleRestartAnimation(animateElement)}>Reiniciar</button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default AnimateList;
