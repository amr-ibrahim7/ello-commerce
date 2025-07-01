"use client"
import { Search, User, ShoppingBag, Menu } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
} from "@/components/ui/navigation-menu";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useEffect, useState } from "react";
import { ThemeToggle } from "@/app/theme-toggle";

export function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

useEffect(() => {
  const handleScroll = () => {
    requestAnimationFrame(() => {
      setIsScrolled(window.scrollY > 10);
    });
  };
  window.addEventListener("scroll", handleScroll);
  return () => window.removeEventListener("scroll", handleScroll);
}, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        isScrolled
          ? "bg-background/80 backdrop-blur-xl border-b border-border dark:bg-background/80 dark:border-white/10"
          : "bg-transparent"
      }`}
    >
      <div className="container mx-auto px-8 py-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <h1 className="text-2xl font-normal text-foreground tracking-wide dark:text-white">
              ello <span className="font-bold">noric</span>
            </h1>
          </div>

          {/* Navi - Desktop */}
          <NavigationMenu className="hidden md:flex">
            <NavigationMenuList className="bg-card/50 backdrop-blur-md rounded-full px-8 py-3 border border-border dark:bg-card/30 dark:border-white/10">
              <NavigationMenuItem>
                <NavigationMenuLink className="px-6 py-2 text-foreground/90 hover:text-foreground font-normal transition-all duration-300 hover:bg-accent/50 rounded-full dark:text-white/90 dark:hover:text-white dark:hover:bg-white/10">
                Home
                </NavigationMenuLink>
              </NavigationMenuItem>
              <NavigationMenuItem>
                <NavigationMenuLink className="px-6 py-2 text-foreground/90 hover:text-foreground font-normal transition-all duration-300 hover:bg-accent/50 rounded-full dark:text-white/90 dark:hover:text-white dark:hover:bg-white/10">
                  Shop
                </NavigationMenuLink>
              </NavigationMenuItem>
              <NavigationMenuItem>
                <NavigationMenuLink className="px-6 py-2 text-foreground/90 hover:text-foreground font-normal transition-all duration-300 hover:bg-accent/50 rounded-full dark:text-white/90 dark:hover:text-white dark:hover:bg-white/10">
                  Brands
                </NavigationMenuLink>
              </NavigationMenuItem>
              <NavigationMenuItem>
                <NavigationMenuLink className="px-6 py-2 text-foreground/90 hover:text-foreground font-normal transition-all duration-300 hover:bg-accent/50 rounded-full dark:text-white/90 dark:hover:text-white dark:hover:bg-white/10">
                   Contact Us
                </NavigationMenuLink>
              </NavigationMenuItem>
            </NavigationMenuList>
          </NavigationMenu>


          <div className="flex items-center space-x-2">

            <div className="hidden md:flex items-center space-x-2 bg-card/50 backdrop-blur-md rounded-full px-4 py-3 border border-border dark:bg-card/30 dark:border-white/10">
              <Button variant="ghost" size="icon" className="text-foreground/80 hover:text-foreground hover:bg-accent rounded-full dark:text-white/80 dark:hover:text-white dark:hover:bg-white/10">
                <Search className="h-5 w-5" />
              </Button>
              <Button variant="ghost" size="icon" className="text-foreground/80 hover:text-foreground hover:bg-accent rounded-full dark:text-white/80 dark:hover:text-white dark:hover:bg-white/10">
                <User className="h-5 w-5" />
              </Button>
              <Button variant="ghost" size="icon" className="text-foreground/80 hover:text-foreground hover:bg-accent rounded-full dark:text-white/80 dark:hover:text-white dark:hover:bg-white/10">
                <ShoppingBag className="h-5 w-5" />
              </Button>
            </div>

        
            <ThemeToggle />

            {/* Mobile Menu */}
            <DropdownMenu open={isMobileMenuOpen} onOpenChange={setIsMobileMenuOpen}>
              <DropdownMenuTrigger asChild className="md:hidden">
                <Button variant="ghost" size="icon" className="text-foreground/80 hover:text-foreground hover:bg-accent rounded-full dark:text-white/80 dark:hover:text-white dark:hover:bg-white/10">
                  <Menu className="h-5 w-5" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-56 bg-popover/95 backdrop-blur-md border border-border dark:bg-card/95 dark:border-white/10">
                <DropdownMenuItem className="cursor-pointer hover:bg-accent focus:bg-accent dark:hover:bg-white/10 dark:focus:bg-white/10">
                  Home
                </DropdownMenuItem>
                <DropdownMenuItem className="cursor-pointer hover:bg-accent focus:bg-accent dark:hover:bg-white/10 dark:focus:bg-white/10">
                  Shop
                </DropdownMenuItem>
                <DropdownMenuItem className="cursor-pointer hover:bg-accent focus:bg-accent dark:hover:bg-white/10 dark:focus:bg-white/10">
                  Brands
                </DropdownMenuItem>
                <DropdownMenuItem className="cursor-pointer hover:bg-accent focus:bg-accent dark:hover:bg-white/10 dark:focus:bg-white/10">
                  Contact Us
                </DropdownMenuItem>
                <DropdownMenuItem className="cursor-pointer hover:bg-accent focus:bg-accent dark:hover:bg-white/10 dark:focus:bg-white/10">
                  <Search className="mr-2 h-4 w-4" />
                  Search
                </DropdownMenuItem>
                <DropdownMenuItem className="cursor-pointer hover:bg-accent focus:bg-accent dark:hover:bg-white/10 dark:focus:bg-white/10">
                  <User className="mr-2 h-4 w-4" />
                  Profile
                </DropdownMenuItem>
                <DropdownMenuItem className="cursor-pointer hover:bg-accent focus:bg-accent dark:hover:bg-white/10 dark:focus:bg-white/10">
                  <ShoppingBag className="mr-2 h-4 w-4" />
                  Cart
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </div>
    </header>
  );
}