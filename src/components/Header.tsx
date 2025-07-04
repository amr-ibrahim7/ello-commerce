"use client";
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
import Link from "next/link";
import { usePathname } from "next/navigation";

const navItems = [
  { name: "Home", path: "/" },
  { name: "Shop", path: "/products" },
  { name: "Brands", path: "/brands" },
  { name: "Contact Us", path: "/contactUs" },
];

export function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const pathname = usePathname();

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
          ? "bg-muted text-muted-foreground border-b border-border"
          : "bg-transparent"
      }`}
    >
      <div className="container mx-auto px-8 py-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <h1 className="text-2xl font-normal text-foreground tracking-wide">
              Ello <span className="font-bold">Noriic</span>
            </h1>
          </div>

          {/* Navigation - Desktop */}
          <NavigationMenu className="hidden md:flex">
            <NavigationMenuList className="bg-card/50 backdrop-blur-md rounded-full px-8 py-3 border border-border">
              {navItems.map(({ name, path }) => {
                const isActive = pathname === path;
                return (
                  <NavigationMenuItem key={name}>
                    <NavigationMenuLink
                      asChild
                      className={`px-6 py-2 font-normal transition-all duration-300 rounded-full ${
                        isActive
                          ? "bg-background text-foreground"
                          : "text-foreground/90 hover:text-foreground hover:bg-accent/50"
                      }`}
                    >
                      <Link href={path}>{name}</Link>
                    </NavigationMenuLink>
                  </NavigationMenuItem>
                );
              })}
            </NavigationMenuList>
          </NavigationMenu>

          <div className="flex items-center space-x-2">
            <div className="hidden md:flex items-center space-x-2 bg-card/50 backdrop-blur-md rounded-full px-4 py-3 border border-border">
              <Button
                variant="ghost"
                size="icon"
                className="text-foreground/80 hover:text-foreground hover:bg-accent rounded-full"
              >
                <Search className="h-5 w-5" />
              </Button>
              <Button
                variant="ghost"
                size="icon"
                className="text-foreground/80 hover:text-foreground hover:bg-accent rounded-full"
              >
                <User className="h-5 w-5" />
              </Button>
              <Button
                variant="ghost"
                size="icon"
                className="text-foreground/80 hover:text-foreground hover:bg-accent rounded-full"
              >
                <ShoppingBag className="h-5 w-5" />
              </Button>
            </div>

            <ThemeToggle />

            {/* Mobile Menu */}
            <DropdownMenu
              open={isMobileMenuOpen}
              onOpenChange={setIsMobileMenuOpen}
            >
              <DropdownMenuTrigger asChild className="md:hidden">
                <Button
                  variant="ghost"
                  size="icon"
                  className="text-foreground/80 hover:text-foreground hover:bg-accent rounded-full"
                >
                  <Menu className="h-5 w-5" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent
                align="end"
                className="w-56 bg-popover/95 backdrop-blur-md border border-border"
              >
                {navItems.map(({ name, path }) => {
                  const isActive = pathname === path;
                  return (
                    <DropdownMenuItem
                      key={name}
                      asChild
                      className={`cursor-pointer transition-colors ${
                        isActive
                          ? "bg-accent text-foreground"
                          : "hover:bg-accent"
                      }`}
                    >
                      <Link href={path}>{name}</Link>
                    </DropdownMenuItem>
                  );
                })}
                <DropdownMenuItem className="cursor-pointer hover:bg-accent focus:bg-accent">
                  <Search className="mr-2 h-4 w-4" />
                  Search
                </DropdownMenuItem>
                <DropdownMenuItem className="cursor-pointer hover:bg-accent focus:bg-accent">
                  <User className="mr-2 h-4 w-4" />
                  Profile
                </DropdownMenuItem>
                <DropdownMenuItem className="cursor-pointer hover:bg-accent focus:bg-accent">
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
