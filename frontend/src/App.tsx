import './index.css'
import { useState } from 'react'
import { ThreeColumnDashboard } from './presentation/layouts/ThreeColumnDashboard'
import { ProductDetailPage } from './presentation/pages/ProductDetailPage'

function App() {
  const [selectedProductId, setSelectedProductId] = useState<string | null>(null);

  return (
    <>
      {selectedProductId
        ? <ProductDetailPage productId={selectedProductId} onBack={() => setSelectedProductId(null)} onSelectProduct={setSelectedProductId} />
        : <ThreeColumnDashboard onSelectProduct={setSelectedProductId} />
      }
    </>
  )
}

export default App
