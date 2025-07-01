"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { Heart, ArrowLeft } from "lucide-react";
import { useState } from "react";
import Image from "next/image";

interface Product {
  id: number;
  brand: string;
  category: string;
  name: string;
  price: number;
  image: string;
}

const products: Product[] = [
  {
    id: 1,
    brand: "Apple",
    category: "Smartphone",
    name: "iPhone 15 Pro Max",
    price: 1199.0,
    image:
      "https://images.unsplash.com/photo-1603791440384-56cd371ee9a7?w=400&h=500&fit=crop",
  },
  {
    id: 2,
    brand: "Samsung",
    category: "Smartphone",
    name: "Galaxy S24 Ultra",
    price: 999.0,
    image:
      "https://images.unsplash.com/photo-1603791440384-56cd371ee9a7?w=400&h=500&fit=crop",
  },
  {
    id: 3,
    brand: "Sony",
    category: "Headphones",
    name: "WH-1000XM5",
    price: 349.0,
    image:
      "https://images.unsplash.com/photo-1603791440384-56cd371ee9a7?w=400&h=500&fit=crop",
  },
  {
    id: 4,
    brand: "Dell",
    category: "Laptop",
    name: "XPS 13 Plus",
    price: 1399.0,
    image:
      "https://images.unsplash.com/photo-1603791440384-56cd371ee9a7?w=400&h=500&fit=crop",
  },
  {
    id: 5,
    brand: "Dell",
    category: "Laptop",
    name: "XPS 13 Plus",
    price: 1399.0,
    image:
      "https://images.unsplash.com/photo-1603791440384-56cd371ee9a7?w=400&h=500&fit=crop",
  },
  {
    id: 6,
    brand: "Dell",
    category: "Laptop",
    name: "XPS 13 Plus",
    price: 1399.0,
    image:
      "https://images.unsplash.com/photo-1603791440384-56cd371ee9a7?w=400&h=500&fit=crop",
  },
];

export function FeaturedProductsSection() {
  const [favorites, setFavorites] = useState<number[]>([]);

  const toggleFavorite = (productId: number) => {
    setFavorites((prev) =>
      prev.includes(productId)
        ? prev.filter((id) => id !== productId)
        : [...prev, productId]
    );
  };

  return (
    <section className="py-16 lg:py-24 bg-background text-foreground transition-colors duration-300">
      <div className="container mx-auto px-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-12">
          <div className="flex items-center space-x-3">
            <ArrowLeft className="h-5 w-5 text-muted-foreground" />
            <span className="text-lg font-light tracking-wide text-muted-foreground">
              Featured Products
            </span>
          </div>
          <div className="flex space-x-2">
            <Button
              variant="outline"
              size="icon"
              className="rounded-full h-10 w-10"
            >
              <ArrowLeft className="h-4 w-4" />
            </Button>
            <Button
              variant="outline"
              size="icon"
              className="rounded-full h-10 w-10"
            >
              <ArrowLeft className="h-4 w-4 rotate-180" />
            </Button>
          </div>
        </div>

        {/* Products Carousel */}
        <Carousel
          opts={{
            align: "start",
            loop: true,
          }}
          className="w-full"
        >
          <CarouselContent className="-ml-4">
            {products.map((product) => (
              <CarouselItem
                key={product.id}
                className="pl-4 basis-full sm:basis-1/2 lg:basis-1/3 xl:basis-1/4"
              >
                <Card className="group cursor-pointer border-border bg-card hover:shadow-lg transition-all duration-300">
                  <CardContent className="p-0">
                    {/* Product Image */}
                    <div className="relative aspect-[4/5] overflow-hidden rounded-t-lg bg-muted">
                      <Image
                        src={product.image}
                        alt={product.name}
                        fill 
                        className="object-cover group-hover:scale-105 transition-transform duration-500"
                        sizes="(min-width: 1024px) 25vw, (min-width: 640px) 50vw, 100vw"
                        priority
                      />

                      {/* Favorite Button */}
                      <Button
                        variant="ghost"
                        size="icon"
                        className="absolute top-4 right-4 h-8 w-8 rounded-full bg-background/80 backdrop-blur-sm hover:bg-background/90"
                        onClick={(e) => {
                          e.preventDefault();
                          toggleFavorite(product.id);
                        }}
                      >
                        <Heart
                          className={`h-4 w-4 transition-colors ${
                            favorites.includes(product.id)
                              ? "fill-red-500 text-red-500"
                              : "text-muted-foreground hover:text-foreground"
                          }`}
                        />
                      </Button>
                    </div>

                    {/* Product Info */}
                    <div className="p-4 space-y-2">
                      <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                        <span className="font-medium">{product.brand}</span>
                        {product.category && (
                          <>
                            <span>•</span>
                            <span>{product.category}</span>
                          </>
                        )}
                      </div>

                      <h3 className="font-medium text-foreground group-hover:text-primary transition-colors">
                        {product.name}
                      </h3>

                      <p className="text-lg font-semibold text-foreground">
                        £{product.price.toFixed(2)}
                      </p>
                    </div>
                  </CardContent>
                </Card>
              </CarouselItem>
            ))}
          </CarouselContent>

          <CarouselPrevious className="left-0" />
          <CarouselNext className="right-0" />
        </Carousel>
      </div>
    </section>
  );
}
