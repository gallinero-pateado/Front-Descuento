import React, { useEffect } from 'react';

function SuccessMessage({ message, onClose }) {
  useEffect(() => {
    // El mensaje desaparecerá después de 5 segundos
    const timer = setTimeout(() => {
      onClose(); // Llama a la función onClose para ocultar el mensaje
    }, 5000);

    // Limpia el temporizador si el componente se desmonta antes de que expire el tiempo
    return () => clearTimeout(timer);
  }, [onClose]);

  return (
    <div className="fixed top-4 left-1/2 transform -translate-x-1/2 bg-green-500 text-white p-4 rounded shadow-lg z-50 max-w-xs text-center">
      <p>{message}</p>
    </div>
  );
}

export default SuccessMessage;
