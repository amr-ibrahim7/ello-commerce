import ProductGrid from '@/components/ProductGrid'
import ShopHeader from '@/components/ShopHeader'
import { getAllProducts } from '@/lib/services/api/products'
import { productsType } from '@/lib/types/productsType'
import React from 'react'


export default async function Shop() {
   let products: productsType[] = [];
  let error: string | null = null;

  try {
    const response = await getAllProducts();
    products = response.products;
  } catch (err) {
    console.error("Error fetching products:", err);
    error = "Failed to load products";
  }

  return (
    <div className='px-4 py-10 max-w-7xl mx-auto my-24'>
      <ShopHeader />
      
      {error && (
        <div className="mt-8 p-4 bg-red-50 border border-red-200 rounded-lg">
          <p className="text-red-700 text-center">{error}</p>
        </div>
      )}
      
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8 mt-12">
        <div className="lg:col-span-3">
          <ProductGrid products={products} />
        </div>
      </div>
    </div>
  )
}