"use client";

import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";

export function HeroSection() {
  const [lineFullWidth, setLineFullWidth] = useState(false);

 useEffect(() => {
  const timeout = setTimeout(() => {
    requestAnimationFrame(() => {
      setLineFullWidth(true);
    });
  }, 500);

  return () => clearTimeout(timeout);
}, []);


  return (
    <section className="relative h-screen flex items-center justify-center overflow-hidden">
      <video
        autoPlay
        loop
        muted
        playsInline
        className="absolute top-0 left-0 w-full h-full object-cover z-0"
      >
        <source src="/videos/vhero.mp4" type="video/mp4" />
        Your browser does not support the video tag.
      </video>

      {/* Overlay */}
      <div className="absolute top-0 left-0 w-full h-full bg-black/40 z-10" />


      <div className="relative z-20 text-white w-full px-8 max-w-7xl mx-auto">
        <div className="flex flex-col items-start">

          <h1 className="text-[80px] md:text-[120px] font-light mb-6 leading-none tracking-tight">
            Power Up Your Tech
          </h1>

          <div
            className={`h-px bg-white transition-all duration-[2000ms] ease-in-out ${
              lineFullWidth ? "w-full" : "w-0"
            }`}
          />
          
          <div className="w-full flex justify-between items-center mt-6 flex-wrap gap-y-4">
            <p className="text-xl md:text-2xl font-light opacity-90">
              Premium electronics. Unbeatable prices. Shop now.
            </p>
            <div className="relative inline-block">
              <Button
                size="lg"
                className="group relative bg-white/10 hover:bg-white/15 text-white border border-white/30 hover:border-white/50 backdrop-blur-sm transition-all duration-500 px-10 py-4 rounded-full text-lg font-light overflow-hidden"
              >
                <div className="relative z-10">
                  <span className="inline-block transition-transform duration-500 group-hover:-translate-y-full group-hover:opacity-0">
                  Start Shopping
                  </span>
                  <span className="absolute inset-0 inline-block transition-transform duration-500 translate-y-full opacity-0 group-hover:translate-y-0 group-hover:opacity-100">
                  Start Shopping
                  </span>
                </div>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}