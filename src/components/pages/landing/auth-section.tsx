"use client";

import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { AuthForm } from "./auth-form";

export function AuthSection() {
  return (
    <section id="auth" className="py-20 px-4 bg-gradient-to-b from-background to-primary/5">
      <div className="container mx-auto text-center">
        <h2 className="text-4xl font-bold mb-8">
          Join the Financial Revolution
        </h2>
        <p className="text-xl text-muted-foreground mb-12 max-w-2xl mx-auto">
          Take control of your financial future with VFM. Sign up now and experience the power of AI-driven financial management.
        </p>
        <AnimatePresence>
          <motion.div
            key="auth-form"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.5 }}
            className="max-w-md mx-auto"
          >
            <AuthForm />
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
} 