"use client";

import { useState } from "react";
import { RiLayoutGrid2Fill } from "react-icons/ri";
import { TfiLayoutGrid2Thumb } from "react-icons/tfi";
import { IoClose } from "react-icons/io5";

interface FilterItem {
  label: string;
  count: number;
}

export default function ShopFilter() {
  // Selected filters
  const [filters, setFilters] = useState<FilterItem[]>([
    { label: "Hat & Cap", count: 5 },
    { label: "Black", count: 10 },
    { label: "Apex", count: 8 },
    { label: "Apex", count: 8 },
    { label: "Apex", count: 8 },
    { label: "Apex", count: 8 },
    { label: "Apex", count: 8 },
  ]);

  // View mode (grid or list)
  const [view, setView] = useState<"grid" | "list">("grid");

  // Sort option
  const [sort, setSort] = useState("Popularity");

  const removeFilter = (label: string) => {
    setFilters((prev) => prev.filter((f) => f.label !== label));
  };

  const clearFilters = () => {
    setFilters([]);
  };

  return (
    <section className="Shopfilter-Wrapper px-8 md:px-0">
        <div className="container mx-auto">
            <div className="py-4 flex flex-wrap items-center justify-between gap-4 text-sm">
                {/* LEFT — FILTER TAGS */}
                <div className="flex flex-wrap items-center gap-3">

                    {filters.map((item, index) => (
                    <div
                        key={index}
                        className="flex items-center gap-2 border border-slate-200 px-3 py-1.5 text-zinc-500"
                    >
                        <button onClick={() => removeFilter(item.label)}>
                        <IoClose className="text-zinc-500 text-[13px]" />
                        </button>
                        <span>
                        {item.label} ({item.count})
                        </span>
                    </div>
                    ))}

                    {/* Clear filters */}
                    {filters.length > 0 && (
                    <button
                        onClick={clearFilters}
                        className="text-zinc-500 underline ml-2 hover:text-zinc-600"
                    >
                        Clear Filters
                    </button>
                    )}

                </div>
                {/* RIGHT — VIEW TOGGLE + SORT */}
                <div className="flex items-center gap-4">

                    {/* GRID/LIST Icons */}
                    <div className="flex items-center gap-3">
                    <button onClick={() => setView("grid")}>
                        <RiLayoutGrid2Fill
                        className={`text-xl ${view === "grid" ? "text-black" : "text-zinc-500"}`}
                        />
                    </button>

                    <button onClick={() => setView("list")}>
                        <TfiLayoutGrid2Thumb
                        className={`text-xl ${view === "list" ? "text-black" : "text-zinc-500"}`}
                        />
                    </button>
                    </div>

                    {/* Sort dropdown */}
                    <div className="flex items-center border border-slate-200">
                    <span className="px-3 py-2 border-r border-slate-200">
                        Sort By
                    </span>

                    <select
                        value={sort}
                        onChange={(e) => setSort(e.target.value)}
                        className="bg-transparent px-3 py-2 text-zinc-500 outline-none"
                    >
                        <option className="text-black" value="Popularity">Popularity</option>
                        <option className="text-black" value="Newest">Newest</option>
                        <option className="text-black" value="PriceLow">Price: Low to High</option>
                        <option className="text-black" value="PriceHigh">Price: High to Low</option>
                    </select>
                    </div>

                </div>
            </div>
        </div>
    </section>
  );
}
