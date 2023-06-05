import React, { useRef, useState } from 'react';
import CreateAnimateForm from '@/components/CreateAnimateForm';
import AnimateList from '@/components/AnimateList';

const App = () => {

  const selectedSVGChild = useRef(null);
  const [animateCounter, setAnimateCounter] = useState(0);

  const handleSvgClick = (e) => {
    selectedSVGChild.current = e.target;
  };

  const handleAnimateCreated = () => {
    setAnimateCounter((prevCounter) => prevCounter + 1);
  };

  return (
    <div>
      <svg onClick={handleSvgClick} width="400" height="400">
        <rect width="100" height="100" />
        <rect width="100" height="100" x="150" y="20" fill="#123456" />
      </svg>

      <CreateAnimateForm
        svgElementRef={selectedSVGChild}
        onAnimateCreated={handleAnimateCreated}
      />
      <AnimateList key={animateCounter} svgElement={selectedSVGChild.current} />
    </div>
  );
};

export default App;
