import React, { useEffect, useState } from 'react';

const SVGStructure = ({ svgElement, loadedSVG }) => {
  const [svgStructure, setSVGStructure] = useState(null);

useEffect(() => {
  if (!svgElement && !loadedSVG) return;

  const svgContent = svgElement ? svgElement.outerHTML : loadedSVG;
  const parser = new DOMParser();
  const doc = parser.parseFromString(svgContent, 'image/svg+xml');
  const structure = getSVGStructure(doc.documentElement);
  setSVGStructure(structure);
}, [svgElement, loadedSVG]);


  const getSVGStructure = (element) => {
    const structure = {};

    structure.tagName = element.tagName;
    structure.attributes = {};
    for (let i = 0; i < element.attributes.length; i++) {
      const attribute = element.attributes[i];
      structure.attributes[attribute.name] = attribute.value;
    }

    structure.children = [];
    for (let i = 0; i < element.children.length; i++) {
      const child = element.children[i];
      structure.children.push(getSVGStructure(child));
    }

    return structure;
  };

  return (
    <div>
      <h3>Estrutura do Documento SVG</h3>
      {svgStructure ? (
        <pre>{JSON.stringify(svgStructure, null, 2)}</pre>
      ) : (
        <p>Nenhum documento SVG encontrado.</p>
      )}
    </div>
  );
};

export default SVGStructure;
