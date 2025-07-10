"use client";

import { useState } from "react";
import Image from "next/image";
import { Facebook, Instagram, Youtube, Twitter } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Marquee from "react-fast-marquee";
import RenderFooterSection from "./RenderFooterSection";
import Link from "next/link";


const footerLinks = {
  support: ["Contact us", "Delivery & returns", "FAQs", "Gift cards", "Klarna"],
  services: [
    "Stores",
    "Appointments",
    "Ski workshop",
    "Demo",
    "Equipment hire",
  ],
  about: ["About us", "Heritage", "Careers", "Affiliate programme"],
  partners: [
    "The Snowboard Asylum",
    "Outsiders Store",
    "Our partners",
    "Charities we support",
  ],
};

const benefits = [
  "Free UK delivery over £80",
  "Experts since 1933",
  "Free UK delivery over £80",
  "Experts since 1933",
  "Free UK delivery over £80",
  "Experts since 1933",
  "Free UK delivery over £80",
];

export default function Footer() {
  const [email, setEmail] = useState("");
  const [hoveredSection, setHoveredSection] = useState<string | null>(null);
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  const handleSubmit = () => {
    console.log("Newsletter signup:", email);
    setEmail("");
  };

  const handleMouseEnter = (section: string, index: number) => {
    setHoveredSection(section);
    setHoveredIndex(index);
  };

  const handleMouseLeave = () => {
    setHoveredSection(null);
    setHoveredIndex(null);
  };


  return (
    <footer className="bg-muted text-muted-foreground py-10 border-t">
      {/* Main Footer Content */}
      <div className="max-w-7xl mx-auto px-6 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">
          {/* Left Side - Newsletter Text */}
          <div className="lg:col-span-5">
            <h2 className="text-4xl lg:text-5xl font-light mb-16 leading-tight">
              Sign up to our newsletter for guidance, support and promotions.
            </h2>
          </div>

          {/* Right Side - Form & Social */}
          <div className="lg:col-span-4">
            <div className="flex flex-col sm:flex-row gap-4 mb-8">
              <Input
                type="email"
                placeholder="Email Address*"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="flex-1 bg-transparent border-muted-foreground/30 placeholder:text-muted-foreground focus:border-foreground"
              />
              <Button
                onClick={handleSubmit}
                className="px-8 bg-foreground text-background hover:bg-foreground/90"
              >
                Submit
              </Button>
            </div>

            {/* Social Media */}
            <div>
              <p className="text-muted-foreground mb-4 font-medium">
                Follow us
              </p>
              <div className="flex space-x-4">
                <a
                  href="#"
                  className="text-muted-foreground hover:text-foreground hover:bg-foreground/10 hover:scale-110 transition-all duration-300 ease-in-out transform p-2 rounded-full"
                >
                  <Facebook className="w-6 h-6" />
                </a>
                <a
                  href="#"
                  className="text-muted-foreground hover:text-foreground hover:bg-foreground/10 hover:scale-110 transition-all duration-300 ease-in-out transform p-2 rounded-full"
                >
                  <Twitter className="w-6 h-6" />
                </a>
                <a
                  href="#"
                  className="text-muted-foreground hover:text-foreground hover:bg-foreground/10 hover:scale-110 transition-all duration-300 ease-in-out transform p-2 rounded-full"
                >
                  <Instagram className="w-6 h-6" />
                </a>
                <a
                  href="#"
                  className="text-muted-foreground hover:text-foreground hover:bg-foreground/10 hover:scale-110 transition-all duration-300 ease-in-out transform p-2 rounded-full"
                >
                  <Youtube className="w-6 h-6" />
                </a>
              </div>
            </div>
          </div>

          {/* Images */}
          <div className="lg:col-span-3">
            <div className="grid grid-cols-2 gap-3">
              <div className="aspect-square rounded-lg overflow-hidden w-full h-40 sm:h-48 lg:h-56">
                <Image
                  src="https://images.unsplash.com/photo-1551524164-687a55dd1126?w=600&h=600&fit=crop"
                  alt="Mountain landscape"
                  width={600}
                  height={600}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="aspect-square rounded-lg overflow-hidden w-full h-40 sm:h-48 lg:h-56">
                <Image
                  src="https://images.unsplash.com/photo-1551524164-687a55dd1126?w=600&h=600&fit=crop"
                  alt="Snow mountain"
                  width={600}
                  height={600}
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          </div>
        </div>
        {/* Thin divider line */}
        <div className="border-t border-sidebar-foreground"></div>
        {/* Footer Links positioned next to images and Benefits Banner below */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mt-16">
          {/* Footer Links */}
          <div className="lg:col-span-9 grid grid-cols-2 md:grid-cols-4 gap-8">
            <RenderFooterSection
              title="Support"
              links={footerLinks.support}
              type="support"
              hoveredSection={hoveredSection}
              hoveredIndex={hoveredIndex}
              handleMouseEnter={handleMouseEnter}
              handleMouseLeave={handleMouseLeave}
            />
            <RenderFooterSection
              title="Services"
              links={footerLinks.services}
              type="services"
              hoveredSection={hoveredSection}
              hoveredIndex={hoveredIndex}
              handleMouseEnter={handleMouseEnter}
              handleMouseLeave={handleMouseLeave}
            />
            <RenderFooterSection
              title="About"
              links={footerLinks.about}
              type="about"
              hoveredSection={hoveredSection}
              hoveredIndex={hoveredIndex}
              handleMouseEnter={handleMouseEnter}
              handleMouseLeave={handleMouseLeave}
            />
            <RenderFooterSection
              title="Partners"
              links={footerLinks.partners}
              type="partners"
              hoveredSection={hoveredSection}
              hoveredIndex={hoveredIndex}
              handleMouseEnter={handleMouseEnter}
              handleMouseLeave={handleMouseLeave}
            />
          </div>

          {/* Benefits Banner positioned below images */}
          <div className="lg:col-span-3 overflow-hidden">
            <Marquee speed={50} gradient={false}>
              {benefits.map((benefit, index) => (
                <div
                  key={index}
                  className="flex items-center whitespace-nowrap"
                >
                  <span className="text-sm text-primary mx-8">{benefit}</span>
                  <span className="text-orange-500 text-xs">●</span>
                </div>
              ))}
            </Marquee>
          </div>
        </div>
      </div>

      {/* Thin divider line */}
      <div className="border-t border-sidebar-foreground"></div>

      {/* Bottom Footer */}
      <div className="max-w-7xl mx-auto px-6 py-6">
        <div className="flex flex-col md:flex-row justify-between items-center text-sm">
          <div className="flex flex-wrap gap-6 mb-4 md:mb-0">
            <Link
              href="#"
              className="text-primary hover:text-primary-foreground transition-colors"
            >
              Terms & conditions
            </Link>
            <Link
              href="#"
              className="text-primary hover:text-primary-foreground transition-colors"
            >
              Privacy & cookies
            </Link>
            <Link
              href="#"
              className="text-primary hover:text-primary-foreground transition-colors"
            >
              Cookie declaration
            </Link>
          </div>
          <p className="text-primary hover:text-primary-foreground">
            © Amr Ello Noriic 2025
          </p>
        </div>
      </div>
    </footer>
  );
}
