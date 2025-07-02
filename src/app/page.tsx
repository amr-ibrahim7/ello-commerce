// import { FeaturedDealsSection } from "@/components/FeaturedDealsSection";
import FeaturedDealsSection from "@/components/FeaturedDealsSection";
import { FeaturedProductsSection } from "@/components/FeaturedProductsSection";
import Footer from "@/components/Footer";
import { Header } from "@/components/Header";
import { HeroSection } from "@/components/HeroSection";
import ShopByCategory from "@/components/ShopByCategory";
import { ShoppingSection } from "@/components/ShoppingSection";


export default function Home() {
  return (
   <main className="min-h-screen">
      <Header />
      <HeroSection />
      <ShoppingSection />
      <FeaturedProductsSection />
      <FeaturedDealsSection />
      <ShopByCategory />
      <Footer />
    </main>
  );
}
