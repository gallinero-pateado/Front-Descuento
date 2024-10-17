
import React from 'react';

function Ubicacion() {
  const handleClick = () => {
    alert("Funcionalidad de ubicación próximamente...");
  };

  return (
    <button onClick={handleClick} className="ml-4 p-2 bg-[#0092bc] text-white rounded hover:bg-blue-700 w-48 h-10">
      Ingresar ubicación
    </button>
  );
}

export default Ubicacion;
