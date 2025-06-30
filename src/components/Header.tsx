"use client"
import { Search, User, ShoppingBag, Moon, Sun, Monitor, Menu } from "lucide-react";
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

export function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { theme, setTheme } = 'dark';

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? "bg-white/70 dark:bg-black/70 backdrop-blur-md border-b border-white/20 dark:border-black/20"
          : "bg-white dark:bg-black border-b border-gray-200 dark:border-gray-800"
      }`}
    >
      <div className="container mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
       <div className="flex items-center">
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Ello!</h1>
          </div>

          {/* Navigation - Desktop */}
          <NavigationMenu className="hidden md:flex">
            <NavigationMenuList className="bg-white/80 dark:bg-black/80 backdrop-blur-sm rounded-full px-6 py-2 shadow-lg">
              <NavigationMenuItem>
                <NavigationMenuLink className="px-4 py-2 text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white font-medium transition-colors">
                  Home
                </NavigationMenuLink>
              </NavigationMenuItem>
              <NavigationMenuItem>
                <NavigationMenuLink className="px-4 py-2 text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white font-medium transition-colors">
                  Shop
                </NavigationMenuLink>
              </NavigationMenuItem>
              <NavigationMenuItem>
                <NavigationMenuLink className="px-4 py-2 text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white font-medium transition-colors">
                  Brands
                </NavigationMenuLink>
              </NavigationMenuItem>
              <NavigationMenuItem>
                <NavigationMenuLink className="px-4 py-2 text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white font-medium transition-colors">
                  Contact Us
                </NavigationMenuLink>
              </NavigationMenuItem>
            </NavigationMenuList>
          </NavigationMenu>

          {/* Actions */}
          <div className="flex items-center space-x-4">
            {/* Theme Dropdown */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon" className="text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white">
                  {theme === "dark" ? (
                    <Moon className="h-5 w-5" />
                  ) : theme === "light" ? (
                    <Sun className="h-5 w-5" />
                  ) : (
                    <Monitor className="h-5 w-5" />
                  )}
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="bg-white dark:bg-black border border-gray-200 dark:border-gray-800">
                <DropdownMenuItem className="cursor-pointer">
                  <Sun className="mr-2 h-4 w-4" />
                  Light
                </DropdownMenuItem>
                <DropdownMenuItem  className="cursor-pointer">
                  <Moon className="mr-2 h-4 w-4" />
                  Dark
                </DropdownMenuItem>
                <DropdownMenuItem  className="cursor-pointer">
                  <Monitor className="mr-2 h-4 w-4" />
                  System
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>

            {/* Desktop Icons */}
            <div className="hidden md:flex items-center space-x-4">
              <Button variant="ghost" size="icon" className="text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white">
                <Search className="h-5 w-5" />
              </Button>
              <Button variant="ghost" size="icon" className="text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white">
                <User className="h-5 w-5" />
              </Button>
              <Button variant="ghost" size="icon" className="text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white">
                <ShoppingBag className="h-5 w-5" />
              </Button>
            </div>

            {/* Mobile Menu */}
            <DropdownMenu open={isMobileMenuOpen} onOpenChange={setIsMobileMenuOpen}>
              <DropdownMenuTrigger asChild className="md:hidden">
                <Button variant="ghost" size="icon" className="text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white">
                  <Menu className="h-5 w-5" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-56 bg-white dark:bg-black border border-gray-200 dark:border-gray-800">
                <DropdownMenuItem className="cursor-pointer text-gray-700 dark:text-gray-300">
                  Home
                </DropdownMenuItem>
                <DropdownMenuItem className="cursor-pointer text-gray-700 dark:text-gray-300">
                  Shop
                </DropdownMenuItem>
                <DropdownMenuItem className="cursor-pointer text-gray-700 dark:text-gray-300">
                  Brands
                </DropdownMenuItem>
                <DropdownMenuItem className="cursor-pointer text-gray-700 dark:text-gray-300">
                  Contact Us
                </DropdownMenuItem>
                <DropdownMenuItem className="cursor-pointer text-gray-700 dark:text-gray-300">
                  <Search className="mr-2 h-4 w-4" />
                  Search
                </DropdownMenuItem>
                <DropdownMenuItem className="cursor-pointer text-gray-700 dark:text-gray-300">
                  <User className="mr-2 h-4 w-4" />
                  Profile
                </DropdownMenuItem>
                <DropdownMenuItem className="cursor-pointer text-gray-700 dark:text-gray-300">
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