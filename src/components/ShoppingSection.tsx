import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";

export function ShoppingSection() {
  return (
    <section className="min-h-screen bg-background text-foreground transition-colors duration-300">
      <div className="container mx-auto px-8 py-16 lg:py-24">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-center">
          {/* Left Column */}
          <div className="space-y-8">
            <div className="flex items-center space-x-3 text-muted-foreground">
              <ArrowLeft className="h-5 w-5" />
              <span className="text-lg font-light tracking-wide">
                Latest tech deals
              </span>
            </div>

           {/* Empty space */}
            <div className="h-32 lg:h-64"></div>
          </div>

          {/* Right Column  */}
          <div className="space-y-12">
            <div className="space-y-8">
              <h2 className="text-5xl lg:text-6xl xl:text-7xl font-light leading-tight tracking-tight text-foreground">
                Upgrade your tech
              </h2>

              <div className="space-y-6">
                <p className="text-xl lg:text-2xl font-light leading-relaxed text-muted-foreground max-w-2xl">
                  Discover the latest smartphones, tablets, headphones, and
                  accessories — all in one place. Shop top brands like Apple,
                  Samsung, Sony, and more at unbeatable prices.
                </p>
              </div>
            </div>


            <div className="pt-8">
              <Button
                size="lg"
                className="group relative bg-secondary hover:bg-secondary/80 text-secondary-foreground border border-border hover:border-primary/50 transition-all duration-500 px-8 py-4 rounded-lg text-lg font-medium overflow-hidden"
              >
                <div className="relative z-10">
                  <span className="inline-block transition-transform duration-300 group-hover:translate-x-1">
                    Shop Now
                  </span>
                </div>
                <div className="absolute inset-0 bg-primary/5 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left"></div>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
