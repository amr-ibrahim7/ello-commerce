import ProductDetailsClient from "@/components/ProductDetailsClient"
import { getProductById } from "@/lib/services/api/products"
import { notFound } from "next/navigation"

interface ProductPageProps {
  params: {
    id: string
  }
}

export default async function ShopDetailPage({ params }: ProductPageProps) {
  try {
    const response = await getProductById(params.id)
    
    if (!response.product) {
      notFound()
    }

    return <ProductDetailsClient product={response.product} />
  } catch (error) {
    notFound()
    console.log(error)
  }
}
