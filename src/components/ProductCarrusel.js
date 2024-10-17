import React, { useState } from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import '../App.css'; // Para cambiar el color de las flechitas
import ErrorMessage from './ErrorMessage';
import products from './cupones.json'; // Importa los datos del JSON

// Componente de Carrusel de Productos
function ProductCarrusel({ products }) { //tambien desde aquí se estan llamando a los productos que estan ingresados manualmente
  const [showError, setShowError] = useState(false); // Estado para controlar la visualización del mensaje de error

  // Configuración del carrusel utilizando react-slick
  const settings = {
    dots: true, // Mostrar puntos de navegación en la parte inferior
    infinite: true, // Carrusel en bucle infinito
    speed: 500, // Velocidad de transición entre slides
    slidesToShow: 3, // Número de productos visibles al mismo tiempo
    slidesToScroll: 1, // Número de productos que se desplazan por cada acción
    arrows: true, // Mostrar flechas de navegación
    responsive: [ // Configuración para pantallas más pequeñas
      {
        breakpoint: 1024, // Resolución máxima de 1024px
        settings: {
          slidesToShow: 2, // Mostrar 2 productos en pantallas medianas
          slidesToScroll: 1, // Desplazar un producto a la vez
          arrows: true,
        },
      },
      {
        breakpoint: 768, // Resolución máxima de 768px
        settings: {
          slidesToShow: 1, // Mostrar 1 producto en pantallas pequeñas
          slidesToScroll: 1,
          arrows: true,
        },
      },
    ],
  };

  // Función para mostrar mensaje de error al hacer clic
  const handleShowError = () => {
    setShowError(true); // Mostrar el mensaje de error
    setTimeout(() => {
      setShowError(false); // Ocultar el mensaje de error después de 3 segundos
    }, 3000);
  };

  return (
    <div className="mx-auto my-8 px-2 w-full max-w-6xl">
      {/* Título del Carrusel */}
      <h2 className="text-3xl font-bold rubik mb-6 text-[#A3D9D3]">Ofertas Destacadas</h2>

      {/* Mostrar mensaje de error si showError es true */}
      {showError && (
        <div className="mb-4">
          <ErrorMessage message="La funcionalidad de más información aún no está disponible." />
        </div>
      )}

      {/* Componente Slider de react-slick */}
      <Slider {...settings}>
        {/* Mapeo de los productos para generar las tarjetas dentro del carrusel */}
        {products.map((product) => (
          <div key={product.id} className="px-1"> {/* Ajustar los márgenes laterales */}
            <div className="p-3 bg-white rounded-lg shadow-lg max-w-sm mx-auto"> {/* Limitar el tamaño de las tarjetas */}
              {/* Imagen del producto */}
              <img
                src={product.image}
                alt={product.name}
                className="w-full h-40 object-cover rounded-t-lg" // Reducir la altura de la imagen
              />
              <div className="p-2"> {/* Reducir padding interno */}
                {/* Nombre del producto */}
                <h3 className="text-md font-semibold text-gray-900">{product.name}</h3> {/* Texto más pequeño */}
                
                {/* Descripción del producto */}
                <p className="text-gray-700 text-xs mb-2">{product.description}</p> {/* Texto de descripción más pequeño */}
                
                {/* Precio del producto */}
                <p className="text-green-600 font-bold text-base my-1">${product.price}</p> {/* Reducir el tamaño del precio */}
                
                {/* Botón para ver más detalles */}
                <button
                  onClick={handleShowError} // Mostrar el mensaje de error al hacer clic
                  className="inline-block bg-blue-600 text-white px-3 py-1 rounded hover:bg-blue-800 transition duration-300 text-sm" // Botón más pequeño
                >
                  Más Información
                </button>
              </div>
            </div>
          </div>
        ))}
      </Slider>
    </div>
  );
}

export default ProductCarrusel;