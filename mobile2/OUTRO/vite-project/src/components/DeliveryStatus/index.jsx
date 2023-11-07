import React, { useState } from 'react';
import './DeliveryStatus.css';
const DeliveryStatus = () => {
  const [status, setStatus] = useState('Pendente');

  const updateStatus = (newStatus) => {
    setStatus(newStatus);
  };

  return (
    <div className='homer'>
      <h2>Status de Entrega: {status}</h2>
      <button className='botaos' onClick={() => updateStatus('Pendente')}>Marcar como Pendente</button>
      <button className='botaos' onClick={() => updateStatus('Em trânsito')}>Marcar como Em Trânsito</button>
      <button className='botaos' onClick={() => updateStatus('Entregue')}>Marcar como Entregue</button>
    </div>
  );
};

export default DeliveryStatus;
