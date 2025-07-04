// Extract unique categories and brands with proper error handling
  const categories = useMemo(() => {
    if (!Array.isArray(products) || products.length === 0) {
      return [];
    }
    
    const cats = products
      .filter(p => p && p.category && p.category.name)
      .map(p => p.category);
    
    return Array.from(new Set(cats.map(c => c.name)))
      .map(name => cats.find(c => c.name === name)!)
      .filter(Boolean);
  }, [products]);

  const brands = useMemo(() => {
    if (!Array.isArray(products) || products.length === 0) {
      return [];
    }
    
    const brandList = products
      .filter(p => p && p.brand && p.brand.name)
      .map(p => p.brand);
    
    return Array.from(new Set(brandList.map(b => b.name)))
      .map(name => brandList.find(b => b.name === name)!)
      .filter(Boolean);
  }, [products]);

  const handleCategoryChange = (categoryId: string, checked: boolean) => {
    setSelectedCategories(prev => 
      checked 
        ? [...prev, categoryId]
        : prev.filter(id => id !== categoryId)
    );
  };

  const handleBrandChange = (brandId: string, checked: boolean) => {
    setSelectedBrands(prev => 
      checked 
        ? [...prev, brandId]
        : prev.filter(id => id !== brandId)
    );
  };"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { Button } from "@/components/ui/button";
import { useState, useMemo } from "react";
import { productsType } from "@/lib/types/productsType";

interface ShopFiltersProps {
  products: productsType[];
}

export default function ShopFilters({ products }: ShopFiltersProps) {
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 2000]);
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [selectedBrands, setSelectedBrands] = useState<string[]>([]);

  // Get price range from products
  const maxPrice = useMemo(() => {
    if (!Array.isArray(products) || products.length === 0) {
      return 2000;
    }
    
    const validPrices = products
      .filter(p => p && typeof p.price === 'number')
      .map(p => p.price);
    
    return validPrices.length > 0 ? Math.max(...validPrices) : 2000;
  }, [products]);

  // Update price range when maxPrice changes
  useMemo(() => {
    setPriceRange([0, maxPrice]);
  }, [maxPrice]);

  const clearFilters = () => {
    setSelectedCategories([]);
    setSelectedBrands([]);
    setPriceRange([0, maxPrice]);
  };

  // Show loading state if products is not an array
  if (!Array.isArray(products)) {
    return (
      <div className="space-y-6">
        <Card>
          <CardContent className="p-6">
            <div className="animate-pulse space-y-4">
              <div className="h-4 bg-gray-200 rounded w-3/4"></div>
              <div className="h-4 bg-gray-200 rounded w-1/2"></div>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Price Range */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Price Range</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <Slider
              value={priceRange}
              onValueChange={(val) => setPriceRange([val[0], val[1]] as [number, number])}
              max={maxPrice}
              min={0}
              step={10}
              className="w-full"
            />
            <div className="flex justify-between text-sm text-muted-foreground">
              <span>£{priceRange[0]}</span>
              <span>£{priceRange[1]}</span>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Categories */}
      {categories.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Categories</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {categories.map((category) => (
                <div key={category._id} className="flex items-center space-x-2">
                  <Checkbox
                    id={category._id}
                    checked={selectedCategories.includes(category._id)}
                    onCheckedChange={(checked) => 
                      handleCategoryChange(category._id, checked as boolean)
                    }
                  />
                  <Label 
                    htmlFor={category._id} 
                    className="text-sm font-normal cursor-pointer"
                  >
                    {category.name}
                  </Label>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Brands */}
      {brands.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Brands</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {brands.map((brand) => (
                <div key={brand._id} className="flex items-center space-x-2">
                  <Checkbox
                    id={brand._id}
                    checked={selectedBrands.includes(brand._id)}
                    onCheckedChange={(checked) => 
                      handleBrandChange(brand._id, checked as boolean)
                    }
                  />
                  <Label 
                    htmlFor={brand._id} 
                    className="text-sm font-normal cursor-pointer"
                  >
                    {brand.name}
                  </Label>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Clear Filters */}
      <Button 
        variant="outline" 
        className="w-full"
        onClick={clearFilters}
      >
        Clear All Filters
      </Button>
    </div>
  );
}