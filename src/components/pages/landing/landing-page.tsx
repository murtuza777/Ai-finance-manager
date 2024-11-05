"use client";

import React from "react";
import { Header } from "./header";
import { HeroSection } from "./hero-section";
import { FeaturesSection } from "./features-section";
import { AuthSection } from "./auth-section";
import { Footer } from "./footer";

export function LandingPage() {
  return (
    <div className="min-h-screen bg-[radial-gradient(ellipse_at_top_left,_var(--tw-gradient-stops))] from-primary/20 via-background to-secondary/20 overflow-hidden">
      <div className="absolute inset-0 bg-grid-white/[0.02] bg-[size:50px_50px] [mask-image:radial-gradient(ellipse_at_center,white,transparent_75%)]" />
      <Header />
      <main>
        <HeroSection />
        <FeaturesSection />
        <AuthSection />
      </main>
      <Footer />
    </div>
  );
} 