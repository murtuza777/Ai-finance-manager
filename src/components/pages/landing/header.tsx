"use client";

import React from "react";
import { DollarSign } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

export function Header() {
  const [scrolled, setScrolled] = React.useState(false);
  const router = useRouter();

  React.useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 0);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  const handleGetStarted = () => {
    router.push("/dashboard");
  };

  return (
    <header 
      className={`fixed w-full z-50 transition-all duration-300 ${
        scrolled ? "bg-background/80 backdrop-blur-md shadow-md" : ""
      }`}
    >
      <div className="container mx-auto p-4 flex justify-between items-center">
        <div className="flex items-center space-x-2">
          <DollarSign className="h-8 w-8 text-primary" />
          <span className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary to-secondary">
            VFM
          </span>
        </div>
        <nav className="hidden md:block">
          <ul className="flex space-x-8">
            <li>
              <Button 
                variant="ghost" 
                onClick={() => scrollToSection("features")}
                className="text-lg font-medium hover:text-primary transition-colors"
              >
                Features
              </Button>
            </li>
            <li>
              <Button 
                variant="ghost" 
                onClick={() => scrollToSection("auth")}
                className="text-lg font-medium hover:text-primary transition-colors"
              >
                Sign Up
              </Button>
            </li>
            <li>
              <Button 
                variant="default" 
                onClick={handleGetStarted}
                className="text-sm font-medium"
              >
                Get Started
              </Button>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
} 