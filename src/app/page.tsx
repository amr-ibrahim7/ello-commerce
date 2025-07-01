import { Header } from "@/components/Header";
import { HeroSection } from "@/components/HeroSection";
import { ShoppingSection } from "@/components/ShoppingSection";


export default function Home() {
  return (
   <main className="min-h-screen">
      <Header />
      <HeroSection />
      <ShoppingSection />
    </main>
  );
}
