import React, { useContext, useEffect, useRef } from 'react';

// Import the SVG context
import { SVGContext } from './SVGLoader';

// Define the props for the SVGCanvas component
interface SVGCanvasProps {}

// Define the SVGCanvas component
const SVGCanvas: React.FC<SVGCanvasProps> = () => {
  // Get the SVG context
  const { svgFile } = useContext(SVGContext);

  // Create a ref for the canvas element
  const canvasRef = useRef<HTMLCanvasElement>(null);

  // Draw the SVG on the canvas
  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext('2d');

    // Load the SVG file
    const img = new Image();
    img.src = svgFile as string;

    // Draw the SVG on the canvas
    img.onload = () => {
      ctx?.drawImage(img, 0, 0);
    };
  }, [svgFile]);

  return <canvas ref={canvasRef} />;
};

export default SVGCanvas;
