import React, { useState, useContext } from 'react';

// Define the type of the SVG file
type SVGFile = string | ArrayBuffer | null;

// Define the type of the SVG context
interface SVGContextType {
  svgFile: SVGFile;
  setSVGFile: (svgFile: SVGFile) => void;
}

// Create the SVG context
export const SVGContext = React.createContext<SVGContextType>({
  svgFile: null,
  setSVGFile: () => {},
});

// Define the props for the SVGLoader component
interface SVGLoaderProps {}

// Define the SVGLoader component
const SVGLoader: React.FC<SVGLoaderProps> = () => {
  // Define the state for the selected SVG file
  const [selectedSVGFile, setSelectedSVGFile] = useState<SVGFile>(null);

  // Get the SVG context
  const { setSVGFile } = useContext(SVGContext);

  // Handle the change event when the user selects an SVG file
  const handleSVGFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];

    // Read the file contents as a data URL
    const reader = new FileReader();
    reader.onload = (event) => {
      setSelectedSVGFile(event.target?.result);
    };
    reader.readAsDataURL(file as Blob);
  };

  // Handle the click event when the user saves the SVG file to the context
  const handleSaveSVGFile = () => {
    setSVGFile(selectedSVGFile);
  };

  return (
    <div>
      <input type="file" accept=".svg" onChange={handleSVGFileChange} />
      <button disabled={!selectedSVGFile} onClick={handleSaveSVGFile}>
        Save SVG
      </button>
    </div>
  );
};

export default SVGLoader;
