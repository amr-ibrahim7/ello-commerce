import { brandType } from "@/lib/types/brandType";
import { fetchAPI } from ".";


export async function getAllBrands(): Promise<brandType[]> {
  const result = await fetchAPI<{ brands: brandType[] }>("/brands");
  return result?.brands || [];
}


export async function getBrandById(brandId: string): Promise<brandType | null> {
  return await fetchAPI<brandType>(`/brands/${brandId}`, true);
}
