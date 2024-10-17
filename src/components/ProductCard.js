import React, { useState } from 'react';
import { Heart } from 'lucide-react';
import products from './cupones.json'; 

const ProductCard = ({ product, toggleLike }) => {
    const [showConditions, setShowConditions] = useState(false); // Estado para mostrar u ocultar condiciones

    const toggleConditions = () => {
        setShowConditions(!showConditions);
    };

    return (
        <div className="p-2 px-4 bg-white rounded shadow-sm">
            <img src={product.image} alt={product.name} className="w-full h-48 object-cover" />
            <h2 className="text-lg font-semibold my-1">{product.name}</h2>
            <p className="text-sm text-gray-600">{product.description}</p>
            <p className="text-green-600 font-semibold text-sm">{product.price}</p>

            {/* Botón para mostrar/ocultar condiciones */}
            <button
                onClick={toggleConditions}
                className="bg-[#0092BC] text-white px-3 py-1 mt-2 rounded hover:bg-[#A3D9D3] hover:text-[#0092BC] transition duration-300"
            >
                {showConditions ? 'Ocultar condiciones' : 'Ver condiciones'}
            </button>

            {/* Condiciones del producto */}
            <div className={`mt-2 overflow-hidden transition-all duration-500 ${showConditions ? 'max-h-40' : 'max-h-0'}`}>
                <p className="text-xs text-gray-700">
                    {product.conditions}
                </p>
            </div>

            {/* Botón para dar 'like' */}
            <button onClick={() => toggleLike(product.id)} className="mt-2">
                <Heart size={18} color={product.liked ? 'red' : 'black'} />
            </button>
        </div>
    );
};


export default ProductCard;
