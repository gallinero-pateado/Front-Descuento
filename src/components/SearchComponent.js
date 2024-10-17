import React from 'react';

function SearchComponent({ products, setFilteredProducts }) {
  const handleSearch = (e) => {
    const query = e.target.value.toLowerCase();
    
    // Filtrar por nombre o descripción del producto
    const filtered = products.filter(product =>
      product.name.toLowerCase().includes(query) || //Busca el producto
      product.description.toLowerCase().includes(query) //Busca dentro de la descripción del producto
    );
    
    setFilteredProducts(filtered);
  };

  return (
    <input
      type="text"
      placeholder="Buscar productos..."
      onChange={handleSearch}
      className="p-2 w-60 border rounded text-center"
    />
  );
}

export default SearchComponent;
