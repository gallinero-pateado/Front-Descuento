import React, { useState, Suspense, lazy } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import products from './components/cupones.json'; // Desde aqui se obtiene un product
// Componentes de mensajes
import SuccessMessage from './components/SuccessMessage';
import ErrorMessage from './components/ErrorMessage';
import LoadingMessage from './components/LoadingMessage';


// Lazy loading
const SearchComponent = lazy(() => import('./components/SearchComponent'));
const FilterBar = lazy(() => import('./components/FilterBar'));
const ProductCard = lazy(() => import('./components/ProductCard'));
const Header = lazy(() => import('./components/Header'));
const Footer = lazy(() => import('./components/Footer'));
const ProductCarrusel = lazy(() => import('./components/ProductCarrusel')); // Importar el carrusel de productos destacados


function App() {
  const [likedProducts, setLikedProducts] = useState(products);
  const [filteredProducts, setFilteredProducts] = useState(products);
  const [categoryFilter, setCategoryFilter] = useState("");
  const [priceFilter, setPriceFilter] = useState("");

  const [isLoading, setIsLoading] = useState(false); // Estado de carga
  const [hasError, setHasError] = useState(false);   // Estado de error
  const [showSuccessMessage, setShowSuccessMessage] = useState(false); // Controla el mensaje de éxito

  const handleFilters = (selectedCategory, selectedPriceSort) => {
    setIsLoading(true);
    setHasError(false);

    try {
      let filtered = [...likedProducts];

      if (selectedCategory) {
        filtered = filtered.filter(product => product.category === selectedCategory);
      }

      if (selectedPriceSort) {
        filtered = filtered.sort((a, b) => selectedPriceSort === 'low-high' ? a.price - b.price : b.price - a.price);
      }

      setFilteredProducts(filtered);

      // Mostrar el mensaje de éxito
      setShowSuccessMessage(true);
    } catch (error) {
      setHasError(true);
    } finally {
      setIsLoading(false);
    }
  };

  const handleCategoryFilter = (e) => {
    const selectedCategory = e.target.value;
    setCategoryFilter(selectedCategory);
    handleFilters(selectedCategory, priceFilter);
  };

  const handlePriceSort = (e) => {
    const selectedPriceSort = e.target.value;
    setPriceFilter(selectedPriceSort);
    handleFilters(categoryFilter, selectedPriceSort);
  };

  const toggleLike = (id) => {
    setLikedProducts(likedProducts.map(p => p.id === id ? { ...p, liked: !p.liked } : p));
  };

  return (
    <Router>
      <Suspense fallback={<LoadingMessage message="Cargando componentes..." />}>
        <Routes>
          <Route path="/" element={
            <div className="min-h-screen bg-gray-100 text-center relative">
              <Header /> {/* Manda el header */}

              {/* Mensajes de estado */}
              {isLoading && <LoadingMessage message="Cargando productos..." />}
              {hasError && <ErrorMessage message="Ocurrió un error al cargar los productos." />}
              {showSuccessMessage && (
                <SuccessMessage
                  message="Productos cargados correctamente."
                  onClose={() => setShowSuccessMessage(false)} // Oculta el mensaje después de 5 segundos
                />
              )}

              {/* Sección principal */}
              <section className="my-12">
                <h1 className="text-4xl font-bold text-[#0092bc] mb-6">Bienvenido a la sección de descuentos</h1>
                <p className="text-lg mb-8 text-gray-600">Encuentra los mejores descuentos en comida.</p>

                  {/* Componente del carrusel de productos destacados */}
                  <ProductCarrusel products={products.slice(0, 5)} />

                <SearchComponent products={likedProducts} setFilteredProducts={setFilteredProducts} />
                <FilterBar handleCategoryFilter={handleCategoryFilter} handlePriceSort={handlePriceSort} />
              </section>

              {/* Tarjetas de productos */}
              <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 px-8 mb-12">
                {filteredProducts.map(product => (
                  <ProductCard key={product.id} product={product} toggleLike={toggleLike} />
                ))}
              </section>

              <Footer /> {/* Manda el footer */}
            </div>
          } />
        </Routes>
      </Suspense>
    </Router>
  );
}

export default App;
