"use client";

import React, { useState } from "react";
import {
  Heart,
  ArrowLeft,
  ArrowRight,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import Image from "next/image";
import { Button } from "./ui/button";

const FeaturedDealsSection = () => {
  const [currentProductIndex, setCurrentProductIndex] = useState(0);
  const [isFavorite, setIsFavorite] = useState(false);

  const products = [
    {
      id: 1,
      brand: "Sony",
      name: "WH-1000XM5 Wireless Noise Cancelling Headphones",
      originalPrice: 349.99,
      salePrice: 279.99,
      image:
        "https://images.unsplash.com/photo-1603791440384-56cd371ee9a7?w=400&h=500&fit=crop", // صورة هيدفون
    },
    {
      id: 2,
      brand: "Samsung",
      name: "Galaxy Tab S9 Ultra – 14.6'' AMOLED Display",
      originalPrice: 1199.99,
      salePrice: 999.99,
      image:
        "https://images.unsplash.com/photo-1603791440384-56cd371ee9a7?w=400&h=500&fit=crop", // تابلت
    },
    {
      id: 3,
      brand: "Anker",
      name: "PowerCore 20000mAh Portable Charger – USB-C",
      originalPrice: 79.99,
      salePrice: 59.99,
      image:
        "https://images.unsplash.com/photo-1603791440384-56cd371ee9a7?w=400&h=500&fit=crop", // باور بانك
    },
  ];

  const currentProduct = products[currentProductIndex];

  const nextProduct = () => {
    setCurrentProductIndex((prev) => (prev + 1) % products.length);
  };

  const prevProduct = () => {
    setCurrentProductIndex(
      (prev) => (prev - 1 + products.length) % products.length
    );
  };

  const toggleFavorite = () => {
    setIsFavorite(!isFavorite);
  };

  return (
    <section className="py-8 lg:py-24 bg-background text-foreground transition-colors duration-300">
      {/* Mobile Layout */}
      <div className="lg:hidden space-y-6">
        {/* Hero Section - Mobile */}
        <div className="relative h-[400px] mx-4 rounded-2xl overflow-hidden">
          <Image
            src="/any.webp"
            alt="Paddleboards"
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-black/30" />

          <div className="relative z-10 p-6 h-full flex flex-col justify-between text-white">
            <div className="flex items-center">
              <ArrowLeft className="h-4 w-4 mr-2" />
              <span className="text-sm font-light">
                Tech <span className="font-semibold">deals</span>
              </span>
            </div>

            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-2xl font-bold leading-tight max-w-[200px]">
                  Save up to 40% on top electronics this summer
                </h2>
              </div>

              <Button
                size="sm"
                className="bg-card hover:bg-accent text-card-foreground border-0 px-6 py-2 rounded-lg text-sm font-medium shadow-lg transition-colors"
              >
                Shop now
              </Button>
            </div>
          </div>
        </div>

        {/* Product Card - Mobile */}
        <div className="px-4">
          <div className="relative bg-background rounded-2xl shadow-lg overflow-hidden border border-border">
            <div className="relative aspect-[4/3] overflow-hidden">
              <Image
                src={currentProduct.image}
                alt={currentProduct.name}
                fill
                className="object-cover"
              />

              <Button
                onClick={toggleFavorite}
                size="icon"
                className="bg-card/90 dark:bg-card/30 backdrop-blur-sm rounded-full hover:bg-card transition-colors"
              >
                <Heart
                  className={`h-4 w-4 transition-colors ${
                    isFavorite
                      ? "fill-red-500 text-red-500"
                      : "text-muted-foreground"
                  }`}
                />
              </Button>

              {/* Mobile Navigation */}
              <div className="absolute inset-x-0 bottom-3 flex justify-center space-x-3">
                <Button
                  onClick={prevProduct}
                  size="icon"
                  className="bg-card/90 dark:bg-card/30 backdrop-blur-sm rounded-full hover:bg-card transition-colors"
                >
                  <ChevronLeft className="h-4 w-4 text-card-foreground" />
                </Button>
                <Button
                  onClick={nextProduct}
                  size="icon"
                  className="bg-card/90 dark:bg-card/30 backdrop-blur-sm rounded-full hover:bg-card transition-colors"
                >
                  <ChevronRight className="h-4 w-4 text-card-foreground" />
                </Button>
              </div>
            </div>

            <div className="p-4 space-y-2">
              <p className="text-xs text-muted-foreground font-medium uppercase tracking-wide">
                {currentProduct.brand}
              </p>
              <h3 className="text-base font-semibold leading-tight">
                {currentProduct.name}
              </h3>
              <div className="flex items-center space-x-2">
                <span className="text-sm line-through text-muted-foreground">
                  £{currentProduct.originalPrice.toFixed(2)}
                </span>
                <span className="text-lg font-bold text-primary">
                  £{currentProduct.salePrice.toFixed(2)}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Desktop */}
      <div className="hidden lg:grid lg:grid-cols-2 h-[700px] w-full">
        {/* Left Side */}
        <div className="relative overflow-hidden">
          <Image
            src="/ee.jpg"
            alt="Paddleboards"
            fill
            className="object-cover"
            priority
          />

          <div className="relative z-10 p-12 text-white h-full flex flex-col justify-between">
            <div className="flex items-center">
              <ArrowLeft className="h-5 w-5 mr-2" />
              <span className="text-lg font-light">
                Summer electronics <span className="font-semibold">deals</span>
              </span>
            </div>

            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-5xl font-bold leading-tight max-w-md">
                  Save up to 40% on the latest tech gadgets
                </h2>
              </div>

              <div>
                <Button
                  size="lg"
                  className="group relative bg-card hover:bg-accent text-card-foreground border-0 transition-all duration-500 px-8 py-4 rounded-lg text-lg font-medium overflow-hidden shadow-lg"
                >
                  <div className="relative z-10">
                    <span className="inline-block transition-transform duration-500 group-hover:-translate-y-full group-hover:opacity-0">
                      Shop now
                    </span>
                    <span className="absolute inset-0 inline-block transition-transform duration-500 translate-y-full opacity-0 group-hover:translate-y-0 group-hover:opacity-100">
                      Shop now
                    </span>
                  </div>
                </Button>
              </div>
            </div>
          </div>
        </div>

        {/* Right Side */}
        <div className="relative flex items-center justify-center p-12 bg-muted transition-colors">
          <Button
            onClick={prevProduct}
            size="icon"
            className="absolute left-4 top-1/2 -translate-y-1/2 z-20 bg-background shadow-lg rounded-full hover:bg-accent transition-colors"
          >
            <ChevronLeft className="h-5 w-5 text-foreground" />
          </Button>

          <Button
            onClick={nextProduct}
            size="icon"
            className="absolute right-4 top-1/2 -translate-y-1/2 z-20 bg-background shadow-lg rounded-full hover:bg-accent transition-colors"
          >
            <ChevronRight className="h-5 w-5 text-foreground" />
          </Button>

          <div className="relative bg-background rounded-2xl shadow-lg overflow-hidden w-full max-w-sm border border-border transition-colors">
            <div className="relative aspect-[4/5] overflow-hidden">
              <Image
                src={currentProduct.image}
                alt={currentProduct.name}
                fill
                className="object-cover"
              />

              <Button
                onClick={toggleFavorite}
                size="icon"
                className="absolute top-4 right-4 bg-card/90 dark:bg-card/30 backdrop-blur-sm rounded-full hover:bg-card transition-colors"
              >
                <Heart
                  className={`h-5 w-5 transition-colors ${
                    isFavorite
                      ? "fill-red-500 text-red-500"
                      : "text-muted-foreground"
                  }`}
                />
              </Button>
            </div>

            <div className="p-6 space-y-3">
              <p className="text-sm text-muted-foreground font-medium">
                {currentProduct.brand}
              </p>
              <h3 className="text-lg font-semibold leading-tight">
                {currentProduct.name}
              </h3>
              <div className="flex items-center space-x-3">
                <span className="text-base line-through text-muted-foreground">
                  £{currentProduct.originalPrice.toFixed(2)}
                </span>
                <span className="text-xl font-bold">
                  £{currentProduct.salePrice.toFixed(2)}
                </span>
              </div>
            </div>

            <div className="flex justify-center pb-6 space-x-4">
              <Button
                onClick={prevProduct}
                size="icon"
                variant="outline"
                className="rounded-full"
              >
                <ArrowLeft className="h-4 w-4" />
              </Button>
              <Button
                onClick={nextProduct}
                size="icon"
                variant="outline"
                className="rounded-full"
              >
                <ArrowRight className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FeaturedDealsSection;
