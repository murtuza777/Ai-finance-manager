"use client";

import React from "react";
import { DollarSign } from "lucide-react";

export function Footer() {
  return (
    <footer className="bg-background/80 backdrop-blur-sm py-8 px-4">
      <div className="container mx-auto flex flex-col md:flex-row justify-between items-center">
        <div className="flex items-center space-x-2 mb-4 md:mb-0">
          <DollarSign className="h-6 w-6 text-primary" />
          <span className="text-xl font-bold">VFM</span>
        </div>
        <nav>
          <ul className="flex space-x-4">
            <li>
              <a href="#" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                Privacy Policy
              </a>
            </li>
            <li>
              <a href="#" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                Terms of Service
              </a>
            </li>
            <li>
              <a href="#" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                Contact Us
              </a>
            </li>
          </ul>
        </nav>
        <div className="mt-4 md:mt-0">
          <p className="text-sm text-muted-foreground">&copy; 2024 VFM. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
} 