import React, { useEffect, useState } from 'react';

const SVGStructure = ({ svgElement, loadedSVG }) => {
  const [svgStructure, setSVGStructure] = useState(null);

  useEffect(() => {
    if (!svgElement && !loadedSVG) return;

    const svgContent = svgElement ? svgElement.outerHTML : loadedSVG;
    const parser = new DOMParser();
    const doc = parser.parseFromString(svgContent, 'image/svg+xml');
    const structure = getSVGStructure(doc.documentElement, 0);
    setSVGStructure(structure);
  }, [svgElement, loadedSVG]);

  const getSVGStructure = (element, depth) => {
    const structure = {
      tagName: element.tagName,
      depth,
      children: [],
    };

    for (let i = 0; i < element.children.length; i++) {
      const child = element.children[i];
      const childStructure = getSVGStructure(child, depth + 1);
      structure.children.push(childStructure);
    }

    return structure;
  };

const renderSVGStructure = (structure) => {
  const paddingLeft = (structure.depth * 20) + 10;

  const divStyle = {
    paddingLeft: `${paddingLeft}px`,
  };

  return (
    <>
      <div style={divStyle} className='py-3 hover:bg-[#5F5F5F] border-y border-[#5F5F5F]'>
        {structure.tagName}
      </div>
      {structure.children.map((child) => renderSVGStructure(child))}
    </>
  );
};

  return (
    <div className='flex flex-col h-full bg-[#2D2D2E] text-[#DBDBDB] overflow-auto'>
      {svgStructure && renderSVGStructure(svgStructure)}
    </div>
  );
};

export default SVGStructure;
