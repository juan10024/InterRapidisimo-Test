import './index.css'
import { useState } from 'react'
import { ThreeColumnDashboard } from './presentation/layouts/ThreeColumnDashboard'
import { ProductDetailPage } from './presentation/pages/ProductDetailPage'
import { Preloader } from './presentation/components/Preloader'
import { Background } from './presentation/components/Background'

function App() {
  const [isLoading, setIsLoading] = useState(true);
  const [selectedProductId, setSelectedProductId] = useState<string | null>(null);

  // Mientras carga, mostrar el preloader
  if (isLoading) {
    return <Preloader onComplete={() => setIsLoading(false)} />;
  }

  // Una vez cargado, renderizar el fondo y el enrutamiento lógico
  return (
    <>
      <Background />
      
      {/* Contenedor relativo para asegurar que el contenido se superponga al fondo */}
      <div className="relative z-10">
        {selectedProductId
          ? <ProductDetailPage productId={selectedProductId} onBack={() => setSelectedProductId(null)} onSelectProduct={setSelectedProductId} />
          : <ThreeColumnDashboard onSelectProduct={setSelectedProductId} />
        }
      </div>
    </>
  )
}

export default App