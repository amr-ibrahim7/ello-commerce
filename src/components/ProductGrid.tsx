"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Heart, Star, ShoppingCart, Eye } from "lucide-react"
import { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { productsType } from "@/lib/types/productsType"

interface ProductGridProps {
  products: productsType[]
}

export default function ProductGrid({ products }: ProductGridProps) {
  const [favorites, setFavorites] = useState<string[]>([])

  const toggleFavorite = (productId: string) => {
    setFavorites(prev =>
      prev.includes(productId)
        ? prev.filter(id => id !== productId)
        : [...prev, productId]
    )
  }

  if (products.length === 0) {
    return (
      <div className="text-center py-16">
        <p className="text-lg text-muted-foreground">No products found</p>
        <p className="text-sm text-muted-foreground mt-2">
          Try adjusting your filters or search terms
        </p>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {/* Results Count */}
      <div className="flex justify-between items-center">
        <p className="text-sm text-muted-foreground">
          Showing {products.length} products
        </p>
        <select className="text-sm border rounded px-3 py-1">
          <option>Sort by: Featured</option>
          <option>Price: Low to High</option>
          <option>Price: High to Low</option>
          <option>Newest</option>
          <option>Best Rating</option>
        </select>
      </div>

      {/* Products Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {products.map((product) => (
          <ProductCard 
            key={product._id} 
            product={product} 
            isFavorite={favorites.includes(product._id)}
            onToggleFavorite={toggleFavorite}
          />
        ))}
      </div>

      {/* Load More Button */}
     {products.length > 20 && (
  <div className="text-center pt-8">
    <Button variant="outline" size="lg">
      Load More Products
    </Button>
  </div>
)}
    </div>
  )
}

// Separate ProductCard component for better organization
interface ProductCardProps {
  product: productsType
  isFavorite: boolean
  onToggleFavorite: (productId: string) => void
}

function ProductCard({ product, isFavorite, onToggleFavorite }: ProductCardProps) {
  return (
    <Card className="group cursor-pointer border-border bg-card hover:shadow-lg transition-all duration-300">
      <CardContent className="p-0">
        {/* Product Image */}
        <div className="relative aspect-square overflow-hidden rounded-t-lg bg-muted">
          <Image
            src={product.imageCover.secure_url}
            alt={product.title}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-500"
            sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
          />

          {/* Badges */}
          <div className="absolute top-3 left-3">
            {product.discount > 0 && (
              <Badge className="bg-red-500 text-white">
                -{product.discount}%
              </Badge>
            )}
            {product.stock < 10 && product.stock > 0 && (
              <Badge className="bg-orange-500 text-white">
                Only {product.stock} left
              </Badge>
            )}
            {product.stock === 0 && (
              <Badge className="bg-gray-500 text-white">
                Out of Stock
              </Badge>
            )}
          </div>

          {/* Action Buttons */}
          <div className="absolute top-3 right-3 flex flex-col gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            <Button
              variant="ghost"
              size="icon"
              className="h-8 w-8 rounded-full bg-background/80 backdrop-blur-sm hover:bg-background/90"
              onClick={(e) => {
                e.preventDefault()
                onToggleFavorite(product._id)
              }}
            >
              <Heart
                className={`h-4 w-4 transition-colors ${
                  isFavorite
                    ? "fill-red-500 text-red-500"
                    : "text-muted-foreground hover:text-foreground"
                }`}
              />
            </Button>
            
            <Button
              variant="ghost"
              size="icon"
              className="h-8 w-8 rounded-full bg-background/80 backdrop-blur-sm hover:bg-background/90"
              asChild
            >
              <Link href={`/products/${product._id}`}>
                <Eye className="h-4 w-4 text-muted-foreground hover:text-foreground" />
              </Link>
            </Button>
          </div>

          {/* Quick Add Button */}
          <div className="absolute bottom-3 left-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            <Button 
              className="w-full h-8 text-xs"
              disabled={product.stock === 0}
            >
              <ShoppingCart className="h-3 w-3 mr-2" />
              {product.stock === 0 ? 'Out of Stock' : 'Add to Cart'}
            </Button>
          </div>
        </div>

        {/* Product Info */}
        <div className="p-4 space-y-3">
          {/* Brand & Category */}
          <div className="flex items-center gap-2 text-xs text-muted-foreground">
            <span className="font-medium">{product.brand?.name}</span>
            <span>•</span>
            <span>{product.category?.name}</span>
          </div>

          {/* Product Title */}
          <Link href={`/products/${product._id}`}>
            <h3 className="font-medium text-foreground group-hover:text-primary transition-colors line-clamp-2">
              {product.title}
            </h3>
          </Link>

          {/* Rating */}
          <div className="flex items-center gap-1">
            <div className="flex items-center">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  className={`h-3 w-3 ${
                    i < Math.floor(product.rateAvg || 0)
                      ? "fill-yellow-400 text-yellow-400"
                      : "text-muted-foreground"
                  }`}
                />
              ))}
            </div>
            <span className="text-xs text-muted-foreground">
              ({product.rateNum || 0})
            </span>
          </div>

          {/* Price */}
          <div className="flex items-center gap-2">
            <span className="text-lg font-semibold text-foreground">
              £{product.priceAfterDiscount?.toFixed(2) || product.price.toFixed(2)}
            </span>
            {product.discount > 0 && (
              <span className="text-sm text-muted-foreground line-through">
                £{product.price.toFixed(2)}
              </span>
            )}
          </div>

          {/* Sold Count */}
          {product.sold > 0 && (
            <p className="text-xs text-muted-foreground">
              {product.sold} sold
            </p>
          )}
        </div>
      </CardContent>
    </Card>
  )
}