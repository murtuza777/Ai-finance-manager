"use client";

import { motion } from "framer-motion";
import { ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useAuth } from "@/contexts/AuthContext";

export function HeroSection() {
  const { user } = useAuth();
  const router = useRouter();

  const handleGetStarted = () => {
    if (user) {
      router.push("/dashboard");
    } else {
      const authSection = document.getElementById("auth");
      authSection?.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section className="pt-32 pb-20 px-4">
      <div className="container mx-auto flex flex-col lg:flex-row items-center justify-between">
        <div className="lg:w-1/2 mb-10 lg:mb-0">
          <motion.h1 
            className="text-5xl lg:text-7xl font-bold mb-6 leading-tight"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            Master Your Finances with{" "}
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-primary to-secondary">
              VFM
            </span>
          </motion.h1>
          <motion.p 
            className="text-xl mb-8 text-muted-foreground"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            Harness the power of AI and cutting-edge technology to revolutionize your financial management.
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            <Button 
              size="lg" 
              variant="default" 
              className="mr-4 h-12 px-6 text-lg"
              onClick={handleGetStarted}
            >
              Get Started <ChevronRight className="ml-2 h-5 w-5" />
            </Button>
            <Button 
              size="lg" 
              variant="outline" 
              className="h-12 px-6 text-lg"
            >
              Learn More
            </Button>
          </motion.div>
        </div>
        <div className="lg:w-1/2 relative">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-72 h-72 bg-primary/20 rounded-full filter blur-3xl" />
          <motion.div
            className="relative z-10 rounded-lg shadow-2xl overflow-hidden"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
          >
            <Image
              src="/dashboard-preview.png"
              alt="VFM Dashboard Preview"
              width={600}
              height={400}
              className="w-full h-auto"
              priority
            />
          </motion.div>
        </div>
      </div>
    </section>
  );
} 