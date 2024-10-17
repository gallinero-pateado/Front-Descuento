import React, { useState } from 'react';
import ProductCard from './ProductCard'; // Importa el componente ProductCard
import products from './cupones.json'; // Importa los datos del JSON

const Products = () => {
    const [likedProducts, setLikedProducts] = useState({}); // Estado para los productos que han recibido 'like'

    // Función para alternar el 'like' de un producto
    const toggleLike = (id) => {
        setLikedProducts(prevLikes => ({
            ...prevLikes,
            [id]: !prevLikes[id],
        }));
    };

    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {products.map((product) => (
                <ProductCard 
                    key={product.id} 
                    product={{ ...product, liked: likedProducts[product.id] || false }} 
                    toggleLike={toggleLike} 
                />
            ))}
        </div>
    );
};

export default Products;
