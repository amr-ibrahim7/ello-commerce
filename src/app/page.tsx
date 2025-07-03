import FeaturedDealsSection from "@/components/FeaturedDealsSection";
import { FeaturedProductsSection } from "@/components/FeaturedProductsSection";
import { HeroSection } from "@/components/HeroSection";
import ShopByCategory from "@/components/ShopByCategory";
import { ShoppingSection } from "@/components/ShoppingSection";

export default function Home() {
  return (
    <>
      <HeroSection />
      <ShoppingSection />
      <FeaturedProductsSection />
      <FeaturedDealsSection />
      <ShopByCategory />
    </>
  );
}
