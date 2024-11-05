"use client";

import { Sparkles, PieChart, LineChart, Lock, Smartphone, DollarSign } from "lucide-react";
import { FeatureCard } from "./feature-card";

export function FeaturesSection() {
  const features = [
    {
      icon: Sparkles,
      title: "AI-Powered Insights",
      description: "Gain personalized financial advice and predictions powered by advanced machine learning algorithms."
    },
    {
      icon: PieChart,
      title: "Smart Budgeting",
      description: "Effortlessly create and manage budgets with AI-powered categorization and real-time tracking."
    },
    {
      icon: LineChart,
      title: "Investment Analytics",
      description: "Visualize and optimize your investment portfolio with advanced analytics and risk assessment tools."
    },
    {
      icon: Lock,
      title: "Quantum-Grade Security",
      description: "Rest easy knowing your financial data is protected with state-of-the-art encryption and security measures."
    },
    {
      icon: Smartphone,
      title: "Seamless Mobile Experience",
      description: "Access your finances on-the-go with our intuitive and powerful mobile application."
    },
    {
      icon: DollarSign,
      title: "Automated Wealth Building",
      description: "Set up intelligent automation for savings, investments, and bill payments to grow your wealth effortlessly."
    }
  ];

  return (
    <section id="features" className="py-20 px-4">
      <div className="container mx-auto">
        <h2 className="text-4xl font-bold text-center mb-12">
          Powerful Features for{" "}
          <span className="bg-clip-text text-transparent bg-gradient-to-r from-primary to-secondary">
            Financial Success
          </span>
        </h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <FeatureCard key={index} {...feature} />
          ))}
        </div>
      </div>
    </section>
  );
} 