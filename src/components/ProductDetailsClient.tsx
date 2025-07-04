
"use client"

import { useState } from 'react'
import Image from 'next/image'
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Heart, Star, ShoppingCart, Minus, Plus, Share2, Shield, Truck } from "lucide-react"
import { productsType } from '@/lib/types/productsType'

interface ProductDetailsClientProps {
  product: productsType
}

export default function ProductDetailsClient({ product }: ProductDetailsClientProps) {
  const [selectedImageIndex, setSelectedImageIndex] = useState(0)
  const [quantity, setQuantity] = useState(1)
  const [isFavorite, setIsFavorite] = useState(false)

  const handleQuantityChange = (type: 'increase' | 'decrease') => {
    if (type === 'increase' && quantity < product.stock) {
      setQuantity(prev => prev + 1)
    } else if (type === 'decrease' && quantity > 1) {
      setQuantity(prev => prev - 1)
    }
  }

  const toggleFavorite = () => {
    setIsFavorite(!isFavorite)
  }

  const allImages = [product.imageCover, ...product.images]

  return (
    <div className="container mx-auto px-4 py-8 my-24">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Product Images */}
        <div className="space-y-4">
          {/* Main Image */}
          <div className="aspect-square overflow-hidden rounded-lg bg-gray-100">
            <Image
              src={allImages[selectedImageIndex]?.secure_url || product.imageCover.secure_url}
              alt={product.title}
              width={600}
              height={600}
              className="w-full h-full object-cover"
            />
          </div>

          {/* Thumbnail Images */}
          <div className="flex gap-2 overflow-x-auto">
            {allImages.map((image, index) => (
              <button
                key={index}
                onClick={() => setSelectedImageIndex(index)}
                className={`flex-shrink-0 w-20 h-20 rounded-md overflow-hidden border-2 transition-colors ${
                  selectedImageIndex === index
                    ? 'border-primary'
                    : 'border-gray-200 hover:border-gray-300'
                }`}
              >
                <Image
                  src={image.secure_url}
                  alt={`${product.title} ${index + 1}`}
                  width={80}
                  height={80}
                  className="w-full h-full object-cover"
                />
              </button>
            ))}
          </div>
        </div>

        {/* Product Info */}
        <div className="space-y-6">
          {/* Header */}
          <div className="space-y-2">
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <span className="font-medium">{product.brand?.name}</span>
              <span>•</span>
              <span>{product.category?.name}</span>
            </div>
            
            <h1 className="text-3xl font-bold text-foreground">{product.title}</h1>
            
            {/* Rating */}
            <div className="flex items-center gap-2">
              <div className="flex items-center">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className={`h-4 w-4 ${
                      i < Math.floor(product.rateAvg || 0)
                        ? "fill-yellow-400 text-yellow-400"
                        : "text-gray-300"
                    }`}
                  />
                ))}
              </div>
              <span className="text-sm text-muted-foreground">
                ({product.rateNum} reviews)
              </span>
            </div>
          </div>

          {/* Price */}
          <div className="space-y-2">
            <div className="flex items-center gap-3">
              <span className="text-3xl font-bold text-foreground">
                £{product.priceAfterDiscount?.toFixed(2) || product.price.toFixed(2)}
              </span>
              {product.discount > 0 && (
                <>
                  <span className="text-xl text-muted-foreground line-through">
                    £{product.price.toFixed(2)}
                  </span>
                  <Badge className="bg-red-500 text-white">
                    Save {product.discount}%
                  </Badge>
                </>
              )}
            </div>
            
            {product.discount > 0 && (
              <p className="text-sm text-green-600 font-medium">
                You save £{(product.price - (product.priceAfterDiscount || product.price)).toFixed(2)}
              </p>
            )}
          </div>

          {/* Stock Status */}
          <div className="flex items-center gap-2">
            {product.stock > 0 ? (
              <>
                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                <span className="text-sm text-green-600 font-medium">
                  In Stock ({product.stock} available)
                </span>
              </>
            ) : (
              <>
                <div className="w-2 h-2 bg-red-500 rounded-full"></div>
                <span className="text-sm text-red-600 font-medium">Out of Stock</span>
              </>
            )}
          </div>

          {/* Description */}
          <div className="space-y-2">
            <h3 className="font-semibold text-foreground">Description</h3>
            <p className="text-muted-foreground leading-relaxed">
              {product.description}
            </p>
          </div>

          {/* Quantity & Add to Cart */}
          <div className="space-y-4">
            <div className="flex items-center gap-4">
              <div className="flex items-center border rounded-lg">
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => handleQuantityChange('decrease')}
                  disabled={quantity <= 1}
                  className="h-10 w-10"
                >
                  <Minus className="h-4 w-4" />
                </Button>
                <span className="px-4 py-2 min-w-[60px] text-center">{quantity}</span>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => handleQuantityChange('increase')}
                  disabled={quantity >= product.stock}
                  className="h-10 w-10"
                >
                  <Plus className="h-4 w-4" />
                </Button>
              </div>
              
              <Button
                onClick={toggleFavorite}
                variant="outline"
                size="icon"
                className="h-10 w-10"
              >
                <Heart
                  className={`h-4 w-4 transition-colors ${
                    isFavorite
                      ? "fill-red-500 text-red-500"
                      : "text-muted-foreground"
                  }`}
                />
              </Button>
              
              <Button variant="outline" size="icon" className="h-10 w-10">
                <Share2 className="h-4 w-4" />
              </Button>
            </div>

            <div className="flex gap-3">
              <Button
                className="flex-1 h-12"
                disabled={product.stock === 0}
              >
                <ShoppingCart className="h-4 w-4 mr-2" />
                {product.stock === 0 ? 'Out of Stock' : 'Add to Cart'}
              </Button>
              <Button variant="outline" className="flex-1 h-12">
                Buy Now
              </Button>
            </div>
          </div>

          {/* Features */}
          <div className="grid grid-cols-1 gap-3 pt-4 border-t">
            <div className="flex items-center gap-3 text-sm">
              <Truck className="h-5 w-5 text-blue-600" />
              <span>Free delivery on orders over £50</span>
            </div>
            <div className="flex items-center gap-3 text-sm">
              <Shield className="h-5 w-5 text-green-600" />
              <span>2 year warranty included</span>
            </div>
          </div>

          {/* Stats */}
          <div className="flex items-center gap-6 pt-4 border-t text-sm text-muted-foreground">
            <span>{product.sold} sold</span>
            <span>SKU: {product.customId}</span>
          </div>
        </div>
      </div>

      {/* Reviews Section */}
      <div className="mt-16 space-y-6">
        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-bold">Customer Reviews</h2>
          <Button variant="outline">Write a Review</Button>
        </div>

        {product.reviews.length > 0 ? (
          <div className="space-y-4">
            {product.reviews.map((review) => (
              <Card key={review._id}>
                <CardContent className="p-4">
                  <div className="flex items-start gap-3">
                    <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center">
                      <span className="text-sm font-medium">
                        {review.createdBy?.name?.charAt(0).toUpperCase() || 'A'}
                      </span>
                    </div>
                    <div className="flex-1 space-y-2">
                      <div className="flex items-center gap-2">
                        <span className="font-medium">
                          {review.createdBy?.name || 'Anonymous'}
                        </span>
                        <div className="flex items-center">
                          {[...Array(5)].map((_, i) => (
                            <Star
                              key={i}
                              className="h-3 w-3 fill-yellow-400 text-yellow-400"
                            />
                          ))}
                        </div>
                      </div>
                      <p className="text-muted-foreground">{review.comment}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        ) : (
          <div className="text-center py-8 text-muted-foreground">
            No reviews yet. Be the first to review this product!
          </div>
        )}
      </div>
    </div>
  )
}