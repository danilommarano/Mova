import React, { useRef, useState } from 'react';

const CreateAnimateForm = ({ svgElementRef, onAnimateCreated }) => {
  const [fromValue, setFromValue] = useState('');
  const [toValue, setToValue] = useState('');
  const [duration, setDuration] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!svgElementRef.current) {
      console.error('Referência inválida para o elemento SVG.');
      return;
    }

    const animateElement = document.createElementNS(
      'http://www.w3.org/2000/svg',
      'animate'
    );
    animateElement.setAttribute('attributeName', 'rx');
    animateElement.setAttribute('values', fromValue);
    animateElement.setAttribute('dur', duration);

    svgElementRef.current.appendChild(animateElement);
    onAnimateCreated();
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>
        Valor inicial:
        <input
          type="text"
          value={fromValue}
          onChange={(e) => setFromValue(e.target.value)}
        />
      </label>

      <label>
        Valor final:
        <input
          type="text"
          value={toValue}
          onChange={(e) => setToValue(e.target.value)}
        />
      </label>

      <label>
        Duração:
        <input
          type="text"
          value={duration}
          onChange={(e) => setDuration(e.target.value)}
        />
      </label>

      <button type="submit">Criar Animate</button>
    </form>
  );
};

export default CreateAnimateForm;
