"use client";

import Link from "next/link";

interface BreadcrumbProps {
  title: string;          // Example: "Men's Caps & Hats"
  itemsCount?: number;    // Example: 120
  path?: string[];        // Example: ["Home", "Men's Caps & Hats"]
}

export default function Breadcrumb({
  title,
  itemsCount = 0,
  path = ["Home"],
}: BreadcrumbProps) {
  return (
    <section className="Breadcrumb-wrapper">
        <div className="container mx-auto">
            <div className="border-b border-gray-200 py-10 flex flex-col justify-center items-center text-center">
                {/* Breadcrumb path */}
                <nav className="text-lg text-gray-700 font-normal font-['Inter'] mb-2">
                    {path.map((item, index) => (
                    <span key={index}>
                        <Link href="/" className="hover:text-black transition">
                        {item}
                        </Link>
                        {index < path.length - 1 && <span> / </span>}
                    </span>
                    ))}
                </nav>

                {/* Page Title */}
                <h1 className="text-3xl md:text-4xl font-bold text-gray-900 font-['Inter']">
                    {title}
                </h1>

                {/* Item Count */}
                <p className="text-zinc-400 mt-2 text-sm">
                    {itemsCount} Items
                </p>
            </div>
        </div>
    </section>

  );
}
