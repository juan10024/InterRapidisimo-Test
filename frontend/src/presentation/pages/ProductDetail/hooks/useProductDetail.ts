/*
 * descripcion: Hook personalizado que encapsula la lógica de obtención
 * del producto por ID y sus productos relacionados desde la API.
 */

import { useState, useEffect } from 'react';
import { apiClient } from '../../../../infrastructure/api/apiClient';
import type { Product } from '../../../../domain/models';

interface UseProductDetailResult {
  product: Product | null;
  relatedProducts: Product[];
  isLoading: boolean;
  error: string | null;
}

export function useProductDetail(productId: string): UseProductDetailResult {
  const [product, setProduct] = useState<Product | null>(null);
  const [relatedProducts, setRelatedProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    setIsLoading(true);
    setError(null);
    setRelatedProducts([]);

    apiClient.getProductById(productId)
      .then(res => {
        const prod = res.data.product;
        setProduct(prod);
        return apiClient.getProducts(1, 10, prod.category);
      })
      .then(res => {
        const list = res.data.products
          .filter((p: Product) => p.id !== productId)
          .slice(0, 3);

        if (list.length < 3) {
          apiClient.getProducts(1, 10).then(fallbackRes => {
            const extra = fallbackRes.data.products.filter(
              (p: Product) => p.id !== productId && !list.some((item: Product) => item.id === p.id)
            );
            setRelatedProducts([...list, ...extra].slice(0, 3));
          }).catch(() => {
            setRelatedProducts(list);
          });
        } else {
          setRelatedProducts(list);
        }
      })
      .catch(err => setError(err.message))
      .finally(() => setIsLoading(false));
  }, [productId]);

  return { product, relatedProducts, isLoading, error };
}
