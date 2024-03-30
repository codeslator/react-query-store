import { useParams } from "react-router-dom"
import { ProductCard, useProduct } from ".."
import { useEffect } from "react";


export const ProductById = () => {
  const { id } = useParams();
  const { product, isLoading } = useProduct({ id: Number(id!) });

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [])

  return (
    <div className="flex-col">
      <h1 className="text-2xl font-bold">Producto</h1>

      {isLoading && (<p>Loading...</p>)}

      {product && (
        <ProductCard product={product} fullDescription />
      )}

    </div>
  )
}