"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";

const categories = [
  {
    name: "Laptops",
    image:
      "https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=800&h=600&fit=crop",
  },
  {
    name: "Smartphones",
    image:
      "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=800&h=600&fit=crop",
  },
  {
    name: "Tablets",
    image:
      "https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?w=800&h=600&fit=crop",
  },
  {
    name: "Headphones",
    image:
      "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=800&h=600&fit=crop",
  },
  {
    name: "Smartwatches",
    image:
      "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=800&h=600&fit=crop",
  },
  {
    name: "Cameras",
    image:
      "https://images.unsplash.com/photo-1606983340126-99ab4feaa64a?w=800&h=600&fit=crop",
  },
  {
    name: "Gaming",
    image:
      "https://images.unsplash.com/photo-1606144042614-b2417e99c4e3?w=800&h=600&fit=crop",
  },
  {
    name: "Accessories",
    image:
      "https://images.unsplash.com/photo-1572635196237-14b3f281503f?w=800&h=600&fit=crop",
  },
];

const defaultImage =
  "https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=800&h=600&fit=crop";

export default function ShopByCategory() {
  const [hoveredCategory, setHoveredCategory] = useState<number | null>(null);

  const handleMouseEnter = (index: number) => {
    setHoveredCategory(index);
  };

  const handleMouseLeave = () => {
    setHoveredCategory(null);
  };

  return (
    <section className="max-w-7xl mx-auto px-4 py-16">
      <div className="grid grid-cols-1 md:grid-cols-2 items-center gap-12">
        {/* Text List */}
        <div>
          <p className="text-sm text-muted-foreground mb-8 font-light">
            ↳ Shop by category
          </p>
          <ul className="space-y-1">
            {categories.map((category, index) => (
              <li key={category.name}>
                <Link
                  href="#"
                  className={`inline-block text-2xl font-light transition-colors duration-300 relative group ${
                    hoveredCategory !== null && hoveredCategory !== index
                      ? "text-muted-foreground"
                      : "text-foreground"
                  }`}
                  onMouseEnter={() => handleMouseEnter(index)}
                  onMouseLeave={handleMouseLeave}
                >
                  {category.name}
                  <span
                    className={`absolute bottom-0 left-0 h-[1px] bg-foreground transition-all duration-300 ${
                      hoveredCategory === index ? "w-full" : "w-0"
                    }`}
                  />
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Image */}
        <div className="relative overflow-hidden rounded-lg">
          {/* Default Image */}
          <Image
            src={defaultImage}
            alt="Category preview"
            width={800}
            height={600}
            className="w-full h-96 object-cover"
            priority
          />

          {/* Hover Images */}
          {categories.map((category, index) => (
            <div
              key={category.name}
              className={`absolute inset-0 transition-all duration-500 ease-out ${
                hoveredCategory === index
                  ? "translate-x-0 opacity-100"
                  : "translate-x-full opacity-0"
              }`}
            >
              <Image
                src={category.image}
                alt={category.name}
                width={800}
                height={600}
                className="w-full h-96 object-cover"
              />
            </div>
          ))}

          <div className="absolute inset-0 bg-gradient-to-r from-orange-400/20 to-pink-500/20 opacity-50 transition-opacity duration-500" />
        </div>
      </div>
    </section>
  );
}
