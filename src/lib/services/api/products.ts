import { ApiResponse, SingleProductResponse } from "@/lib/types/productsType";
import { fetchAPI } from ".";



export async function getProductById(productId: string): Promise<SingleProductResponse> {
  const result = await fetchAPI<SingleProductResponse>(`/products/${productId}`);
  
  if (!result || !result.product) {
    throw new Error("Product not found");
  }

  return result;
}


export async function getAllProducts(): Promise<ApiResponse> {
  const result = await fetchAPI<ApiResponse>("/products");

  if (!result || !Array.isArray(result.products)) {
    throw new Error("Invalid API response format");
  }

  return result;
}



