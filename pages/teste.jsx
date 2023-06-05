import React, { useEffect, useRef } from 'react';

const ResettableAnimate = () => {
  const animateRef = useRef(null);

  useEffect(() => {
    const animateElement = animateRef.current;

    const resetAnimation = () => {
      // Altera o atributo 'begin' da animação para que ela comece imediatamente
      animateElement.beginElement();
    };

    const handleResetClick = () => {
      resetAnimation();
    };

    // Reinicia a animação quando o componente é montado
    resetAnimation();

    // Adiciona um evento de clique para reiniciar a animação quando necessário
    const resetButton = document.getElementById('resetButton');
    resetButton.addEventListener('click', handleResetClick);

    return () => {
      // Remove o evento de clique quando o componente é desmontado
      resetButton.removeEventListener('click', handleResetClick);
    };
  }, []);

  return (
    <div>
      <svg width="400" height="400">
        <rect width="100" height="100">
          <animate
            ref={animateRef}
            attributeName="x"
            from="0"
            to="200"
            dur="2s"
          />
        </rect>
      </svg>
      <button id="resetButton">Reiniciar</button>
    </div>
  );
};

export default ResettableAnimate;
