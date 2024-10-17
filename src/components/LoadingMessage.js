import React from 'react';

function LoadingMessage({ message }) {
  return (
    <div className="bg-gray-400 text-white p-4 rounded">
      <p>{message || "Cargando..."}</p>
    </div>
  );
}

export default LoadingMessage;
