import './index.css'
import { useState } from 'react'
import { ThreeColumnDashboard } from './presentation/layouts/ThreeColumnDashboard'
import { ProductDetailPage } from './presentation/pages/ProductDetail'
import { Preloader } from './presentation/components/Preloader'
import { Background } from './presentation/components/Background'
import { CheckoutPage } from './presentation/pages/Checkout'
import { Toast } from './presentation/components/Toast'

function App() {
  const [isLoading, setIsLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState<'catalog' | 'detail' | 'checkout'>('catalog');
  const [selectedProductId, setSelectedProductId] = useState<string | null>(null);

  // Mientras carga, mostrar el preloader
  if (isLoading) {
    return <Preloader onComplete={() => setIsLoading(false)} />;
  }

  const handleNavigate = (page: 'catalog' | 'detail' | 'checkout', prodId?: string | null) => {
    if (page === 'detail' && prodId) {
      setSelectedProductId(prodId);
    } else if (page === 'catalog') {
      setSelectedProductId(null);
    }
    setCurrentPage(page);
  };

  // Una vez cargado, renderizar el fondo y el enrutamiento lógico
  return (
    <>
      <Background />
      {/* Toast global — flotante sobre todas las páginas */}
      <Toast />

      {/* Contenedor relativo para asegurar que el contenido se superponga al fondo */}
      <div className="relative z-10">
        {currentPage === 'checkout' ? (
          <CheckoutPage onNavigate={handleNavigate} />
        ) : currentPage === 'detail' && selectedProductId ? (
          <ProductDetailPage 
            productId={selectedProductId} 
            onBack={() => handleNavigate('catalog')} 
            onNavigate={handleNavigate} 
          />
        ) : (
          <ThreeColumnDashboard 
            onSelectProduct={(id) => handleNavigate('detail', id)} 
            onNavigate={handleNavigate} 
          />
        )}
      </div>
    </>
  );
}

export default App