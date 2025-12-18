"use client";
import { useState } from "react";
import { MdOutlineKeyboardArrowDown } from "react-icons/md";

interface FilterItem {
  label: string;
  count: number;
}

const categoryFilters: FilterItem[] = [
  { label: "Hat & Cap", count: 21 },
  { label: "Baseball Caps", count: 21 },
  { label: "Beanies", count: 21 },
  { label: "Docker Hat", count: 21 },
  { label: "5 Panel Cap", count: 21 },
  { label: "Bucket Hats", count: 21 },
  { label: "Trucker Caps", count: 21 },
  { label: "Dad Caps", count: 21 },
];

const topFilters = [
  "Categories",
  "Color",
  "Price",
  "Size",
  "Material",
  "Brand",
  "Rating",
  "Discount",
  "Gender",
];

export default function ShopCategory() {
  const [selected, setSelected] = useState<string[]>([]);

  const toggleSelect = (label: string) => {
    setSelected((prev) =>
      prev.includes(label)
        ? prev.filter((item) => item !== label)
        : [...prev, label]
    );
  };

  return (
    <section className="ShopCategory-wrapper flex flex-col flex-wrap gap-6 mb-16 mt-8 px-8 md:px-0">
        <div className="container mx-auto">
            <div className="border-b border-gray-200 pb-4">
                {/* Top Section */}
                <div className="pb-4 text-zinc-400 text-sm font-normal font-['Inter'] leading-5">Filter By</div>
                <div className="flex gap-10 flex-wrap items-center text-lg font-semibold text-gray-900">
                    {topFilters.map((item) => (
                    <button
                        key={item}
                        className="flex items-center gap-1 nav-link-animated text-gray-900 hover:text-gray-700 transition-colors duration-200"
                    >
                        {item} <MdOutlineKeyboardArrowDown />
                    </button>
                    ))}
                </div>

                {/* Sub-categories */}
                <div className="mt-4 flex flex-wrap gap-6 text-lg text-gray-700">
                    {categoryFilters.map((item) => (
                    <label key={item.label} className="flex items-center gap-2 cursor-pointer">
                        <input
                        type="checkbox"
                        checked={selected.includes(item.label)}
                        onChange={() => toggleSelect(item.label)}
                        className="accent-black"
                        />
                        <span>
                        {item.label} ({item.count})
                        </span>
                    </label>
                    ))}
                </div>
            </div>
        </div>
    </section>

  );
}
