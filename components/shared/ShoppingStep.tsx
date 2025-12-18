"use client";

import React from "react";

interface Step {
    label: string;
    icon: React.ReactNode;
}

interface ShoppingStepProps {
    steps: Step[];
    activeStep: number;
}
export default function ShoppingStep({ steps, activeStep }: ShoppingStepProps) {
    return (
        <section className="ShoppingStep-wrapper pt-10 w-full">
            <div className="container mx-auto">
                <div className="ShoppingStep-content w-full px-5 md:px-0">
                    <div className="flex items-center justify-between relative max-w-3xl mx-auto">
                    {/* Background Line */}
                    <div className="absolute top-1/2 left-0 w-full h-1 bg-gray-200 -translate-y-1/2"></div>
                    {/* Steps */}
                    {steps.map((step, index) => (
                        <div key={index} className="relative z-10 flex flex-col items-center">
                            <div
                                className={`
                                    w-8 h-8 md:w-12 md:h-12 flex items-center justify-center rounded 
                                    transition-all duration-300
                                    ${index === activeStep ? "bg-[#0F1629] text-white" : "bg-gray-100 text-gray-500"}
                                `}
                            >
                                {step.icon}
                            </div>
                        </div>
                    ))}
                    </div>
                    {/* Labels */}
                    <div className="flex items-center justify-between mt-6 text-sm sm:text-2xl lg:text-3xl font-semibold text-zinc-500 max-w-4xl mx-auto">
                        {steps.map((step, index) => (
                            <span
                                key={index}
                                className={`${index === activeStep ? "text-black" : ""}`}
                            >
                                {step.label}
                            </span>
                        ))}
                    </div>
                </div>

            </div>
        </section>
    );
}
