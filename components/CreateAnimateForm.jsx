import React, { useRef, useState } from 'react';

const CreateAnimateForm = ({ svgElementRef, onAnimateCreated }) => {
  const [idValue, setIdValue] = useState('');
  const [attributeTypeValue, setAttributeTypeValue] = useState('');
  const [attributeNameValue, setAttributeNameValue] = useState('');
  const [beginValue, setBeginValue] = useState('');
  const [durValue, setDurValue] = useState('');
  const [valuesValue, setValuesValue] = useState('');
  const [fromValue, setFromValue] = useState('');
  const [toValue, setToValue] = useState('');
  const [byValue, setByValue] = useState('');


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

    if (idValue) {
      animateElement.setAttribute('id', idValue);
    }
    if (attributeTypeValue) {
      animateElement.setAttribute('attributeType', attributeTypeValue);
    }
    if (attributeNameValue) {
      animateElement.setAttribute('attributeName', attributeNameValue);
    }
    if (beginValue) {
      animateElement.setAttribute('begin', beginValue);
    }
    if (durValue) {
      animateElement.setAttribute('dur', durValue);
    }
    if (valuesValue) {
      animateElement.setAttribute('values', valuesValue);
    }
    if (fromValue) {
      animateElement.setAttribute('from', fromValue);
    }
    if (toValue) {
      animateElement.setAttribute('to', toValue);
    }
    if (byValue) {
      animateElement.setAttribute('by', byValue);
    }

    svgElementRef.current.appendChild(animateElement);
    onAnimateCreated();
  };

  const divClassName = "";
  const labelClassName = "whitespace-nowrap";
  const inputClassName = "w-full bg-[#5F5F5F]";

  return (
    <div className='flex flex-col bg-[#353535] p-2 text-sm'>
      <form className='flex flex-col gap-2' onSubmit={handleSubmit}>
        <div className={divClassName}>
          <label className={labelClassName} htmlFor="id">ID:</label>
          <input type="text" id="id" value={idValue} onChange={(e) => setIdValue(e.target.value)} className={inputClassName} />
        </div>

        <div className={divClassName}>
          <label className={labelClassName} htmlFor="atributeType">Tipo de Atributo:</label>
          <select id="atributeType" value={attributeTypeValue} onChange={(e) => setAttributeTypeValue(e.target.value)} className={inputClassName}>
            <option value="">Selecione...</option>
            <option value="CSS">CSS</option>
            <option value="XML">XML</option>
            <option value="auto">Auto</option>
          </select>
        </div>

        <div className={divClassName}>
          <label className={labelClassName} htmlFor="atributeName">Nome do Atributo:</label>
          <input type="text" id="atributeName" value={attributeNameValue} onChange={(e) => setAttributeNameValue(e.target.value)} className={inputClassName} />
        </div>

        <div className={divClassName}>
          <label className={labelClassName} htmlFor="begin">Início:</label>
          <input type="text" id="begin" value={beginValue} onChange={(e) => setBeginValue(e.target.value)} className={inputClassName} />
        </div>

        <div className={divClassName}>
          <label className={labelClassName} htmlFor="dur">Duração:</label>
          <input type="text" id="dur" value={durValue} onChange={(e) => setDurValue(e.target.value)} className={inputClassName} />
        </div>

        <div className={divClassName}>
          <label className={labelClassName} htmlFor="values">Valores:</label>
          <input type="text" id="values" value={valuesValue} onChange={(e) => setValuesValue(e.target.value)} className={inputClassName} />
        </div>

        <div className={divClassName}>
          <label className={labelClassName} htmlFor="from">De:</label>
          <input type="text" id="from" value={fromValue} onChange={(e) => setFromValue(e.target.value)} className={inputClassName} />
        </div>

        <div className={divClassName}>
          <label className={labelClassName} htmlFor="to">Para:</label>
          <input type="text" id="to" value={toValue} onChange={(e) => setToValue(e.target.value)} className={inputClassName} />
        </div>

        <div className={divClassName}>
          <label className={labelClassName} htmlFor="by">Por:</label>
          <input type="text" id="by" value={byValue} onChange={(e) => setByValue(e.target.value)} className={inputClassName} />
        </div>


        <button className='bg-[#5F5F5F] rounded w-full' type="submit">Criar Animação</button>
      </form>
    </div>
  );
};

export default CreateAnimateForm;
